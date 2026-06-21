"use client";

import { useEffect, useRef, useState } from "react";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

/* ── Inline icons (generic UI glyphs, no brand marks) ───────────── */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-7 w-7"
};

const NeedsIcon = () => (
  <svg {...iconProps}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 3h6v3H9z" />
    <path d="M8.5 11h7M8.5 15h7M8.5 18.5h4" />
  </svg>
);

const CompareIcon = () => (
  <svg {...iconProps}>
    <path d="M3 7h11v8H3z" />
    <path d="M14 10h3.5l3.5 3v2h-7z" />
    <circle cx="7" cy="17" r="1.6" />
    <circle cx="17.5" cy="17" r="1.6" />
  </svg>
);

const ColdIcon = () => (
  <svg {...iconProps}>
    <path d="M12 2v20" />
    <path d="M3.3 7l17.4 10" />
    <path d="M20.7 7L3.3 17" />
    <path d="M12 5.5l2.2-2.2M12 5.5L9.8 3.3M12 18.5l2.2 2.2M12 18.5l-2.2 2.2" />
  </svg>
);

const CheckIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.4 12.4l2.6 2.6 4.6-5.2" />
  </svg>
);

const steps: Step[] = [
  {
    number: "01",
    title: "需求分析",
    description: "釐清業務場景、配送路線及冷鏈溫控要求。",
    icon: <NeedsIcon />
  },
  {
    number: "02",
    title: "車型比較",
    description: "比較多品牌車型規格、載重及應用適配度。",
    icon: <CompareIcon />
  },
  {
    number: "03",
    title: "冷鏈配置",
    description: "評估溫控方案、設備相容性及營運影響。",
    icon: <ColdIcon />
  },
  {
    number: "04",
    title: "採購建議",
    description: "提供選型方向、交付條件及車隊導入建議。",
    icon: <CheckIcon />
  }
];

const LINE_MS = 800; // connector draw duration
const NODE_MS = 500; // per-node fade/scale duration
const NODE_STAGGER = 140; // delay between nodes
const NODE_BASE_DELAY = 180; // wait for the line to start drawing

export default function AdvisoryProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const shown = revealed || reducedMotion;

  // Per-node reveal style (fade + subtle pop). Ends at scale 1 — no overshoot.
  const nodeStyle = (i: number): React.CSSProperties => {
    if (reducedMotion) return {};
    const delay = NODE_BASE_DELAY + i * NODE_STAGGER;
    return {
      opacity: shown ? 1 : 0,
      transform: shown ? "scale(1)" : "scale(0.9)",
      transition: `opacity ${NODE_MS}ms ease-out ${delay}ms, transform ${NODE_MS}ms ease-out ${delay}ms`
    };
  };

  // Per-node text reveal (fade up), slightly after its node.
  const textStyle = (i: number): React.CSSProperties => {
    if (reducedMotion) return {};
    const delay = NODE_BASE_DELAY + i * NODE_STAGGER + 150;
    return {
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0)" : "translateY(10px)",
      transition: `opacity ${NODE_MS}ms ease-out ${delay}ms, transform ${NODE_MS}ms ease-out ${delay}ms`
    };
  };

  // Horizontal connector: scaleX from left.
  const lineStyle: React.CSSProperties = reducedMotion
    ? {}
    : {
        transform: shown ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left center",
        transition: `transform ${LINE_MS}ms ease-out`
      };

  return (
    <div ref={ref}>
      {/* ── Desktop: horizontal node-and-line timeline ───────────── */}
      <div className="relative hidden md:block">
        {/* Connector line running through the node centers (circle = h-20, center ≈ 40px) */}
        <div className="absolute left-0 right-0 top-10 h-px -translate-y-1/2 px-[10%]">
          <div className="h-full w-full bg-gradient-to-r from-primary/30 to-secondary/40" style={lineStyle} />
        </div>

        <div className="relative grid grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col items-center px-3 text-center">
              {/* Node: double-ring circle with icon */}
              <div
                className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-bg shadow-sm"
                style={nodeStyle(i)}
              >
                <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-primary/10 text-primary">
                  {step.icon}
                </div>
              </div>

              {/* Drop line + dot down to the label */}
              <div className="flex flex-col items-center" style={textStyle(i)}>
                <div className="mt-1 h-8 w-px bg-border" />
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <div className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {step.number}
                </div>
                <h3 className="mt-1 text-base font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 max-w-[220px] text-sm leading-6 text-gray-500">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: vertical stack ───────────────────────────────── */}
      <div className="md:hidden">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          return (
            <div key={step.number} className="flex gap-4" style={nodeStyle(i)}>
              {/* Left: circle + vertical connector */}
              <div className="flex w-14 shrink-0 flex-col items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-bg shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary [&_svg]:h-5 [&_svg]:w-5">
                    {step.icon}
                  </div>
                </div>
                {!isLast && <div className="mt-1.5 w-px flex-1 bg-border" />}
              </div>

              {/* Right: copy */}
              <div className={isLast ? "pb-0" : "pb-6"}>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {step.number}
                </div>
                <h3 className="mt-1 text-base font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-gray-500">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
