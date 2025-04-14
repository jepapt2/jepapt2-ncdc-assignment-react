"use client";

import { useAtom } from "jotai";
("../atom/contentListAtom");
import { useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { isEditingContentListAtom } from "../atom/contentListAtom";
import type { ContentSchema } from "../schemas/content";
import DeleteIconButton from "@/components/DeleteIconButton";
import { deleteContent } from "../content-api";
type ContentListTileProps = {
  content: ContentSchema;
};

export default function ContentListTile({ content }: ContentListTileProps) {
  const [isEditing] = useAtom(isEditingContentListAtom);
  const params = useParams();

  return (
    <a href={`/content/${content.id}`} key={content.id}>
      <div
        className={twMerge(
          "rounded-sm p-1 text-body hover:cursor-pointer flex items-center justify-between",
          //閲覧中のコンテンツの場合
          params.id === String(content.id) &&
            "bg-light-bg text-brand font-bold",
        )}
      >
        <p className="truncate">{content.title}</p>
        {isEditing && (
          <DeleteIconButton
            onClick={async (e) => {
              e.preventDefault();
              const response = await deleteContent(content.id);
              console.log(response);
            }}
          />
        )}
      </div>
    </a>
  );
}
