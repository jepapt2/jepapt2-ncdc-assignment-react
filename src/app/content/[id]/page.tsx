import ContentLayout from "@/features/content/components/ContentLayout";
import { notFound } from "next/navigation";

export default async function ContentsPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // IDが数字以外の場合は404ページにリダイレクト
  if (!/^\d+$/.test(id)) {
    notFound();
  }

  return (
    <ContentLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">コンテンツ詳細</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">ID: {id}</h2>
            <p className="text-gray-600">
              このページはコンテンツID: {id} の詳細ページです。
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">コンテンツ情報</h3>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-700">
                ここにコンテンツの詳細情報が表示されます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
