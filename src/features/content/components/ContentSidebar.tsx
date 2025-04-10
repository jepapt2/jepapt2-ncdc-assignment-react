import Logo from "@/components/svg/Logo";
import ContentList from "./ContentList";

/**
 * コンテンツサイドバーコンポーネント
 * コンテンツリストとサイドバーのナビゲーション要素を含む
 */
export default function ContentSidebar() {
  return (
    <div className="h-full border-r border-light-bg-secondary pl-4 pt-3">
      <div className="flex items-center gap-[4px] mb-2">
        <Logo />
        <h1 className="font-bold text-[24px] line-height-[24px]">
          ServiceName
        </h1>
      </div>

      <ContentList />
    </div>
  );
}
