import Link from "next/link";
import Section from "@/components/Section";
import Card from "@/components/Card";
import { industrySolutions } from "@/data/industrySolutions";

export default function SolutionsPage() {
  return (
    <>
      <Section
        eyebrow="Industry Solutions"
        title="行業應用"
        description="根據不同物流場景，協助企業匹配合適的電動物流車輛及冷鏈配置。"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {industrySolutions.map((item) => (
            <Card
              key={item.name}
              title={item.name}
              description={item.description}
            />
          ))}
        </div>
      </Section>

      <section className="border-t border-border px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-[800px] rounded-3xl border border-border bg-surface p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            需要根據您的行業場景評估合適的電動物流方案？
          </h2>
          <p className="mt-4 text-sm leading-7 text-gray-500">
            提供業務需求、配送場景及冷鏈要求，我們將協助您初步評估合適方向。
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            提交諮詢
          </Link>
        </div>
      </section>
    </>
  );
}
