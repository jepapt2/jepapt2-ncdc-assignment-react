import type { ButtonHTMLAttributes } from "react";
import DeleteIcon from "./svg/DeleteIcon";

/**
 * アイコンボタンコンポーネント
 */
export default function DeleteIconButton({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="w-[24px] h-[24px] p-[2px] rounded-sm hover:cursor-pointer hover:bg-iconButton-hover active:bg-iconButton-active disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    >
      <DeleteIcon className="w-[20px] h-[20px] text-white-active" />
    </button>
  );
}
