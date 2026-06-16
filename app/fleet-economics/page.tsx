"use client";

import { useMemo, useState } from "react";
import Section from "@/components/Section";

const assumptions = {
  "電動客貨車": { diesel: 0.12, ev: 0.35 },
  "輕型電動貨車": { diesel: 0.18, ev: 0.65 },
  "中型電動貨車": { diesel: 0.28, ev: 1.0 },
  "重型電動貨車": { diesel: 0.38, ev: 1.4 }
};

const refrigerationFactors = {
  "無需冷鏈": 1,
  "冷藏": 1.1,
  "冷凍": 1.25,
  "醫藥溫控": 1.15,
  "尚未確定": 1.15
};

export default function FleetEconomicsPage() {
  const [vehicleClass, setVehicleClass] = useState<keyof typeof assumptions>("輕型電動貨車");
  const [refrigeration, setRefrigeration] = useState<keyof typeof refrigerationFactors>("無需冷鏈");
  const [dailyDistance, setDailyDistance] = useState(120);
  const [fleetSize, setFleetSize] = useState(5);
  const [dieselCost, setDieselCost] = useState(1.5);
  const [electricityCost, setElectricityCost] = useState(0.15);

  const result = useMemo(() => {
    const selected = assumptions[vehicleClass];
    const refrigerationFactor = refrigerationFactors[refrigeration];

    const dieselMonthly =
      dailyDistance * fleetSize * selected.diesel * dieselCost * 30;

    const evMonthly =
      dailyDistance *
      fleetSize *
      selected.ev *
      electricityCost *
      refrigerationFactor *
      30;

    const monthlyDifference = dieselMonthly - evMonthly;
    const annualDifference = monthlyDifference * 12;

    return {
      dieselMonthly,
      evMonthly,
      monthlyDifference,
      annualDifference
    };
  }, [vehicleClass, refrigeration, dailyDistance, fleetSize, dieselCost, electricityCost]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("zh-Hant", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(value);

  return (
    <Section
      eyebrow="Fleet Advisory"
      title="車隊規劃及成本評估"
      description="根據車輛類型、配送距離、車隊規模及冷鏈需求，初步了解電動物流車輛在營運成本及車隊規劃上的主要考慮因素。"
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="rounded-2xl border border-border bg-surface p-6 lg:col-span-4">
          <div className="space-y-5">
            <Field label="車輛類型">
              <select
                value={vehicleClass}
                onChange={(e) => setVehicleClass(e.target.value as keyof typeof assumptions)}
                className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-gray-900"
              >
                {Object.keys(assumptions).map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>

            <Field label="冷鏈需求">
              <select
                value={refrigeration}
                onChange={(e) =>
                  setRefrigeration(e.target.value as keyof typeof refrigerationFactors)
                }
                className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-gray-900"
              >
                {Object.keys(refrigerationFactors).map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>

            <Field label="每日行駛距離 km/day">
              <input
                type="number"
                value={dailyDistance}
                onChange={(e) => setDailyDistance(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-gray-900"
              />
            </Field>

            <Field label="車隊數量">
              <input
                type="number"
                value={fleetSize}
                onChange={(e) => setFleetSize(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-gray-900"
              />
            </Field>

            <Field label="柴油成本 / liter">
              <input
                type="number"
                value={dieselCost}
                onChange={(e) => setDieselCost(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-gray-900"
              />
            </Field>

            <Field label="電力成本 / kWh">
              <input
                type="number"
                value={electricityCost}
                onChange={(e) => setElectricityCost(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-gray-900"
              />
            </Field>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="grid gap-4 md:grid-cols-2">
            <Kpi title="估算柴油每月燃料成本" value={formatCurrency(result.dieselMonthly)} />
            <Kpi title="估算電動車每月能源成本" value={formatCurrency(result.evMonthly)} />
            <Kpi title="估算每月成本差異" value={formatCurrency(result.monthlyDifference)} highlight />
            <Kpi title="估算年度成本差異" value={formatCurrency(result.annualDifference)} highlight />
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-surface2 p-6">
            <h3 className="text-lg font-semibold text-gray-900">評估說明</h3>
            <p className="mt-3 text-sm leading-7 text-gray-500">
              本工具僅提供初步規劃及成本評估參考，並不代表最終報價、保證節省或實際營運結果。實際成本取決於品牌、車型、載重、路線、充電成本、冷鏈設備負載、維修條件及實際營運情況。
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-gray-600">{label}</div>
      {children}
    </label>
  );
}

function Kpi({
  title,
  value,
  highlight
}: {
  title: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="text-sm text-gray-500">{title}</div>
      <div className={`mt-3 text-2xl font-semibold ${highlight ? "text-primary" : "text-gray-900"}`}>
        {value}
      </div>
    </div>
  );
}