//revalidatePathはサーバーサイドでのみ使用できる
"use server";

import { revalidatePath } from "next/cache";
import { deleteContent, createContent, updateContent } from "./content-api";
import type { ContentSchema, CreateContentDTOSchema } from "./schemas/content";
import { redirectAfterContentDeletionPath } from "@/lib/utils/redirectAfterContentDeletion";

export async function deleteContentAction(
  content: ContentSchema,
  currentContentId?: number,
) {
  try {
    await deleteContent(content);

    // 削除したコンテンツが現在表示中のコンテンツだった場合の処理
    if (currentContentId && currentContentId === content.id) {
      const path = await redirectAfterContentDeletionPath();
      return { success: true, path };
    }
    // パスの再検証
    revalidatePath("/content");
    return { success: true };
  } catch (error) {
    console.error("コンテンツの削除に失敗しました", error);
    return { success: false };
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
