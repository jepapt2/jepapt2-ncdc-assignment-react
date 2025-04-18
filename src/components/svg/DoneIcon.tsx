import type { SVGIconProps } from "./types";

/**
 * 完了アイコンのSVGコンポーネント
 * @param props - SVGIconProps
 */
export default function DoneIcon({ className = "" }: SVGIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <title>完了アイコン</title>
      <g
        id="icon/done"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Lv1/icon/cancel">
          <g id="done">
            <rect id="背景色" x="0" y="0" width="24" height="24" rx="4" />
          </g>
          <path
            d="M4,4 C5.0543618,4 5.91816512,4.81587779 5.99451426,5.85073766 L6,6 L6,12 L20,12 C21.0543618,12 21.9181651,12.8158778 21.9945143,13.8507377 L22,14 C22,15.0543618 21.1841222,15.9181651 20.1492623,15.9945143 L20,16 L4,16 C2.9456382,16 2.08183488,15.1841222 2.00548574,14.1492623 L2,14 L2,6 C2,4.8954305 2.8954305,4 4,4 Z"
            id="Path-2"
            fill="currentColor"
            transform="translate(12.000000, 10.000000) rotate(-50.000000) translate(-12.000000, -10.000000)"
          />
        </g>
      </g>
    </svg>
  );
}
