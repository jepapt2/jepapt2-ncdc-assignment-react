import { notFound } from "next/navigation";

interface ContentsPageProps {
  params: {
    id: string;
  };
}

export default function ContentsPage({ params }: ContentsPageProps) {
  const { id } = params;

  // IDが数字以外の場合は404ページにリダイレクト
  if (!/^\d+$/.test(id)) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
  );
}
