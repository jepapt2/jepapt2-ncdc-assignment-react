//revalidatePathはサーバーサイドでのみ使用できる
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  deleteContent,
  getContentList,
  createContent,
  updateContent,
} from "./content-api";
import type { ContentSchema, CreateContentDTOSchema } from "./schemas/content";

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

export async function saveContentAction({
  content,
  currentContent,
}: {
  content: CreateContentDTOSchema;
  currentContent?: ContentSchema;
}) {
  try {
    let resultData: ContentSchema;
    // 現在のコンテンツが存在する場合は更新、存在しない場合は作成
    if (currentContent) {
      resultData = await updateContent(currentContent.id, content);
    } else {
      resultData = await createContent(content);
    }
    // パスの再検証
    revalidatePath("/content");
    return { success: true, content: resultData };
  } catch (error) {
    console.error("コンテンツの作成に失敗しました", error);
    return { success: false };
  }
}
