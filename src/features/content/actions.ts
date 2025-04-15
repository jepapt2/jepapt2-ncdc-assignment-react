"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteContent, getContentList } from "./content-api";
import type { ContentSchema } from "./schemas/content";

export async function deleteContentAction(
  content: ContentSchema,
  currentContentId?: number,
) {
  await deleteContent(content);

  // パスの再検証
  revalidatePath("/content");

  // 削除したコンテンツが現在表示中のコンテンツだった場合の処理
  if (currentContentId && currentContentId === content.id) {
    // 削除後に最新のコンテンツリストを取得
    const remainingContents = await getContentList();

    if (remainingContents.length > 0) {
      // リストの先頭のコンテンツに遷移
      redirect(`/content/${remainingContents[0].id}`);
    } else {
      // コンテンツがない場合は新規作成ページへ遷移
      redirect("/content/new");
    }
  }
}
