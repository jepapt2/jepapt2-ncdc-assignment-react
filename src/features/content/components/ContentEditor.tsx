"use client";

import { useOptimistic, useState, useTransition } from "react";
import ActionButton from "@/components/ActionButton";
import {
  type ContentSchema,
  type CreateContentDTOSchema,
  createContentDTOSchema,
} from "../schemas/content";
import { useForm } from "@tanstack/react-form";
import { saveContentAction } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getValidationErrorMessages } from "@/lib/utils/getValidationErrorMessages";

interface ContentEditorProps {
  content?: ContentSchema;
}

export default function ContentEditor({ content }: ContentEditorProps) {
  // 表示用のコンテンツ
  const [displayContent, setOptimisticContent] = useOptimistic(
    { title: content?.title, body: content?.body },
    (currentContent, optimisticContent: Partial<ContentSchema>) => ({
      ...currentContent,
      ...optimisticContent,
    }),
  );
  const [isPending, startTransition] = useTransition();
  // タイトルが存在しない場合は編集モードにする
  const [isEditingTitle, setIsEditingTitle] = useState(!content?.title);
  const [isEditingBody, setIsEditingBody] = useState(false);
  const router = useRouter();

  // 編集対象を示す型の定義
  type EditTarget = "title" | "body";

  const defaultValues: CreateContentDTOSchema = {
    title: content?.title ?? "",
    body: content?.body ?? "",
  };

  const form = useForm({
    defaultValues: defaultValues,
    validators: {
      onChange: createContentDTOSchema,
    },
    // 送信時のメタデータ
    onSubmitMeta: "title" satisfies EditTarget,
    onSubmit: async ({ value, meta: saveValueKey }) => {
      startTransition(async () => {
        setOptimisticContent(value);

        // 更新するフィールドを決定
        const contentToSave: CreateContentDTOSchema = {
          title:
            (saveValueKey === "title" ? value.title : content?.title) ?? "",
          body: (saveValueKey === "body" ? value.body : content?.body) ?? "",
        };

        const result = await saveContentAction({
          content: contentToSave,
          currentContent: content,
        });
        // エラーが発生した場合は元のコンテンツを表示
        if (!result.success && content) {
          setOptimisticContent(content);
          return;
        }

        // 新規作成の場合は作成されたコンテンツのIDに遷移
        if (!content && result.content?.id) {
          router.push(`/content/${result.content.id}`);
          return;
        }
        // 編集対象のフィールドを閉じる
        if (saveValueKey === "title") {
          setIsEditingTitle(false);
        } else {
          setIsEditingBody(false);
        }
      });
    },
  });
  // ボタンクリック時の処理
  const buttonClickHandler = async (saveValueKey: "title" | "body") => {
    const messages = getValidationErrorMessages(form.getAllErrors());
    if (messages.length) {
      toast.error(messages.map((message) => <p key={message}>{message}</p>));
      return;
    }

    // フォーム送信処理
    await form.handleSubmit(saveValueKey);
  };
  // フォーム送信時の処理
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // フォームを送信
    form.handleSubmit().then(() => {
      setIsEditingTitle(false);
    });
  };

  // キャンセル時の処理
  const handleTitleCancel = () => {
    setIsEditingTitle(false);
    form.setFieldValue("title", content?.title ?? "");
  };
  const handleBodyCancel = () => {
    setIsEditingBody(false);
    form.setFieldValue("body", content?.body ?? "");
  };

  return (
    <div className="flex flex-col h-full bg-light-bg rounded-lg p-3">
      {/* タイトル表示/編集部分 */}
      <form className="flex-1 flex flex-col" onSubmit={handleFormSubmit}>
        <div className="flex items-center justify-between border-b border-light-bg-secondary mb-2">
          <div className="flex-1">
            {isEditingTitle ? (
              <form.Field name="title">
                {(field) => (
                  <input
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    type="text"
                    className="bg-white w-full px-3 text-title outline-1 outline-offset-[-1px] rounded-md outline-brand"
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                  />
                )}
              </form.Field>
            ) : (
              <h1 className="text-title ml-3">{displayContent.title}</h1>
            )}
          </div>
          <div className="flex gap-1 ml-2">
            {isEditingTitle ? (
              <>
                <ActionButton
                  action="cancel"
                  variant="fillGray"
                  onClick={handleTitleCancel}
                />
                <ActionButton
                  action="save"
                  variant="fillBrand"
                  onClick={() => buttonClickHandler("title")}
                  disabled={isPending}
                />
              </>
            ) : (
              <>
                <ActionButton
                  action="edit"
                  variant="fillBrand"
                  size="lg"
                  type="button"
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
              <form.Field name="body">
                {(field) => (
                  <textarea
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    className="flex-1 min-h-0 rounded-md bg-white p-3 outline-1 outline-offset-[-1px] outline-brand resize-none overflow-y-auto"
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                  />
                )}
              </form.Field>
              <div className="flex gap-1">
                <ActionButton
                  action="cancel"
                  variant="fillGray"
                  type="button"
                  onClick={handleBodyCancel}
                />
                <ActionButton
                  action="save"
                  variant="fillBrand"
                  onClick={() => buttonClickHandler("body")}
                  disabled={isPending}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto rounded-md bg-white p-3">
                <p className="text-body">{displayContent.body}</p>
              </div>
              <ActionButton
                action="edit"
                variant="fillBrand"
                size="lg"
                onClick={() => setIsEditingBody(true)}
              />
            </>
          )}
        </div>
      </form>
    </div>
  );
}
