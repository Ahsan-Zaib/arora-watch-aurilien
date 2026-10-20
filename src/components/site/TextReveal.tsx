import { Fragment, useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Line = { text: string; className?: string; wordClassName?: string };

/**
 * Headline reveal: each word rises out of an overflow mask, staggered left to
 * right. With observe={false} it relies on an ancestor <Reveal> to trigger
 * (via the shared [data-visible] CSS hook).
 */
export function TextReveal({
  lines,
  as: Tag = "h2",
  className,
  wordDelay = 55,
  lineDelay = 130,
  startDelay = 0,
  observe = true,
}: {
  lines: Line[];
  as?: ElementType;
  className?: string;
  wordDelay?: number;
  lineDelay?: number;
  startDelay?: number;
  observe?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!observe) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [observe]);

  let wordIndex = 0;
  return (
    <Tag ref={ref as never} data-visible={visible} className={className}>
      {lines.map((line, li) => {
        const words = line.text.split(" ");
        return (
          <span key={li} className={cn("block", line.className)}>
            {words.map((word, wi) => {
              const delay = startDelay + wordIndex++ * wordDelay + li * lineDelay;
              return (
                <Fragment key={wi}>
                  <span className="mask-line">
                    <span
                      className={cn("mask-word", line.wordClassName)}
                      style={{ transitionDelay: `${delay}ms` }}
                    >
                      {word}
                    </span>
                  </span>
                  {wi < words.length - 1 ? " " : null}
                </Fragment>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
