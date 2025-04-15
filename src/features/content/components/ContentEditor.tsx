"use client";

import { useState, useTransition } from "react";
import ActionButton from "@/components/ActionButton";
import type { ContentSchema } from "../schemas/content";

interface ContentEditorProps {
  content?: ContentSchema;
}

export default function ContentEditor({ content }: ContentEditorProps) {
  const [isPending] = useTransition();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingBody, setIsEditingBody] = useState(false);

  // タイトル更新処理
  const handleTitleUpdate = async () => {
    if (!content?.id) return;

    // setTitleError(null);
    // startTransition(async () => {
    //   try {
    //     const result = await updateContentFieldAction(
    //       content.id,
    //       "title",
    //       content.title,
    //     );

    //     if (result.success) {
    //       setIsEditingTitle(false);
    //       router.refresh(); // ページを更新して最新データを反映
    //     } else {
    //       setTitleError(result.error || "タイトルの更新に失敗しました");
    //     }
    //   } catch (err) {
    //     setTitleError("予期せぬエラーが発生しました");
    //     console.error(err);
    //   }
    // });
  };

  // 本文更新処理
  const handleBodyUpdate = async () => {
    if (!content?.id) return;

    // setBodyError(null);
    // startTransition(async () => {
    //   try {
    //     const result = await updateContentFieldAction(content.id, "body", body);

    //     if (result.success) {
    //       setIsEditingBody(false);
    //       router.refresh(); // ページを更新して最新データを反映
    //     } else {
    //       setBodyError(result.error || "本文の更新に失敗しました");
    //     }
    //   } catch (err) {
    //     setBodyError("予期せぬエラーが発生しました");
    //     console.error(err);
    //   }
    // });
  };

  // 編集キャンセル処理
  const handleCancelTitleEdit = () => {
    setIsEditingTitle(false);
  };

  const handleCancelBodyEdit = () => {
    setIsEditingBody(false);
  };

  // キーボードイベント処理
  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleUpdate();
    } else if (e.key === "Escape") {
      handleCancelTitleEdit();
    }
  };

  const handleBodyKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === "Enter") {
      handleBodyUpdate();
    } else if (e.key === "Escape") {
      handleCancelBodyEdit();
    }
  };

  // // 本文をクリックする処理（キーボードイベント対応）
  // const handleBodyClick = () => {
  //   setIsEditingBody(true);
  // };

  // const handleBodyKeyPress = (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter" || e.key === " ") {
  //     setIsEditingBody(true);
  //   }
  // };

  // // フォーム送信処理（新規作成用）
  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.currentTarget);

  //   startTransition(async () => {
  //     try {
  //       const result = await createContentAction(formData);

  //       if (result.success && result.contentId) {
  //         // 作成成功時、詳細ページへリダイレクト
  //         router.push(`/content/${result.contentId}`);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   });
  // };

  return (
    <div className="flex flex-col h-full bg-light-bg rounded-lg p-3">
      {/* タイトル表示/編集部分 */}
      <div className="flex items-center justify-between border-b border-light-bg-secondary pb-2 mb-4">
        <div className="flex-1">
          {isEditingTitle ? (
            <input
              type="text"
              value={content?.title}
              onKeyDown={handleTitleKeyDown}
              className="w-full px-3 text-title outline-1 outline-offset-[-1px] rounded-md outline-brand"
            />
          ) : (
            <h1 className="text-title ml-3">{content?.title}</h1>
          )}
        </div>
        <div className="flex gap-1 ml-2">
          {isEditingTitle ? (
            <>
              <ActionButton
                action="cancel"
                variant="fillGray"
                onClick={handleCancelTitleEdit}
              />
              <ActionButton
                action="save"
                variant="fillBrand"
                onClick={handleTitleUpdate}
                disabled={isPending}
              />
            </>
          ) : (
            <>
              <ActionButton
                action="edit"
                variant="fillBrand"
                size="lg"
                onClick={() => setIsEditingTitle(true)}
              />
            </>
          )}
        </div>
      </div>

      {/* 本文表示/編集部分 */}
      <div className="flex-1 min-h-0 overflow-hidden flex gap-2">
        {isEditingBody ? (
          <>
            <textarea
              value={content?.body}
              onKeyDown={handleBodyKeyDown}
              className="flex-1 min-h-0 rounded-md bg-white p-3 outline-1 outline-offset-[-1px] outline-brand resize-none overflow-y-auto"
            />
            <div className="flex gap-1">
              <ActionButton
                action="cancel"
                variant="fillGray"
                onClick={handleCancelBodyEdit}
              />
              <ActionButton
                action="save"
                variant="fillBrand"
                onClick={handleBodyUpdate}
                disabled={isPending}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto rounded-md bg-white p-3">
              <p className="text-body">{content?.body}</p>
            </div>
            <ActionButton
              action="edit"
              variant="fillBrand"
              size="lg"
              onClick={() => setIsEditingBody(true)}
            />
          </>
        )}
        {/* <div className="flex justify-between text-xs text-gray-400 mt-8 pt-4 border-t border-gray-200">
          <div>Copyright © 2021 Sample</div>
          <div>運営会社</div>
        </div> */}
        {/* コピーライト */}
      </div>
    </div>
  );
}
