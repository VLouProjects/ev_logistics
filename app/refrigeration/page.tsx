import Link from "next/link";
import Section from "@/components/Section";
import ColdChainMatrix from "@/components/ColdChainMatrix";

export default function RefrigerationPage() {
  return (
    <>
      <Section
        eyebrow="Cold Chain Solutions"
        title="冷鏈配置評估矩陣"
        description="冷鏈不是單一車型功能，而是溫度、貨物、車廂、路線及營運模式的整合配置。選擇溫度分類，了解行業適配程度、車型建議及電動車營運影響。"
      >
        <ColdChainMatrix />
      </Section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-[800px] overflow-hidden rounded-3xl">
          <div className="bg-[#1E293B] px-10 py-10 text-center md:px-14 md:py-12">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Cold Chain Advisory
            </div>
            <h2 className="text-2xl font-semibold text-white">
              需要根據冷鏈配置評估合適的電動物流車輛？
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              提供配送場景、貨物類型及溫控需求，我們將協助您初步評估合適方向。
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
