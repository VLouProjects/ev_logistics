import Link from "next/link";
import Section from "@/components/Section";
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
            <div
              key={item.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]"
            >
              {/* Gradient accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary" />

              <div className="flex flex-1 flex-col p-6">
                {/* Numbered icon + title */}
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">{item.name}</h3>
                </div>

                {/* Description */}
                <p className="text-sm leading-6 text-gray-500">{item.description}</p>

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
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-[800px] overflow-hidden rounded-3xl">
          <div className="bg-[#1E293B] px-10 py-10 text-center md:px-14 md:py-12">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Industry Advisory
            </div>
            <h2 className="text-2xl font-semibold text-white">
              需要根據您的行業場景評估合適的電動物流方案？
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              提供業務需求、配送場景及冷鏈要求，我們將協助您初步評估合適方向。
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              提交諮詢
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
