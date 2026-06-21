"use client";

import { useState } from "react";
import AspectImage from "@/components/AspectImage";
import {
  coldChainDisclaimer,
  industries,
  temperatureClasses,
  vehicleClasses,
  type IndustryCompatibility,
  type VehicleCompatibility
} from "@/data/coldChainMatrix";

const tempAccent: Record<string, string> = {
  chilled:   "bg-secondary",
  frozen:    "bg-[#1D4ED8]",
  pharma:    "bg-primary",
  multiTemp: "bg-gray-400"
};

const industryBadge: Record<IndustryCompatibility, string> = {
  "高度適合":    "bg-primary/10 text-primary",
  "可考慮":      "bg-secondary/10 text-secondary",
  "需進一步評估": "bg-warning/10 text-warning"
};

const vehiclePill: Record<VehicleCompatibility, { card: string; dot: string; label: string }> = {
  "建議":    { card: "border-primary/30 bg-primary/5",   dot: "bg-primary",   label: "text-primary" },
  "可考慮":  { card: "border-secondary/30 bg-secondary/5", dot: "bg-secondary", label: "text-secondary" },
  "不太適合": { card: "border-warning/30 bg-warning/5",   dot: "bg-warning",   label: "text-warning" }
};

export default function ColdChainMatrix() {
  const [selectedId, setSelectedId] = useState(temperatureClasses[0].id);
  const selected = temperatureClasses.find((t) => t.id === selectedId)!;

  return (
    <div className="space-y-6">

      {/* ── Temperature class selector ───────────────────────────── */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {temperatureClasses.map((tc) => {
          const isSelected = tc.id === selectedId;
          return (
            <button
              key={tc.id}
              onClick={() => setSelectedId(tc.id)}
              className={`overflow-hidden rounded-2xl border text-left transition ${
                isSelected
                  ? "border-primary ring-1 ring-primary bg-bg"
                  : "border-border bg-surface hover:border-secondary hover:bg-surface2"
              }`}
            >
              {/* Temperature class colour bar */}
              <div className={`h-1 w-full ${tempAccent[tc.id]}`} />

              <div className="p-5">
                <div className={`mb-1 font-mono text-base font-bold tracking-tight ${isSelected ? "text-primary" : "text-gray-500"}`}>
                  {tc.range}
                </div>
                <div className="font-semibold text-gray-900">{tc.name}</div>
                <div className="mt-1.5 line-clamp-2 text-xs leading-5 text-gray-600">
                  {tc.cargoExamples}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Configuration brief panel ────────────────────────────── */}
      <div className="overflow-hidden rounded-2xl border border-border">

        {/* Context banner — swaps with the selected temperature class */}
        <AspectImage
          src={selected.image}
          alt={selected.name}
          heightClass="h-36 md:h-48"
          sizes="(min-width:1024px) 1024px, 100vw"
        />

        {/* Panel header */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border bg-[#1E293B] px-6 py-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
              Configuration Brief
            </div>
            <div className="mt-1 text-xl font-semibold text-white">{selected.name}</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-xl font-bold text-teal-300">{selected.range}</div>
            <div className="mt-1 text-xs text-slate-300">溫控範圍</div>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">

          {/* Cargo examples */}
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
              適用貨物類型
            </div>
            <p className="text-sm leading-7 text-gray-700">{selected.cargoExamples}</p>
          </div>

          {/* Industry compatibility */}
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
              行業適配程度
            </div>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => {
                const level = selected.industryCompatibility[ind.id];
                return (
                  <span
                    key={ind.id}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${industryBadge[level]}`}
                  >
                    {ind.name}
                    <span className="font-normal">· {level}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Vehicle class compatibility pills */}
          <div className="md:col-span-2">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
              車型適配建議
            </div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {vehicleClasses.map((vc) => {
                const level = selected.vehicleCompatibility[vc];
                const style = vehiclePill[level];
                return (
                  <div key={vc} className={`rounded-xl border p-4 ${style.card}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                      <span className={`text-xs font-semibold ${style.label}`}>{level}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{vc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* EV operational impact */}
          <div className="md:col-span-2 rounded-xl border border-secondary/20 bg-secondary/5 p-5">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-secondary">
              電動車營運影響
            </div>
            <p className="text-sm leading-7 text-gray-600">{selected.evImpact}</p>
          </div>

        </div>
      </div>

      {/* ── Advisory disclaimer ──────────────────────────────────── */}
      <div className="rounded-2xl border border-warning/30 bg-warning/5 p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-warning" />
          <span className="text-sm font-semibold text-gray-700">顧問免責聲明</span>
        </div>
        <p className="text-sm leading-7 text-gray-500">{coldChainDisclaimer}</p>
      </div>

    </div>
  );
}
