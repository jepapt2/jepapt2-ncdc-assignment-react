import type { SVGIconProps } from "./types";

/**
 * 編集アイコンのSVGコンポーネント
 * @param props - SVGIconProps
 */
export default function EditIcon({ className = "" }: SVGIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <title>編集アイコン</title>
      <g
        id="icon/edit"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Group">
          <rect id="背景色" x="0" y="0" width="24" height="24" rx="4" />
          <path
            d="M3,17.25 L3,21 L6.75,21 L17.81,9.94 L14.06,6.19 L3,17.25 Z M20.71,7.04 C21.1,6.65 21.1,6.02 20.71,5.63 L18.37,3.29 C17.98,2.9 17.35,2.9 16.96,3.29 L15.13,5.12 L18.88,8.87 L20.71,7.04 Z"
            id="Shape"
            fill="currentColor"
          />
        </g>
      </g>
    </svg>
  );
}
