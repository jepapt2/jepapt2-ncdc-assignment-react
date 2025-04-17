import ContentLayout from "@/features/content/components/ContentLayout";
import ContentEditor from "@/features/content/components/ContentEditor";
import { getContent } from "@/features/content/content-api";
import { notFound } from "next/navigation";

export default async function ContentDetailPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // IDが数字以外の場合は404ページにリダイレクト
  if (!/^\d+$/.test(id)) {
    notFound();
  }

  try {
    // コンテンツデータを取得
    const contentData = await getContent(Number(id));

    return (
      <ContentLayout>
        <ContentEditor content={contentData} />
      </ContentLayout>
    );
  } catch (error) {
    // データ取得エラーの場合は404ページを表示
    console.error(`コンテンツ(ID: ${id})の取得に失敗しました`, error);
    notFound();
  }
}
