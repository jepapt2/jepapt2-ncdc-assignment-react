import ContentSidebar from "./ContentSidebar";

interface ContentLayoutProps {
  children: React.ReactNode;
}

/**
 * コンテンツリストとメインコンテンツを横並びにするレイアウトコンポーネント
 */
export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div className="flex flex-row h-[100vh]">
      {/* サイドバー: コンテンツリストとナビゲーション */}

      <ContentSidebar />

      {/* メインコンテンツ */}
      <div>{children}</div>
    </div>
  );
}
