export const getValidationErrorMessages = (errors: {
  form: {
    errors: readonly (Record<string, { message: string }[]> | undefined)[];
  };
}): string[] => {
  const messages: string[] = [];

  // 有効なエラーからメッセージを抽出
  for (const error of errors.form.errors) {
    if (!error) continue;

    // 各フィールドのエラーを処理
    for (const fieldErrors of Object.values(error)) {
      if (!Array.isArray(fieldErrors)) continue;

      // 有効なエラーメッセージを追加
      for (const item of fieldErrors) {
        if (!item?.message) continue;
        messages.push(item.message);
      }
    }
  }

  return messages;
};
