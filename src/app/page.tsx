"use client";
import { redirectAfterContentDeletionPath } from "@/lib/utils/redirectAfterContentDeletion";
import { redirect } from "next/navigation";

export default async function Home() {
  // redirectAfterContentDeletion ユーティリティ関数を使用して
  // コンテンツ一覧を取得し、適切なページにリダイレクト
  const path = await redirectAfterContentDeletionPath();
  redirect(path);

  // リダイレクトされるためこの部分は実行されない
  return null;
}
