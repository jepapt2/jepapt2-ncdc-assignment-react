"use client";
import { twMerge } from "tailwind-merge";
import { isEditingContentListAtom } from "../atom/contentListAtom";
import type { ContentSchema } from "../schemas/content";
import DeleteIconButton from "@/components/DeleteIconButton";
import { deleteContentAction } from "../actions";
import { useAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

type ContentListTileProps = {
  content: ContentSchema;
};

export default function ContentListTile({ content }: ContentListTileProps) {
  const [isEditing] = useAtom(isEditingContentListAtom);
  const params = useParams();
  const router = useRouter();
  // 現在表示中のコンテンツIDを数値として取得
  const currentContentId = params.id ? Number(params.id) : undefined;

  // 現在表示中のコンテンツかどうかを判定
  const isCurrentContent = currentContentId === content.id;

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm("このコンテンツを削除してもよろしいですか？")) {
      // 現在のコンテンツIDを渡して削除処理を実行
      const result = await deleteContentAction(content, currentContentId);
      if (result.path) {
        router.push(result.path);
      }
      if (!result.success) {
        toast.error("コンテンツの削除に失敗しました");
      }
    }
  };

  return (
    <a href={`/content/${content.id}`} key={content.id}>
      <div
        className={twMerge(
          "rounded-sm p-1 text-body hover:cursor-pointer flex items-center justify-between",
          //閲覧中のコンテンツの場合
          isCurrentContent && "bg-light-bg text-brand font-bold",
        )}
      >
        <p className="truncate">{content.title}</p>
        {isEditing && <DeleteIconButton onClick={handleDelete} />}
      </div>
    </a>
  );
}
