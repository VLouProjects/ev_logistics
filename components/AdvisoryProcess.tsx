"use client";

import { useEffect, useState } from "react";

const STEP_DURATION = 2500;

const steps = [
  {
    number: "01",
    title: "需求分析",
    description: "釐清業務場景、配送路線及冷鏈溫控要求。"
  },
  {
    number: "02",
    title: "車型比較",
    description: "多品牌電動車型規格、載重及適用性評估。"
  },
  {
    number: "03",
    title: "冷鏈配置",
    description: "溫控方案、設備相容性及電動車營運影響。"
  },
  {
    number: "04",
    title: "採購建議",
    description: "選型方向、交付條件及車隊電動化導入時程。"
  }
];

export default function AdvisoryProcess() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, STEP_DURATION);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mx-auto max-w-[900px]">
      {steps.map((step, i) => {
        const isActive = i === active;
        const isDone   = i < active;
        const isLast   = i === steps.length - 1;

        return (
          <div key={step.number} className="flex gap-5">

            {/* ── Left column: circle + connector ── */}
            <div className="flex w-11 shrink-0 flex-col items-center">
              {/* Circle */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-500 ${
                  isActive
                    ? "border-primary bg-primary text-white"
                    : isDone
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-surface text-gray-400"
                }`}
              >
                {isDone ? "✓" : step.number}
              </div>

              {/* Vertical connector line — fills the row height below the circle */}
              {!isLast && (
                <div className="mt-1.5 w-px flex-1 bg-border" />
              )}
            </div>

            {/* ── Right: card ── */}
            <div
              className={`relative mb-3 flex-1 overflow-hidden rounded-2xl border transition-colors duration-500 ${
                isLast ? "mb-0" : ""
              } ${
                isActive
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-bg"
              }`}
            >
              <div className="px-5 py-4">
                <div
                  className={`mb-1.5 text-base font-semibold transition-colors duration-500 ${
                    isActive ? "text-primary" : isDone ? "text-gray-700" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </div>
                <p className="text-sm leading-6 text-gray-500">
                  {step.description}
                </p>
              </div>

              {/* Active progress fill bar */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-surface2">
                  <div
                    key={active}
                    className="h-full bg-primary"
                    style={{
                      width: "0%",
                      animation: `processFill ${STEP_DURATION}ms linear forwards`
                    }}
                  />
                </div>
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
}
