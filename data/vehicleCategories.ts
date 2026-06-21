export type VehicleCategory = {
  name: string;
  description: string;
  useCases: string[];
  refrigerationOption: string;
  /** Local path under /public, e.g. "/images/vehicles/light-truck.webp". Optional until photography is supplied. */
  image?: string;
};

export const vehicleCategories: VehicleCategory[] = [
  {
    name: "電動客貨車",
    description: "適合城市配送、電商物流及中小型企業運輸。",
    useCases: ["電商配送", "企業物流", "城市短途配送"],
    refrigerationOption: "可選配"
  },
  {
    name: "輕型電動貨車",
    description: "適合零售配送、食品運輸及日常商用物流。",
    useCases: ["零售配送", "食品配送", "冷鏈入門方案"],
    refrigerationOption: "可選配"
  },
  {
    name: "中型電動貨車",
    description: "適合較高載貨量及穩定路線的商業配送需求。",
    useCases: ["批發配送", "餐飲供應鏈", "企業車隊"],
    refrigerationOption: "可選配"
  },
  {
    name: "重型電動貨車",
    description: "適合大批量貨物運輸及中長距離物流場景。",
    useCases: ["大型配送", "倉儲物流", "批量運輸"],
    refrigerationOption: "視品牌及車型而定"
  },
  {
    name: "冷藏車方案",
    description: "適合食品、醫藥、海鮮及其他溫控運輸需求。",
    useCases: ["冷藏", "冷凍", "多溫層配送"],
    refrigerationOption: "核心方案"
  }
];