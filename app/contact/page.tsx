"use client";

import Section from "@/components/Section";
import MotionReveal from "@/components/MotionReveal";

export default function ContactPage() {
  return (
    <Section
      eyebrow="Contact"
      title="提交諮詢"
      description="提供您的業務需求、車輛用途及冷鏈要求，我們將協助您初步評估合適方向。"
    >
      <MotionReveal className="max-w-2xl">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <form
            noValidate
            onSubmit={(e) => e.preventDefault()}
            className="grid gap-5"
          >
            {[
              { label: "姓名", type: "text", autoComplete: "name" },
              { label: "公司", type: "text", autoComplete: "organization" },
              { label: "電郵", type: "email", autoComplete: "email" },
              { label: "電話", type: "tel", autoComplete: "tel" },
              { label: "車輛需求", type: "text", autoComplete: "off" }
            ].map(({ label, type, autoComplete }) => (
              <label key={label} className="block">
                <div className="mb-2 text-sm font-medium text-gray-600">{label}</div>
                <input
                  type={type}
                  autoComplete={autoComplete}
                  className="w-full rounded-lg border border-input bg-bg px-3 py-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </label>
            ))}

            <label className="block">
              <div className="mb-2 text-sm font-medium text-gray-600">是否需要冷鏈配置？</div>
              <select className="w-full rounded-lg border border-input bg-bg px-3 py-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                <option>尚未確定</option>
                <option>需要</option>
                <option>不需要</option>
              </select>
            </label>

            <button
              type="submit"
              className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              提交諮詢
            </button>
          </form>
        </div>
      </MotionReveal>
    </Section>
  );
}
