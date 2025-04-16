import * as v from "valibot";

export const contentSchema = v.object({
  id: v.number(),
  title: v.optional(v.pipe(v.string(), v.title("タイトル"))),
  body: v.optional(v.pipe(v.string(), v.title("本文"))),

  createdAt: v.optional(
    v.pipe(
      v.string(),
      v.transform((date) => new Date(date)),
    ),
  ),
  updatedAt: v.optional(
    v.pipe(
      v.string(),
      v.transform((date) => new Date(date)),
    ),
  ),
});

export const contentListSchema = v.array(contentSchema);

export type ContentSchema = v.InferOutput<typeof contentSchema>;
export type ContentListSchema = v.InferOutput<typeof contentListSchema>;
// 作成用スキーマ（titleとbodyのみ）

export const createContentDTOSchema = v.object({
  title: v.pipe(
    v.string(),
    v.title("タイトル"),
    v.maxLength(50, "タイトルは50文字以内で入力してください"),
  ),
  body: v.pipe(
    v.string(),
    v.title("本文"),
    v.union([
      v.literal(""), // 空文字列を許可
      v.pipe(
        v.string(),
        v.minLength(10, "本文は10文字以上で入力してください"),
        v.maxLength(1000, "本文は1000文字以内で入力してください"),
      ),
    ]),
  ),
});

export type CreateContentDTOSchema = v.InferOutput<
  typeof createContentDTOSchema
>;
