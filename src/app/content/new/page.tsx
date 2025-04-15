import ContentLayout from "@/features/content/components/ContentLayout";
import ContentEditor from "@/features/content/components/ContentEditor";

export default function NewContentsPage() {
  return (
    <ContentLayout>
      <div className="p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">新規コンテンツ作成</h1>
        <ContentEditor />
      </div>
    </ContentLayout>
  );
}
