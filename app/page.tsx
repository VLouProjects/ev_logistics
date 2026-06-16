import Link from "next/link";
import { trustPillars } from "@/data/trustPillars";

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

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 py-24 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-4xl">
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Electric Logistics Vehicle Solutions
            </div>

            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-gray-900 md:text-7xl">
              企業級電動物流車輛及冷鏈運輸方案專家
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-600">
              整合多品牌電動客貨車、貨車及冷藏車資源，根據不同行業及營運需求提供專業選型、採購及車隊規劃服務，協助企業建立更高效、更可持續的物流運營體系。
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
                className="rounded-xl border border-border px-6 py-3 text-center text-sm font-semibold text-gray-900 transition hover:border-secondary"
              >
                探索車輛方案
              </Link>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="mt-16 grid gap-4 md:grid-cols-4">
            {trustPillars.map((pillar) => (
              <div
                key={pillar}
                className="rounded-xl border border-border bg-surface p-5 text-sm font-medium text-gray-700"
              >
                <span className="mr-2 text-primary">✓</span>
                {pillar}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning Statement */}
      <section className="border-t border-border px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
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
                <div className="text-sm font-semibold text-primary">
                  Selection First
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  先分析業務需求，再建議合適車型及配置方向。
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="text-sm font-semibold text-secondary">
                  Multi-Brand Neutrality
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  以多品牌選擇及實際應用場景作為方案基礎。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gateway Cards */}
      <section className="border-t border-border px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 max-w-3xl">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
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
                <div className="text-xl font-semibold text-gray-900">
                  {card.title}
                </div>

                <p className="mt-4 text-sm leading-7 text-gray-500">
                  {card.description}
                </p>

                <div className="mt-8 text-sm font-semibold text-primary group-hover:text-secondary">
                  {card.cta} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-[800px] rounded-3xl border border-border bg-surface2 p-10 text-center md:p-14">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
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