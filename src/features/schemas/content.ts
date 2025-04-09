import * as v from "valibot";

export const contentSchema = v.object({
  id: v.number(),
  title: v.optional(
    v.pipe(
      v.string(),
      v.maxLength(50, "タイトルは50文字以内で入力してください"),
    ),
  ),
  body: v.optional(
    v.pipe(
      v.string(),
      v.minLength(10, "本文は10文字以上で入力してください"),
      v.maxLength(1000, "本文は1000文字以内で入力してください"),
    ),
  ),
  createdAt: v.optional(v.date()),
  updatedAt: v.optional(v.date()),
});

export type ContentSchema = v.InferInput<typeof contentSchema>;

// 作成用スキーマ（titleとbodyのみ）
export const createContentDTOSchema = v.pick(contentSchema, ["title", "body"]);
export type CreateContentDTOSchema = v.InferOutput<
  typeof createContentDTOSchema
>;
