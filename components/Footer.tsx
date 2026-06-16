export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-10 md:grid-cols-3 lg:px-8">
        <div>
          <div className="font-semibold text-gray-900">EV Logistics Expert</div>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            企業級電動物流車輛及冷鏈運輸方案專家。
          </p>
        </div>

        <div>
          <div className="text-sm font-medium text-gray-900">核心服務</div>
          <ul className="mt-3 space-y-2 text-sm text-gray-500">
            <li>多品牌車型選擇</li>
            <li>冷鏈運輸配置</li>
            <li>車隊規劃顧問</li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-medium text-gray-900">聯絡</div>
          <p className="mt-3 text-sm text-gray-500">
            提交需求後，我們將協助您初步評估合適方案。
          </p>
        </div>
      </div>
    </footer>
  );
}