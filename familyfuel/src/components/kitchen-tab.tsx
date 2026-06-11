import { useRef, useState } from "react";
import type { InventoryItem, ScannedItem, ScanResponse } from "../../shared/schemas";
import { inventoryCategories } from "../../shared/schemas";
import { Camera, Check, Loader2, Plus, Refrigerator, Trash2, X } from "lucide-react";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input, Select } from "./ui";
import { useToast } from "./toast";
import { postJson } from "../lib/api";
import { fileToDownscaledDataUrl, videoToKeyframes } from "../lib/image-utils";
import { daysUntil, todayKey } from "../lib/nutrition";
import { newId, useFamilyFuel } from "../lib/store";

function expiryDateFromDays(days: number | null): string | undefined {
  if (days === null) return undefined;
  const d = new Date();
  d.setDate(d.getDate() + days);
  return todayKey(d);
}

function ExpiryBadge({ expiresOn }: { expiresOn?: string }) {
  if (!expiresOn) return null;
  const days = daysUntil(expiresOn);
  if (days < 0) return <Badge variant="destructive" className="text-xs">Expired</Badge>;
  if (days <= 3) return <Badge variant="destructive" className="text-xs">Expires in {days}d</Badge>;
  if (days <= 7) return <Badge variant="outline" className="text-xs">Expires in {days}d</Badge>;
  return null;
}

export default function KitchenTab() {
  const { state, update } = useFamilyFuel();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [scanning, setScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState<ScannedItem[] | null>(null);
  const [manualName, setManualName] = useState("");

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setScanning(true);
    setScannedItems(null);
    try {
      const images: string[] = [];
      for (const file of Array.from(files).slice(0, 8)) {
        if (file.type.startsWith("video/")) {
          images.push(...(await videoToKeyframes(file)));
        } else if (file.type.startsWith("image/")) {
          images.push(await fileToDownscaledDataUrl(file));
        }
      }
      if (images.length === 0) {
        toast({ title: "No photos found", description: "Please choose photos or a short video of your fridge or pantry.", variant: "destructive" });
        return;
      }
      const data = await postJson<ScanResponse>("/api/scan", { images: images.slice(0, 8) });
      if (data.items.length === 0) {
        toast({ title: "Nothing detected", description: "Try clearer, closer photos with good lighting." });
      }
      setScannedItems(data.items);
    } catch (error) {
      toast({
        title: "Scan failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setScanning(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const updateScanned = (index: number, patch: Partial<ScannedItem>) => {
    setScannedItems((items) => items?.map((it, i) => (i === index ? { ...it, ...patch } : it)) ?? null);
  };

  const removeScanned = (index: number) => {
    setScannedItems((items) => items?.filter((_, i) => i !== index) ?? null);
  };

  const confirmScanned = () => {
    if (!scannedItems) return;
    const newItems: InventoryItem[] = scannedItems.map((it) => ({
      id: newId(),
      name: it.name,
      category: it.category,
      quantity: it.quantity,
      expiresOn: expiryDateFromDays(it.expiresInDays),
    }));
    update({ inventory: [...state.inventory, ...newItems] });
    setScannedItems(null);
    toast({ title: `Added ${newItems.length} items to your kitchen inventory` });
  };

  const addManual = () => {
    const name = manualName.trim();
    if (!name) return;
    update({
      inventory: [...state.inventory, { id: newId(), name, category: "other", quantity: "1" }],
    });
    setManualName("");
  };

  const updateItem = (id: string, patch: Partial<InventoryItem>) => {
    update({ inventory: state.inventory.map((it) => (it.id === id ? { ...it, ...patch } : it)) });
  };

  const removeItem = (id: string) => {
    update({ inventory: state.inventory.filter((it) => it.id !== id) });
  };

  const sortedInventory = [...state.inventory].sort((a, b) => {
    const da = a.expiresOn ? daysUntil(a.expiresOn) : Infinity;
    const db = b.expiresOn ? daysUntil(b.expiresOn) : Infinity;
    return da - db;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Camera className="h-5 w-5" /> Scan your fridge &amp; pantry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Take photos (or a short video) of your fridge, freezer and pantry shelves.
            AI will detect the food items — you can correct the list before saving.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            capture="environment"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <Button onClick={() => fileInputRef.current?.click()} disabled={scanning} className="w-full sm:w-auto">
            {scanning ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing photos…</>
            ) : (
              <><Camera className="h-4 w-4 mr-2" /> Take / upload photos or video</>
            )}
          </Button>

          {scannedItems && scannedItems.length > 0 && (
            <div className="space-y-2 border rounded-lg p-3">
              <p className="text-sm font-medium">Detected {scannedItems.length} items — review and correct:</p>
              {scannedItems.map((it, i) => (
                <div key={i} className="flex flex-wrap items-center gap-2">
                  <Input
                    value={it.name}
                    onChange={(e) => updateScanned(i, { name: e.target.value })}
                    className="flex-1 min-w-[120px] h-8"
                    aria-label="Item name"
                  />
                  <Input
                    value={it.quantity}
                    onChange={(e) => updateScanned(i, { quantity: e.target.value })}
                    className="w-24 h-8"
                    aria-label="Quantity"
                  />
                  <Select
                    value={it.category}
                    onChange={(e) => updateScanned(i, { category: e.target.value as ScannedItem["category"] })}
                    className="w-32 h-8 py-0"
                    aria-label="Category"
                  >
                    {inventoryCategories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </Select>
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Remove item" onClick={() => removeScanned(i)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2 pt-1">
                <Button onClick={confirmScanned} size="sm">
                  <Check className="h-4 w-4 mr-1" /> Add all to inventory
                </Button>
                <Button variant="outline" size="sm" onClick={() => setScannedItems(null)}>Discard</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Refrigerator className="h-5 w-5" /> Kitchen inventory ({state.inventory.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Add an item manually…"
              value={manualName}
              onChange={(e) => setManualName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addManual()}
            />
            <Button variant="outline" onClick={addManual} aria-label="Add item">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {sortedInventory.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No items yet. Scan your fridge or add items manually — meal plans will
              use what you already have first.
            </p>
          ) : (
            <div className="divide-y">
              {sortedInventory.map((it) => (
                <div key={it.id} className="flex flex-wrap items-center gap-2 py-2">
                  <div className="flex-1 min-w-[140px]">
                    <span className="font-medium text-sm">{it.name}</span>{" "}
                    <span className="text-xs text-muted-foreground">({it.category})</span>
                  </div>
                  <Input
                    value={it.quantity}
                    onChange={(e) => updateItem(it.id, { quantity: e.target.value })}
                    className="w-24 h-8"
                    aria-label={`Quantity of ${it.name}`}
                  />
                  <ExpiryBadge expiresOn={it.expiresOn} />
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={`Remove ${it.name}`} onClick={() => removeItem(it.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
