"use client";

import { useState, useTransition } from "react";
import ActionButton from "@/components/ActionButton";
import { createContentDTOSchema, type ContentSchema } from "../schemas/content";
import { useForm } from "@tanstack/react-form";
import { saveContentAction } from "../actions";

interface ContentEditorProps {
  content?: ContentSchema;
}

export default function ContentEditor({ content }: ContentEditorProps) {
  const [isPending, startTransition] = useTransition();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingBody, setIsEditingBody] = useState(false);

  const form = useForm({
    defaultValues: {
      title: content?.title ?? "",
      body: content?.body ?? "",
    },
    validators: {
      onChange: createContentDTOSchema,
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        await saveContentAction({
          content: value,
          currentContent: content,
        });
      });
    },
  });
  // ボタンクリック時の処理
  const buttonClickHandler = async (saveValue: "title" | "body") => {
    // フォーム送信処理
    await form.handleSubmit().then(() => {
      if (saveValue === "title") {
        setIsEditingTitle(false);
      } else if (saveValue === "body") {
        setIsEditingBody(false);
      }
    });
  };
  // フォーム送信時の処理
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // フォームを送信
    form.handleSubmit().then(() => {
      setIsEditingTitle(false);
    });
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
              <h1 className="text-title ml-3">{content?.title}</h1>
            )}
          </div>
          <div className="flex gap-1 ml-2">
            {isEditingTitle ? (
              <>
                <ActionButton
                  action="cancel"
                  variant="fillGray"
                  onClick={() => setIsEditingTitle(false)}
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
                  onClick={() => setIsEditingBody(false)}
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
        </div>
      </form>
    </div>
  );
}
