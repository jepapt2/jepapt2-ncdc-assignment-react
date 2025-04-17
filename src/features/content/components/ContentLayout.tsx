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

      <div className="flex-1 pt-4 px-4 flex flex-col">
        {children}
        <div className="h-6 flex items-center justify-between text-caption">
          <p>Copyright © 2021 Sample</p>
          <p>運営会社</p>
        </div>
      </div>
    </div>
  );
}
