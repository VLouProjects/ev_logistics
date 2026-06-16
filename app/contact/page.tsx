import Section from "@/components/Section";

export default function ContactPage() {
  return (
    <Section
      eyebrow="Contact"
      title="提交諮詢"
      description="提供您的業務需求、車輛用途及冷鏈要求，我們將協助您初步評估合適方向。"
    >
      <div className="max-w-2xl rounded-2xl border border-border bg-surface p-6">
        <div className="grid gap-5">
          {["姓名", "公司", "電郵", "電話", "車輛需求"].map((label) => (
            <label key={label} className="block">
              <div className="mb-2 text-sm font-medium text-gray-600">{label}</div>
              <input className="w-full rounded-lg border border-border bg-bg px-3 py-3 text-gray-900" />
            </label>
          ))}

          <label className="block">
            <div className="mb-2 text-sm font-medium text-gray-600">是否需要冷鏈配置？</div>
            <select className="w-full rounded-lg border border-border bg-bg px-3 py-3 text-gray-900">
              <option>尚未確定</option>
              <option>需要</option>
              <option>不需要</option>
            </select>
          </label>

          <button className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            提交諮詢
          </button>
        </div>
      </div>
    </Section>
  );
}