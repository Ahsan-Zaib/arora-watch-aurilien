import { cn } from "@/lib/utils";

/**
 * Menu toggle styled as a watch dial: gold bezel ring, hour markers,
 * and hands that sweep to "menu open" (3 o'clock) when active.
 */
export function WatchDialButton({
  open,
  onClick,
  className,
}: {
  open: boolean;
  onClick: () => void;
  className?: string;
}) {
  const ticks = Array.from({ length: 12 });
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onClick}
      className={cn(
        "group relative grid h-11 w-11 place-items-center rounded-full transition-transform duration-500 hover:scale-105",
        className,
      )}
    >
      {/* bezel */}
      <span className="absolute inset-0 rounded-full border border-primary/60 bg-surface shadow-gold transition-colors duration-500 group-hover:border-primary" />
      <span className="absolute inset-[3px] rounded-full border border-border/70" />
      {/* crown */}
      <span className="absolute -right-[3px] top-1/2 h-3 w-[5px] -translate-y-1/2 rounded-sm bg-gold-gradient" />
      {/* hour markers */}
      {ticks.map((_, i) => (
        <span
          key={i}
          className={cn(
            "absolute left-1/2 top-1/2 h-[3px] w-px origin-center",
            i % 3 === 0 ? "bg-primary" : "bg-muted-foreground/70",
          )}
          style={{
            transform: `rotate(${i * 30}deg) translateY(-15px)`,
            height: i % 3 === 0 ? 4 : 3,
          }}
        />
      ))}
      {/* hands */}
      <span
        className={cn(
          "absolute left-1/2 top-1/2 h-px w-[11px] origin-left rounded-full bg-foreground transition-transform duration-700",
          open ? "rotate-90" : "-rotate-45",
        )}
        style={{ transitionTimingFunction: "var(--ease-lux)" }}
      />
      <span
        className={cn(
          "absolute left-1/2 top-1/2 h-[2px] w-[8px] origin-left rounded-full bg-primary transition-transform duration-700",
          open ? "rotate-0" : "rotate-45",
        )}
        style={{ transitionTimingFunction: "var(--ease-lux)" }}
      />
      {/* pin */}
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-gradient" />
    </button>
  );
}
