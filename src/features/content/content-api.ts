import { getApi } from "@/lib/api/client";
import { type ContentListSchema, contentListSchema } from "./schemas/content";

const contentUrl = "/content";

/**
 * コンテンツ一覧を取得する
 * @returns コンテンツ一覧
 */
export async function getContentList(): Promise<ContentListSchema> {
  try {
    // APIリクエスト
    const response = await getApi({
      url: contentUrl,
      schema: contentListSchema,
    });
    return response.data;
  } catch (error) {
    console.error("コンテンツ一覧の取得に失敗しました", error);
    throw new Error("コンテンツ一覧の取得に失敗しました");
  }
}
