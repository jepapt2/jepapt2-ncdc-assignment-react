import type { SVGIconProps } from "./types";

/**
 * プラスアイコンのSVGコンポーネント
 * @param props - SVGIconProps
 */
export default function PlusIcon({ className = "" }: SVGIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <title>追加アイコン</title>
      <g
        id="icon/+"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Lv1/icon/-">
          <rect id="Rectangle" x="0" y="0" width="24" height="24" rx="4" />
          <path
            d="M12,4 C12.5522847,4 13,4.44771525 13,5 L13,11 L19,11 C19.5522847,11 20,11.4477153 20,12 C20,12.5522847 19.5522847,13 19,13 L13,13 L13,19 C13,19.5522847 12.5522847,20 12,20 C11.4477153,20 11,19.5522847 11,19 L11,13 L5,13 C4.44771525,13 4,12.5522847 4,12 C4,11.4477153 4.44771525,11 5,11 L11,11 L11,5 C11,4.44771525 11.4477153,4 12,4 Z"
            id="Combined-Shape"
            fill="currentColor"
          />
        </g>
      </g>
    </svg>
  );
}
