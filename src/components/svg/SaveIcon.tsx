import type { SVGIconProps } from "./types";

/**
 * 保存アイコンのSVGコンポーネント
 * @param props - SVGIconProps
 */
export default function SaveIcon({ className = "" }: SVGIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <title>保存アイコン</title>
      <g
        id="icon/save"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="save_black_24dp">
          <rect id="背景色" x="0" y="0" width="24" height="24" rx="4" />
          <path
            d="M17,3 L5,3 C3.89,3 3,3.9 3,5 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,7 L17,3 Z M12,19 C10.34,19 9,17.66 9,16 C9,14.34 10.34,13 12,13 C13.66,13 15,14.34 15,16 C15,17.66 13.66,19 12,19 Z M15,9 L5,9 L5,5 L15,5 L15,9 Z"
            id="Shape"
            fill="currentColor"
          />
        </g>
      </g>
    </svg>
  );
}
