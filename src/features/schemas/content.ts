import * as v from "valibot";

export const contentSchema = v.object({
  id: v.number(),
  title: v.optional(
    v.pipe(
      v.string(),
      v.maxLength(100, "タイトルは100文字以内で入力してください"),
    ),
  ),
  body: v.optional(
    v.pipe(
      v.string(),
      v.maxLength(2000, "本文は2000文字以内で入力してください"),
    ),
  ),
  createdAt: v.optional(v.string()),
  updatedAt: v.optional(v.string()),
});

export type ContentSchema = v.InferInput<typeof contentSchema>;

// 作成用スキーマ（titleとbodyのみ）
export const createContentDTOSchema = v.pick(contentSchema, ["title", "body"]);
export type CreateContentDTOSchema = v.InferOutput<
  typeof createContentDTOSchema
>;
