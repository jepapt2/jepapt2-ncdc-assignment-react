import { getContentList } from "@/features/content/content-api";

/**
 * コンテンツ削除後のリダイレクト処理を行う
 * コンテンツが残っている場合は先頭のコンテンツへ、なければ新規作成ページへリダイレクトする
 */
export async function redirectAfterContentDeletionPath() {
  try {
    // 削除後に最新のコンテンツリストを取得
    const remainingContents = await getContentList();

    // コンテンツが存在するかチェック
    if (remainingContents && remainingContents.length > 0) {
      // リストの先頭のコンテンツに遷移
      return `/content/${remainingContents[0].id}`;
    }
    // コンテンツがない場合は新規作成ページへ遷移
    return "/content/new";
  } catch (error) {
    console.error("リダイレクト処理中にエラーが発生しました", error);
    // エラーが発生した場合も新規作成ページへリダイレクト
    return "/content/new";
  }
}
