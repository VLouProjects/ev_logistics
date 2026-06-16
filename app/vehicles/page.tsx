import Link from "next/link";
import Section from "@/components/Section";
import Card from "@/components/Card";
import { vehicleCategories } from "@/data/vehicleCategories";

export default function VehiclesPage() {
  return (
    <>
      <Section
        eyebrow="Vehicle Solutions"
        title="車輛方案"
        description="提供多品牌電動客貨車、貨車及冷藏車方案，根據企業營運需求進行選型及配置建議。"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vehicleCategories.map((item) => (
            <Card key={item.name} title={item.name} description={item.description}>
              <div className="space-y-3 text-sm">
                <div className="text-gray-600">
                  <span className="font-medium text-gray-700">冷鏈選項：</span>
                  {item.refrigerationOption}
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.useCases.map((useCase) => (
                    <span
                      key={useCase}
                      className="rounded-full border border-border px-3 py-1 text-xs text-gray-600"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <section className="border-t border-border px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-[800px] rounded-3xl border border-border bg-surface p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            需要協助比較及選擇合適的電動物流車輛？
          </h2>
          <p className="mt-4 text-sm leading-7 text-gray-500">
            提供業務需求及配送場景，我們將協助您初步評估合適的多品牌車輛方向。
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            預約選型諮詢
          </Link>
        </div>
      </section>
    </>
  );
}
