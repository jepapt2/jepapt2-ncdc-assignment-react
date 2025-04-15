"use server";

import { revalidatePath } from "next/cache";
import { deleteContent } from "./content-api";
import type { ContentSchema } from "./schemas/content";

export async function deleteContentAction(content: ContentSchema) {
  // コンテンツの削除
  await deleteContent(content);

  // パスの再検証 (コンテンツ一覧を更新)
  revalidatePath("/content");
}
