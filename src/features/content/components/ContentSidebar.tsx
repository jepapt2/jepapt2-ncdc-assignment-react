import Logo from "@/components/svg/Logo";
import ContentList from "./ContentList";

/**
 * コンテンツサイドバーコンポーネント
 * コンテンツリストとサイドバーのナビゲーション要素を含む
 */
export default function ContentSidebar() {
  return (
    <div className="h-full border-r border-light-bg-secondary relative">
      {/* メインコンテンツ部分 */}
      <div className="flex flex-col h-full pt-3 pl-4 pb-[60px]">
        <div className="flex items-center gap-[4px] mb-2">
          <Logo />
          <h1 className="font-bold text-[24px] line-height-[24px]">
            ServiceName
          </h1>
        </div>
        <div className="flex-1 overflow-auto">
          <ContentList />
        </div>
      </div>

      {/* 下部バー（高さ60px固定、position: fixed） */}
      <div className="h-[60px]  flex items-center p-1 bg-light-bg-secondary absolute bottom-0 left-0 right-0 z-10">
        aa
      </div>
    </div>
  );
}
