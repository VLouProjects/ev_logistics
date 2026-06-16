import Section from "@/components/Section";
import ColdChainMatrix from "@/components/ColdChainMatrix";

export default function RefrigerationPage() {
  return (
    <Section
      eyebrow="Cold Chain Solutions"
      title="冷鏈配置評估矩陣"
      description="冷鏈不是單一車型功能，而是溫度、貨物、車廂、路線及營運模式的整合配置。選擇溫度分類，了解行業適配程度、車型建議及電動車營運影響。"
    >
      <ColdChainMatrix />
    </Section>
  );
}
