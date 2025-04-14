import { getApi, postApi, putApi, deleteApi } from "@/lib/api/client";
import {
  type ContentListSchema,
  contentListSchema,
  createContentDTOSchema,
} from "./schemas/content";
import {
  type ContentSchema,
  contentSchema,
  type CreateContentDTOSchema,
} from "./schemas/content";

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

/**
 * コンテンツを1件取得する
 * @param id コンテンツID
 * @returns コンテンツ
 */
export async function getContent(id: number): Promise<ContentSchema> {
  try {
    // APIリクエスト
    const response = await getApi({
      url: `${contentUrl}/${id}`,
      schema: contentSchema,
    });
    return response.data;
  } catch (error) {
    console.error(`コンテンツ(ID: ${id})の取得に失敗しました`, error);
    throw new Error("コンテンツの取得に失敗しました");
  }
}

/**
 * コンテンツを作成する
 * @param content 作成するコンテンツデータ
 * @returns 作成されたコンテンツ
 */
export async function createContent(
  content: CreateContentDTOSchema,
): Promise<ContentSchema> {
  try {
    // APIリクエスト
    const response = await postApi({
      url: contentUrl,
      data: content,
      createSchema: createContentDTOSchema,
      responseSchema: contentSchema,
    });
    return response.data;
  } catch (error) {
    console.error("コンテンツの作成に失敗しました", error);
    throw new Error("コンテンツの作成に失敗しました");
  }
}

/**
 * コンテンツを更新する
 * @param id コンテンツID
 * @param content 更新するコンテンツデータ
 * @returns 更新されたコンテンツ
 */
export async function updateContent(
  id: number,
  content: CreateContentDTOSchema,
): Promise<ContentSchema> {
  try {
    // APIリクエスト
    const response = await putApi({
      url: `${contentUrl}/${id}`,
      data: content,
      updateSchema: createContentDTOSchema,
      responseSchema: contentSchema,
    });
    return response.data;
  } catch (error) {
    console.error(`コンテンツ(ID: ${id})の更新に失敗しました`, error);
    throw new Error("コンテンツの更新に失敗しました");
  }
}

/**
 * コンテンツを削除する
 * @param id 削除するコンテンツID
 * @returns 削除結果
 */
export async function deleteContent(id: number): Promise<boolean> {
  try {
    const response = await deleteApi({
      url: `${contentUrl}/${id}`,
    });
    return response.status === 204;
  } catch (error) {
    console.error(`コンテンツ(ID: ${id})の削除に失敗しました`, error);
    throw new Error("コンテンツの削除に失敗しました");
  }
}
