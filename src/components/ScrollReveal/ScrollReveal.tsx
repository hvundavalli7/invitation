"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
};

export default function ScrollReveal({
  children,
  className = "",
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = as as "div";

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={`fade-up ${className}`}>
      {children}
    </Tag>
  );
}
