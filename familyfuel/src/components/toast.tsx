import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

interface ToastEntry extends ToastOptions {
  id: number;
}

const ToastContext = createContext<{ toast: (opts: ToastOptions) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const nextId = useRef(0);

  const toast = useCallback((opts: ToastOptions) => {
    const id = nextId.current++;
    setToasts((t) => [...t, { ...opts, id }]);
    setTimeout(() => setToasts((t) => t.filter((e) => e.id !== id)), 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 inset-x-4 z-[60] flex flex-col items-center gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto w-full max-w-sm rounded-lg border px-4 py-3 shadow-lg text-sm ${
              t.variant === "destructive" ? "bg-destructive text-destructive-foreground" : "bg-card"
            }`}
          >
            <p className="font-medium">{t.title}</p>
            {t.description && <p className="opacity-80">{t.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
