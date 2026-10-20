import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  linkTo,
  linkLabel = "View all",
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  linkTo?: string;
  linkLabel?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      }
    >
      <div className={align === "center" ? "" : "max-w-xl"}>
        {eyebrow ? (
          <div
            className={cn(
              "mb-3 flex items-center gap-4",
              align === "center" && "justify-center",
            )}
          >
            <span className="eyebrow-rule" />
            <p className="eyebrow">{eyebrow}</p>
          </div>
        ) : null}
        <TextReveal
          as="h2"
          observe={false}
          startDelay={180}
          className="text-3xl leading-tight sm:text-4xl md:text-[2.75rem]"
          lines={[{ text: title }]}
        />
        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {linkTo ? (
        <Link
          to={linkTo}
          className="group inline-flex shrink-0 items-center gap-2 text-sm tracking-wide text-primary transition-colors hover:text-gold-soft"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        </Link>
      ) : null}
    </Reveal>
  );
}
