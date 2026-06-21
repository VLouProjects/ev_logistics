import Link from "next/link";
import Section from "@/components/Section";
import MotionReveal from "@/components/MotionReveal";
import AspectImage from "@/components/AspectImage";
import { industrySolutions } from "@/data/industrySolutions";

export default function SolutionsPage() {
  return (
    <>
      <Section
        eyebrow="Industry Solutions"
        title="行業應用場景"
        description="以下場景代表我們提供選型顧問服務的主要行業及應用場景。提供您的業務需求，我們將協助匹配合適的電動物流車輛及冷鏈配置。"
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industrySolutions.map((item, i) => (
            <MotionReveal key={item.name} delay={Math.min(i, 4) * 80}>
            <div
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg shadow-sm"
            >
              {/* Image with overlaid editorial index number */}
              <div className="relative">
                <AspectImage
                  src={item.image}
                  alt={item.name}
                  ratio="3/2"
                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                />
                <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-md">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-gray-500">{item.description}</p>

                {/* Use-case tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.considerations.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-medium text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            </MotionReveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-14 md:py-24 lg:px-8">
        <MotionReveal className="mx-auto max-w-[800px] overflow-hidden rounded-3xl">
          <div className="bg-[#1E293B] px-10 py-10 text-center md:px-14 md:py-12">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
              Industry Advisory
            </div>
            <h2 className="text-2xl font-semibold text-white">
              需要根據您的行業場景評估合適的電動物流方案？
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              提供業務需求、配送場景及冷鏈要求，我們將協助您初步評估合適方向。
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              提交諮詢
            </Link>
          </div>
        </MotionReveal>
      </section>
    </>
  );
}
