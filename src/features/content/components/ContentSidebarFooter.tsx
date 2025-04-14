"use client";

import ActionButton from "@/components/ActionButton";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { isEditingContentListAtom } from "../atom/contentListAtom";

export default function ContentSidebarFooter() {
  const [isEditing, setIsEditing] = useAtom(isEditingContentListAtom);
  const router = useRouter();

  return (
    <div
      className={twMerge(
        "h-[60px] flex items-center pl-4 pt-1 pr-1 pb-1 bg-light-bg-secondary",
        isEditing ? "justify-between" : "justify-end",
      )}
    >
      {isEditing ? (
        <>
          <ActionButton
            type="submit"
            variant="outlineBrand"
            size="lg"
            action="add"
            onClick={() => router.push("/content/new")}
          />
          <ActionButton
            type="submit"
            variant="fillBrand"
            size="lg"
            action="done"
            onClick={() => setIsEditing(false)}
          />
        </>
      ) : (
        <ActionButton
          type="submit"
          variant="fillBrand"
          size="lg"
          action="edit"
          onClick={() => setIsEditing(true)}
        />
      )}
    </div>
  );
}
