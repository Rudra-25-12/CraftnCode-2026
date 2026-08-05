import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/food")({
  head: () => ({
    meta: [
      { title: "Night Canteen — CraftnCode'26" },
      { name: "description", content: "Order food to your table during the CraftnCode'26 overnight hackathon." },
      { property: "og:title", content: "Night Canteen — CraftnCode'26" },
      { property: "og:description", content: "Order food to your table during the overnight hackathon." },
    ],
  }),
  component: Food,
});

const menu = [
  { id: "maggi", name: "Midnight Maggi", note: "Extra masala, served 22:00–05:00", price: 40 },
  { id: "chai", name: "Cutting Chai", note: "The primary compiler", price: 15 },
  { id: "coffee", name: "Cold Brew Shot", note: "Double strength", price: 60 },
  { id: "roll", name: "Paneer Roll", note: "One-handed, keyboard safe", price: 80 },
  { id: "sandwich", name: "Grilled Sandwich", note: "Veg / cheese", price: 70 },
  { id: "pizza", name: "Pizza Slice", note: "Reheated at 03:00, honestly still good", price: 90 },
];

function Food() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const total = useMemo(
    () => menu.reduce((sum, m) => sum + (cart[m.id] ?? 0) * m.price, 0),
    [cart],
  );
  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  const bump = (id: string, d: number) =>
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + d) }));

  return (
    <PageShell eyebrow="OPEN ALL NIGHT" title="Night Canteen">
      <p>Order to your table. Runners deliver every 20 minutes — pay at the counter on pickup.</p>

      <div className="grid gap-3">
        {menu.map((m) => (
          <div key={m.id} className="glass-panel flex items-center gap-4 rounded-sm p-4">
            <div className="flex-1">
              <h2 className="text-base text-foreground">{m.name}</h2>
              <p className="text-xs text-muted-foreground">{m.note}</p>
            </div>
            <span className="font-display text-sm text-neon-cyan">₹{m.price}</span>
            <div className="flex items-center gap-2">
              <button
                aria-label={`Remove one ${m.name}`}
                onClick={() => bump(m.id, -1)}
                className="rounded-sm border border-border p-1.5 text-muted-foreground transition-colors hover:border-neon-magenta hover:text-neon-magenta"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-5 text-center font-display text-sm text-foreground">
                {cart[m.id] ?? 0}
              </span>
              <button
                aria-label={`Add one ${m.name}`}
                onClick={() => bump(m.id, 1)}
                className="rounded-sm border border-border p-1.5 text-muted-foreground transition-colors hover:border-neon-cyan hover:text-neon-cyan"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-sm p-5">
        <div>
          <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
            {count} ITEM{count === 1 ? "" : "S"}
          </p>
          <p className="font-display text-2xl text-neon-cyan">₹{total}</p>
        </div>
        <button
          disabled={count === 0}
          onClick={() => {
            toast.success("Order placed", { description: `₹${total} · a runner is on the way.` });
            setCart({});
          }}
          className="rounded-sm bg-[image:var(--gradient-neon)] px-7 py-3 font-display text-[11px] tracking-[0.3em] text-primary-foreground shadow-[var(--shadow-neon)] transition-opacity disabled:opacity-40"
        >
          PLACE ORDER
        </button>
      </div>
    </PageShell>
  );
}