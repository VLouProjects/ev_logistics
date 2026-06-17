import Link from "next/link";
import Section from "@/components/Section";
import { vehicleCategories } from "@/data/vehicleCategories";

const refPill: Record<string, string> = {
  "可選配":            "border-secondary/30 bg-secondary/10 text-secondary",
  "核心方案":          "border-primary/30 bg-primary/10 text-primary",
  "視品牌及車型而定":  "border-warning/30 bg-warning/10 text-warning"
};

export default function VehiclesPage() {
  return (
    <>
      <Section
        eyebrow="Vehicle Solutions"
        title="車輛方案類別"
        description="以下類別代表不同載重級別及應用場景的電動物流車輛方案。我們根據您的業務需求，協助比較及篩選合適的多品牌車型及配置，不代表任何品牌或型號。"
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {vehicleCategories.map((item, i) => (
            <div
              key={item.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-bg shadow-sm"
            >
              <div className="h-1 w-full shrink-0 bg-gradient-to-r from-primary to-secondary" />

              <div className="flex flex-1 flex-col p-6">
                {/* Name + refrigeration badge */}
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                      refPill[item.refrigerationOption] ?? "border-border bg-surface text-gray-500"
                    }`}
                  >
                    冷鏈{item.refrigerationOption}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm leading-6 text-gray-500">{item.description}</p>

                {/* Use cases */}
                <div className="mt-5">
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    典型應用場景
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.useCases.map((uc) => (
                      <span
                        key={uc}
                        className="rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-medium text-gray-600"
                      >
                        {uc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Advisory footer */}
                <div className="mt-auto border-t border-border pt-5">
                  <Link
                    href="/contact"
                    className="text-sm font-semibold text-primary transition hover:text-secondary"
                  >
                    了解選型建議 →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-14 md:py-24 lg:px-8">
        <div className="mx-auto max-w-[800px] overflow-hidden rounded-3xl">
          <div className="bg-[#1E293B] px-10 py-10 text-center md:px-14 md:py-12">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
              Vehicle Advisory
            </div>
            <h2 className="text-2xl font-semibold text-white">
              需要協助比較及選擇合適的電動物流車輛？
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              提供業務需求及配送場景，我們將協助您初步評估合適的多品牌車輛方向。
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              預約選型諮詢
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
