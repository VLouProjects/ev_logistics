import Link from "next/link";
import Section from "@/components/Section";
import Card from "@/components/Card";
import { brandAdvisoryProcess, brandSelectionCriteria } from "@/data/brandPortfolio";

export default function BrandPortfolioPage() {
  return (
    <>
      <Section
        eyebrow="Brand Portfolio"
        title="精選多品牌電動物流車輛方案"
        description="我們協助企業從多個品牌及配置中比較及篩選合適的電動物流車輛，包括電動客貨車、各級電動貨車及冷藏車方案，並根據實際營運需求提供選型建議。"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {brandSelectionCriteria.map((item) => (
            <Card key={item.name} title={item.name} description={item.description} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Advisory Process"
        title="多品牌選型流程"
        description="從了解需求到協調交付，我們陪同企業完成整個選型及採購評估流程。"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {brandAdvisoryProcess.map((item, index) => (
            <Card key={item.step} title={`${index + 1}. ${item.step}`} description={item.description} />
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            預約專家諮詢
          </Link>
        </div>
      </Section>
    </>
  );
}
