"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Section from "@/components/Section";

const assumptions = {
  "電動客貨車":  { diesel: 0.12, ev: 0.35 },
  "輕型電動貨車": { diesel: 0.18, ev: 0.65 },
  "中型電動貨車": { diesel: 0.28, ev: 1.0  },
  "重型電動貨車": { diesel: 0.38, ev: 1.4  }
};

const refrigerationFactors = {
  "無需冷鏈": 1,
  "冷藏":     1.1,
  "冷凍":     1.25,
  "醫藥溫控": 1.15,
  "尚未確定": 1.15
};

const costFactors = [
  {
    title: "車型及電池規格",
    body: "車型選擇及電池容量影響每公里能耗基準，不同品牌及配置實際數據存在差異。"
  },
  {
    title: "路線及充電安排",
    body: "日行駛距離、充電頻次及充電方式影響實際能源成本，需結合具體路線評估。"
  },
  {
    title: "冷鏈設備負載",
    body: "冷藏或冷凍設備運作增加能耗，視溫控需求、車廂保溫條件及環境溫度而定。"
  },
  {
    title: "未涵蓋成本項目",
    body: "本工具未包含維修、保險、充電基礎設施及其他車隊運營成本，實際總成本更高。"
  }
];

export default function FleetEconomicsPage() {
  const [vehicleClass, setVehicleClass]       = useState<keyof typeof assumptions>("輕型電動貨車");
  const [refrigeration, setRefrigeration]     = useState<keyof typeof refrigerationFactors>("無需冷鏈");
  const [dailyDistance, setDailyDistance]     = useState(120);
  const [fleetSize, setFleetSize]             = useState(5);
  const [dieselCost, setDieselCost]           = useState(1.5);
  const [electricityCost, setElectricityCost] = useState(0.15);

  const result = useMemo(() => {
    const sel       = assumptions[vehicleClass];
    const refFactor = refrigerationFactors[refrigeration];
    const dieselMonthly = dailyDistance * fleetSize * sel.diesel * dieselCost * 30;
    const evMonthly     = dailyDistance * fleetSize * sel.ev * electricityCost * refFactor * 30;
    const monthlyDiff   = dieselMonthly - evMonthly;
    const annualDiff    = monthlyDiff * 12;
    const evRatioPct    = dieselMonthly > 0 ? Math.round((evMonthly / dieselMonthly) * 100) : 0;
    return { dieselMonthly, evMonthly, monthlyDiff, annualDiff, evRatioPct };
  }, [vehicleClass, refrigeration, dailyDistance, fleetSize, dieselCost, electricityCost]);

  const fmt = (v: number) =>
    new Intl.NumberFormat("zh-Hant", {
      style: "currency", currency: "USD", maximumFractionDigits: 0
    }).format(v);

  const positive = result.monthlyDiff >= 0;

  const inputCls = "w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <>
    <Section
      eyebrow="Fleet Advisory"
      title="車隊規劃及成本初步評估"
      description="根據車輛類型、配送距離、車隊規模及冷鏈需求，初步估算電動與柴油車隊能源成本差異。所有數值僅供參考，視實際營運情況而定。"
    >
      {/* ── Main grid ───────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-12">

        {/* Left: input panel */}
        <div className="overflow-hidden rounded-2xl border border-border lg:col-span-4">
          <div className="border-b border-border bg-[#1E293B] px-5 py-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">配置參數</div>
            <div className="mt-0.5 text-xs text-slate-300">調整參數以更新初步估算</div>
          </div>

          <div className="space-y-4 bg-bg px-5 py-5">
            <Field label="車輛類型">
              <select value={vehicleClass} onChange={(e) => setVehicleClass(e.target.value as keyof typeof assumptions)} className={inputCls}>
                {Object.keys(assumptions).map((k) => <option key={k}>{k}</option>)}
              </select>
            </Field>

            <Field label="冷鏈需求">
              <select value={refrigeration} onChange={(e) => setRefrigeration(e.target.value as keyof typeof refrigerationFactors)} className={inputCls}>
                {Object.keys(refrigerationFactors).map((k) => <option key={k}>{k}</option>)}
              </select>
            </Field>

            <Field label="每日行駛距離（公里）">
              <input type="number" value={dailyDistance} onChange={(e) => setDailyDistance(Number(e.target.value))} className={inputCls} />
            </Field>

            <Field label="車隊數量（輛）">
              <input type="number" value={fleetSize} onChange={(e) => setFleetSize(Number(e.target.value))} className={inputCls} />
            </Field>

            <Field label="柴油成本（每公升）">
              <input type="number" value={dieselCost} step="0.1" onChange={(e) => setDieselCost(Number(e.target.value))} className={inputCls} />
            </Field>

            <Field label="電力成本（每 kWh）">
              <input type="number" value={electricityCost} step="0.01" onChange={(e) => setElectricityCost(Number(e.target.value))} className={inputCls} />
            </Field>
          </div>
        </div>

        {/* Right: KPI dashboard */}
        <div className="space-y-4 lg:col-span-8">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">初步估算結果</div>
            <div className="text-xs text-gray-400">每月 · 全車隊 · 僅供初步參考</div>
          </div>

          {/* Comparison: diesel vs EV */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-5">
              <div className="mb-3 text-xs text-gray-500">柴油車隊月均能源費用（估算）</div>
              <div className="text-2xl font-semibold text-gray-900">{fmt(result.dieselMonthly)}</div>
              <div className="mt-2 text-[11px] text-gray-400">基於柴油消耗率假設</div>
            </div>
            <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-5">
              <div className="mb-3 text-xs text-gray-500">電動車隊月均能源費用（估算）</div>
              <div className="text-2xl font-semibold text-secondary">{fmt(result.evMonthly)}</div>
              <div className="mt-2 text-[11px] text-gray-400">已計入冷鏈用電調整因素</div>
            </div>
          </div>

          {/* Cost ratio bar */}
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="mb-2 flex justify-between text-xs text-gray-500">
              <span>電動能源費用相對柴油比例（初步估算）</span>
              <span className="font-semibold text-gray-700">{result.evRatioPct}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-surface2">
              <div
                className="h-2 rounded-full bg-secondary transition-all duration-300"
                style={{ width: `${Math.min(100, result.evRatioPct)}%` }}
              />
            </div>
          </div>

          {/* Differential KPIs */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className={`rounded-xl border p-5 ${positive ? "border-primary bg-primary/5" : "border-warning/40 bg-warning/5"}`}>
              <div className="mb-3 text-xs text-gray-500">估算每月成本差異</div>
              <div className={`text-2xl font-semibold ${positive ? "text-primary" : "text-warning"}`}>
                {positive && "+"}{fmt(result.monthlyDiff)}
              </div>
              <div className="mt-2 text-[11px] text-gray-400">單月全車隊估算差異</div>
            </div>
            <div className={`rounded-xl border p-5 ${positive ? "border-primary bg-primary/5" : "border-warning/40 bg-warning/5"}`}>
              <div className="mb-3 text-xs text-gray-500">估算年度成本差異</div>
              <div className={`text-2xl font-semibold ${positive ? "text-primary" : "text-warning"}`}>
                {positive && "+"}{fmt(result.annualDiff)}
              </div>
              <div className="mt-2 text-[11px] text-gray-400">12 個月全車隊估算差異</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cost factor cards ────────────────────────────────────── */}
      <div className="mt-10">
        <div className="mb-5">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">主要影響因素</div>
          <p className="mt-1 text-sm text-gray-500">以下因素未完全反映於估算模型，實際成本差異視具體情況而定。</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {costFactors.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-surface p-5">
              <div className="mb-2 text-sm font-semibold text-gray-900">{f.title}</div>
              <p className="text-xs leading-5 text-gray-500">{f.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Disclaimer ───────────────────────────────────────────── */}
      <div className="mt-6 rounded-2xl border border-warning/30 bg-warning/5 p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-warning" />
          <span className="text-sm font-semibold text-gray-700">顧問免責聲明</span>
        </div>
        <p className="text-sm leading-7 text-gray-500">
          本工具僅提供初步規劃及成本估算參考，並不代表最終報價或任何形式的保證。所有數值視實際營運情況而定，取決於品牌、車型、載重、路線、充電成本、冷鏈設備負載、維修條件及其他因素。如需準確評估，請諮詢專業顧問。
        </p>
      </div>
    </Section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-14 md:py-24 lg:px-8">
        <div className="mx-auto max-w-[800px] overflow-hidden rounded-3xl">
          <div className="bg-[#1E293B] px-10 py-10 text-center md:px-14 md:py-12">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
              Fleet Advisory
            </div>
            <h2 className="text-2xl font-semibold text-white">
              需要進一步評估車隊電動化的整體方向？
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              提供車隊規模、配送路線及冷鏈需求，我們將協助您初步規劃電動化導入方向。
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              預約車隊顧問
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs font-medium text-gray-600">{label}</div>
      {children}
    </label>
  );
}
