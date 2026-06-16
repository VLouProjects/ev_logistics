export type IndustryCompatibility = "高度適合" | "可考慮" | "需進一步評估";
export type VehicleCompatibility = "建議" | "可考慮" | "不太適合";

export const industries = [
  { id: "foodCatering", name: "餐飲及食品" },
  { id: "seafoodFrozen", name: "海鮮及冷凍食品" },
  { id: "pharma", name: "醫藥運輸" },
  { id: "retail", name: "零售配送" },
  { id: "ecommerce", name: "電商及短途配送" }
];

export const vehicleClasses = [
  "電動客貨車",
  "輕型電動貨車",
  "中型電動貨車",
  "重型電動貨車"
] as const;

export const temperatureClasses = [
  {
    id: "chilled",
    name: "冷藏配送",
    range: "0°C 至 5°C",
    cargoExamples: "蔬果、乳製品、飲品、冷藏餐食",
    industryCompatibility: {
      foodCatering: "高度適合",
      seafoodFrozen: "可考慮",
      pharma: "需進一步評估",
      retail: "高度適合",
      ecommerce: "可考慮"
    } as Record<string, IndustryCompatibility>,
    vehicleCompatibility: {
      "電動客貨車": "可考慮",
      "輕型電動貨車": "建議",
      "中型電動貨車": "建議",
      "重型電動貨車": "可考慮"
    } as Record<string, VehicleCompatibility>,
    evImpact:
      "冷藏系統耗電相對較低，惟仍會因車廂保溫及壓縮機運作影響整體續航表現，建議於規劃路線及充電排程時納入考量。"
  },
  {
    id: "frozen",
    name: "冷凍運輸",
    range: "-18°C 至 -25°C",
    cargoExamples: "海鮮、急凍食品、冷凍肉類",
    industryCompatibility: {
      foodCatering: "可考慮",
      seafoodFrozen: "高度適合",
      pharma: "需進一步評估",
      retail: "可考慮",
      ecommerce: "需進一步評估"
    } as Record<string, IndustryCompatibility>,
    vehicleCompatibility: {
      "電動客貨車": "不太適合",
      "輕型電動貨車": "可考慮",
      "中型電動貨車": "建議",
      "重型電動貨車": "建議"
    } as Record<string, VehicleCompatibility>,
    evImpact:
      "冷凍系統耗電需求較高，對電動車續航影響較為明顯，建議優先評估車輛電池容量、路線距離及充電安排。"
  },
  {
    id: "pharma",
    name: "醫藥溫控",
    range: "2°C 至 8°C",
    cargoExamples: "醫療用品、保健產品、溫控藥品",
    industryCompatibility: {
      foodCatering: "需進一步評估",
      seafoodFrozen: "需進一步評估",
      pharma: "高度適合",
      retail: "可考慮",
      ecommerce: "可考慮"
    } as Record<string, IndustryCompatibility>,
    vehicleCompatibility: {
      "電動客貨車": "建議",
      "輕型電動貨車": "建議",
      "中型電動貨車": "可考慮",
      "重型電動貨車": "可考慮"
    } as Record<string, VehicleCompatibility>,
    evImpact:
      "醫藥溫控配置對溫度穩定性要求嚴格，製冷系統需穩定運作，對續航的影響介於冷藏與冷凍之間，建議納入備援電力或充電規劃。"
  },
  {
    id: "multiTemp",
    name: "多溫層配送",
    range: "多溫區配置",
    cargoExamples: "超市配送、混合食品配送、多品類路線",
    industryCompatibility: {
      foodCatering: "高度適合",
      seafoodFrozen: "可考慮",
      pharma: "可考慮",
      retail: "高度適合",
      ecommerce: "高度適合"
    } as Record<string, IndustryCompatibility>,
    vehicleCompatibility: {
      "電動客貨車": "不太適合",
      "輕型電動貨車": "可考慮",
      "中型電動貨車": "建議",
      "重型電動貨車": "建議"
    } as Record<string, VehicleCompatibility>,
    evImpact:
      "多溫層配置因應同時運作多組溫區設備，整體耗電量相對較高，且車廂配置較複雜，建議於車型及路線規劃階段一併評估。"
  }
];

export const coldChainDisclaimer =
  "以上內容僅作初步方案評估，最終車型及冷鏈配置需根據實際品牌、車款、車廂規格、載重、路線及營運條件確認。";
