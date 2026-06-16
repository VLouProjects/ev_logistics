"use client";

import { useState } from "react";
import {
  coldChainDisclaimer,
  industries,
  temperatureClasses,
  vehicleClasses,
  type IndustryCompatibility,
  type VehicleCompatibility
} from "@/data/coldChainMatrix";

const industryBadgeClass: Record<IndustryCompatibility, string> = {
  "高度適合": "border-primary text-primary",
  "可考慮": "border-secondary text-secondary",
  "需進一步評估": "border-warning text-warning"
};

const vehicleBadgeClass: Record<VehicleCompatibility, string> = {
  "建議": "border-primary text-primary",
  "可考慮": "border-secondary text-secondary",
  "不太適合": "border-warning text-warning"
};

export default function ColdChainMatrix() {
  const [selectedId, setSelectedId] = useState(temperatureClasses[0].id);
  const selected = temperatureClasses.find((item) => item.id === selectedId)!;

  return (
    <div className="space-y-8">
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-surface2">
              <th className="border-b border-border p-4 text-left font-medium text-gray-600">
                溫度分類
              </th>
              {industries.map((industry) => (
                <th
                  key={industry.id}
                  className="border-b border-border p-4 text-left font-medium text-gray-600"
                >
                  {industry.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {temperatureClasses.map((tempClass) => (
              <tr
                key={tempClass.id}
                onClick={() => setSelectedId(tempClass.id)}
                className={`cursor-pointer border-b border-border transition hover:bg-surface ${
                  tempClass.id === selectedId ? "bg-surface" : "bg-bg"
                }`}
              >
                <td className="p-4">
                  <div className="font-semibold text-gray-900">{tempClass.name}</div>
                  <div className="mt-1 text-xs text-gray-500">{tempClass.range}</div>
                </td>
                {industries.map((industry) => {
                  const level = tempClass.industryCompatibility[industry.id];
                  return (
                    <td key={industry.id} className="p-4">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${industryBadgeClass[level]}`}
                      >
                        {level}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          方案詳情
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{selected.name}</h3>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <div className="text-sm font-medium text-gray-600">營運應用情境</div>
            <p className="mt-2 text-sm leading-7 text-gray-500">
              適用於{selected.cargoExamples}等貨物的配送需求。
            </p>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-600">溫度需求</div>
            <p className="mt-2 text-sm leading-7 text-gray-500">{selected.range}</p>
          </div>

          <div className="md:col-span-2">
            <div className="text-sm font-medium text-gray-600">車型適配建議</div>
            <div className="mt-3 flex flex-wrap gap-3">
              {vehicleClasses.map((vehicleClass) => {
                const level = selected.vehicleCompatibility[vehicleClass];
                return (
                  <span
                    key={vehicleClass}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${vehicleBadgeClass[level]}`}
                  >
                    {vehicleClass}
                    <span className="text-gray-600">{level}</span>
                  </span>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="text-sm font-medium text-gray-600">電動車營運影響</div>
            <p className="mt-2 text-sm leading-7 text-gray-500">{selected.evImpact}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface2 p-6">
        <p className="text-sm leading-7 text-gray-500">{coldChainDisclaimer}</p>
      </div>
    </div>
  );
}
