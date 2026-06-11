import { useState } from "react";
import type { Member } from "../../shared/schemas";
import { Pencil, Plus, Trash2, Users } from "lucide-react";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Modal, Select } from "./ui";
import { activityLabels, calculateTargets, goalLabels } from "../lib/nutrition";
import { demoMembers, newId, useFamilyFuel } from "../lib/store";

const emptyForm = {
  name: "",
  age: "30",
  sex: "female" as Member["sex"],
  heightCm: "165",
  weightKg: "65",
  activity: "moderate" as Member["activity"],
  goal: "maintain" as Member["goal"],
  allergies: "",
  dislikes: "",
};

type MemberForm = typeof emptyForm;

function formFromMember(m: Member): MemberForm {
  return {
    name: m.name,
    age: String(m.age),
    sex: m.sex,
    heightCm: String(m.heightCm),
    weightKg: String(m.weightKg),
    activity: m.activity,
    goal: m.goal,
    allergies: m.allergies.join(", "),
    dislikes: m.dislikes.join(", "),
  };
}

function parseList(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function FamilyTab() {
  const { state, update } = useFamilyFuel();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<MemberForm>(emptyForm);

  const set = (field: keyof MemberForm) => (value: string) => setForm((f) => ({ ...f, [field]: value }));

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (m: Member) => {
    setEditingId(m.id);
    setForm(formFromMember(m));
    setDialogOpen(true);
  };

  const save = () => {
    const member: Member = {
      id: editingId ?? newId(),
      name: form.name.trim() || "Family member",
      age: Math.max(1, Number(form.age) || 30),
      sex: form.sex,
      heightCm: Math.max(50, Number(form.heightCm) || 165),
      weightKg: Math.max(5, Number(form.weightKg) || 65),
      activity: form.activity,
      goal: form.goal,
      allergies: parseList(form.allergies),
      dislikes: parseList(form.dislikes),
    };
    update({
      members: editingId
        ? state.members.map((m) => (m.id === editingId ? member : m))
        : [...state.members, member],
    });
    setDialogOpen(false);
  };

  const remove = (id: string) => {
    update({ members: state.members.filter((m) => m.id !== id) });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Users className="h-5 w-5" /> Family ({state.members.length})
        </h2>
        <div className="flex gap-2">
          {state.members.length === 0 && (
            <Button variant="outline" onClick={() => update({ members: demoMembers })}>
              Load demo family
            </Button>
          )}
          <Button onClick={openAdd}>
            <Plus className="h-4 w-4 mr-1" /> Add member
          </Button>
        </div>
      </div>

      <Modal open={dialogOpen} onClose={() => setDialogOpen(false)} title={editingId ? "Edit family member" : "Add family member"}>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Label htmlFor="ff-name">Name</Label>
            <Input id="ff-name" value={form.name} onChange={(e) => set("name")(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="ff-age">Age</Label>
            <Input id="ff-age" type="number" value={form.age} onChange={(e) => set("age")(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="ff-sex">Sex</Label>
            <Select id="ff-sex" value={form.sex} onChange={(e) => set("sex")(e.target.value)}>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="ff-height">Height (cm)</Label>
            <Input id="ff-height" type="number" value={form.heightCm} onChange={(e) => set("heightCm")(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="ff-weight">Weight (kg)</Label>
            <Input id="ff-weight" type="number" value={form.weightKg} onChange={(e) => set("weightKg")(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="ff-activity">Activity level</Label>
            <Select id="ff-activity" value={form.activity} onChange={(e) => set("activity")(e.target.value)}>
              {Object.entries(activityLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="ff-goal">Goal</Label>
            <Select id="ff-goal" value={form.goal} onChange={(e) => set("goal")(e.target.value)}>
              {Object.entries(goalLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Select>
          </div>
          <div className="col-span-2">
            <Label htmlFor="ff-allergies">Allergies (comma-separated)</Label>
            <Input id="ff-allergies" placeholder="peanuts, shellfish" value={form.allergies} onChange={(e) => set("allergies")(e.target.value)} />
          </div>
          <div className="col-span-2">
            <Label htmlFor="ff-dislikes">Dislikes (comma-separated)</Label>
            <Input id="ff-dislikes" placeholder="mushrooms, olives" value={form.dislikes} onChange={(e) => set("dislikes")(e.target.value)} />
          </div>
        </div>
        <Button onClick={save} className="w-full mt-4">Save</Button>
      </Modal>

      {state.members.length === 0 && (
        <Card>
          <CardContent className="py-10 pt-10 text-center text-muted-foreground">
            Add each family member (or load the demo family) so meal plans and
            calorie targets can be personalized for everyone.
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {state.members.map((m) => {
          const targets = calculateTargets(m);
          return (
            <Card key={m.id}>
              <CardHeader className="pb-2 flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg">{m.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {m.age} yrs · {m.heightCm} cm · {m.weightKg} kg · {activityLabels[m.activity]}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" aria-label={`Edit ${m.name}`} onClick={() => openEdit(m)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label={`Remove ${m.name}`} onClick={() => remove(m.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge variant="secondary">{goalLabels[m.goal]}</Badge>
                <div className="grid grid-cols-4 gap-2 text-center text-sm">
                  <div className="rounded-md bg-muted p-2">
                    <div className="font-semibold">{targets.calories}</div>
                    <div className="text-xs text-muted-foreground">kcal/day</div>
                  </div>
                  <div className="rounded-md bg-muted p-2">
                    <div className="font-semibold">{targets.proteinG}g</div>
                    <div className="text-xs text-muted-foreground">protein</div>
                  </div>
                  <div className="rounded-md bg-muted p-2">
                    <div className="font-semibold">{targets.carbsG}g</div>
                    <div className="text-xs text-muted-foreground">carbs</div>
                  </div>
                  <div className="rounded-md bg-muted p-2">
                    <div className="font-semibold">{targets.fatG}g</div>
                    <div className="text-xs text-muted-foreground">fat</div>
                  </div>
                </div>
                {(m.allergies.length > 0 || m.dislikes.length > 0) && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {m.allergies.map((a) => (
                      <Badge key={a} variant="destructive" className="text-xs">No {a}</Badge>
                    ))}
                    {m.dislikes.map((d) => (
                      <Badge key={d} variant="outline" className="text-xs">Dislikes {d}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
