import Link from "next/link";
import { trustPillars } from "@/data/trustPillars";
import AdvisoryProcess from "@/components/AdvisoryProcess";

const gatewayCards = [
  {
    title: "車輛方案",
    description: "電動客貨車、輕型貨車、中型貨車、重型貨車及冷藏車方案。",
    href: "/vehicles",
    cta: "查看車輛方案"
  },
  {
    title: "行業應用",
    description: "根據餐飲、零售、醫藥、冷鏈及企業物流場景匹配合適方案。",
    href: "/solutions",
    cta: "查看行業應用"
  },
  {
    title: "冷鏈方案",
    description: "評估冷藏、冷凍、醫藥溫控及多溫層配送配置。",
    href: "/refrigeration",
    cta: "查看冷鏈方案"
  },
  {
    title: "車隊顧問",
    description: "協助企業初步評估車型、路線、成本因素及電動化導入方向。",
    href: "/fleet-economics",
    cta: "查看車隊顧問"
  }
];


const snapshotRows = [
  { label: "車輛類型", value: "輕型電動貨車" },
  { label: "冷鏈需求", value: "冷藏 0–5°C" },
  { label: "車隊規模", value: "5–15 輛" },
  { label: "行業場景", value: "食品及零售配送" }
];

const snapshotSteps = ["需求分析", "車型比較", "冷鏈配置", "採購建議"];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="px-6 py-12 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid items-center gap-12 lg:grid-cols-12">

            {/* Left: headline + CTA */}
            <div className="lg:col-span-7">
              <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Electric Logistics Vehicle Solutions
              </div>

              <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-gray-900 md:text-5xl lg:text-7xl">
                企業級電動物流車輛及冷鏈運輸方案專家
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
                整合多品牌電動客貨車、貨車及冷藏車資源，根據不同行業及營運需求提供專業選型、採購及車隊規劃服務。
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-xl bg-primary px-6 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
                >
                  預約專家諮詢
                </Link>
                <Link
                  href="/vehicles"
                  className="rounded-xl border border-border px-6 py-3 text-center text-sm font-semibold text-gray-900 transition hover:border-secondary hover:text-secondary"
                >
                  探索車輛方案
                </Link>
              </div>
            </div>

            {/* Right: advisory snapshot panel */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#1E293B] p-7 shadow-xl">
                {/* Panel header */}
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Advisory Brief
                  </span>
                  <span className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                    多品牌評估中
                  </span>
                </div>

                {/* Data rows */}
                <div className="space-y-0 divide-y divide-white/10">
                  {snapshotRows.map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-3">
                      <span className="text-xs text-gray-400">{label}</span>
                      <span className="text-sm font-medium text-white">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-gray-400">多品牌方案比較進度</span>
                    <span className="font-medium text-primary">75%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/10">
                    <div className="h-1.5 w-3/4 rounded-full bg-primary" />
                  </div>
                </div>

                {/* Step indicators */}
                <div className="mt-6 grid grid-cols-4 gap-1.5">
                  {snapshotSteps.map((step, i) => (
                    <div
                      key={step}
                      className={`rounded-lg px-2 py-2.5 text-center ${
                        i < 3
                          ? "bg-primary/20 text-white"
                          : "bg-white/[0.08] text-slate-300"
                      }`}
                    >
                      <div className="text-xs font-semibold">
                        {i < 3 ? "✓" : "→"}
                      </div>
                      <div className="mt-1 text-[10px] leading-tight">{step}</div>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-[11px] leading-5 text-slate-400">
                  本評估為示例用途。實際方向須經專業諮詢後確認。
                </p>
              </div>
            </div>
          </div>

          {/* Trust bar */}
          <div className="mt-10 grid gap-4 md:mt-16 md:grid-cols-4">
            {trustPillars.map((pillar) => (
              <div
                key={pillar}
                className="rounded-xl border border-border bg-surface p-5 text-sm font-medium text-gray-600"
              >
                <span className="mr-2 text-primary">✓</span>
                {pillar}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Positioning Statement ────────────────────────────────── */}
      <section className="border-t border-border px-6 py-14 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Our Role
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
              不只是車輛供應，而是電動物流方案選型夥伴
            </h2>
          </div>

          <div className="lg:col-span-7">
            <p className="text-lg leading-8 text-gray-600">
              我們協助企業在導入電動物流車輛前，先釐清車輛類型、載貨需求、配送路線、冷鏈配置及營運成本因素，再根據實際業務場景匹配合適的多品牌車輛方案。
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="text-sm font-semibold text-primary">Selection First</div>
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  先分析業務需求，再建議合適車型及配置方向。
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="text-sm font-semibold text-secondary">Multi-Brand Neutrality</div>
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  以多品牌選擇及實際應用場景作為方案基礎。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Advisory Process ─────────────────────────────────────── */}
      <section className="border-t border-border bg-surface px-6 py-14 md:py-24 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 md:mb-14">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Advisory Process
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
              從需求到採購，全程顧問支援
            </h2>
          </div>

          <AdvisoryProcess />
        </div>
      </section>

      {/* ── Gateway Cards ────────────────────────────────────────── */}
      <section className="border-t border-border px-6 py-14 md:py-24 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 max-w-3xl md:mb-12">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Explore Solutions
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
              從業務需求出發，選擇合適的電動物流方案
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-500">
              深入了解車輛方案、行業應用、冷鏈配置及車隊規劃服務。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {gatewayCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-3xl border border-border bg-surface p-8 transition hover:border-secondary hover:bg-surface2"
              >
                <div className="text-xl font-semibold text-gray-900">{card.title}</div>
                <p className="mt-4 text-sm leading-7 text-gray-500">{card.description}</p>
                <div className="mt-8 text-sm font-semibold text-primary group-hover:text-secondary">
                  {card.cta} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <section className="px-6 py-14 md:py-24 lg:px-8">
        <div className="mx-auto max-w-[800px] rounded-3xl border border-border bg-surface2 p-8 text-center md:p-14">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Consultation
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            需要協助選擇合適的電動物流車輛方案？
          </h2>
          <p className="mt-5 text-base leading-7 text-gray-500">
            提供您的業務需求、車輛用途及冷鏈要求，我們將協助您初步評估合適方向。
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            提交諮詢
          </Link>
        </div>
      </section>
    </>
  );
}
