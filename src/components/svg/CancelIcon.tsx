import type { SVGIconProps } from "./types";

/**
 * キャンセルアイコンのSVGコンポーネント
 * @param props - SVGIconProps
 */
export default function CancelIcon({ className = "" }: SVGIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <title>キャンセルアイコン</title>
      <g
        id="icon/cancel"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Combined-Shape"
          fill="currentColor"
          transform="translate(6.000000, 6.000000)"
        >
          <path d="M0.612899443,-0.790295388 L0.707106781,-0.707106781 L6,4.585 L11.2928932,-0.707106781 C11.6834175,-1.09763107 12.3165825,-1.09763107 12.7071068,-0.707106781 C13.0675907,-0.34662282 13.0953203,0.220608236 12.7902954,0.612899443 L12.7071068,0.707106781 L7.414,6 L12.7071068,11.2928932 C13.0976311,11.6834175 13.0976311,12.3165825 12.7071068,12.7071068 C12.3466228,13.0675907 11.7793918,13.0953203 11.3871006,12.7902954 L11.2928932,12.7071068 L6,7.414 L0.707106781,12.7071068 C0.316582489,13.0976311 -0.316582489,13.0976311 -0.707106781,12.7071068 C-1.06759074,12.3466228 -1.09532028,11.7793918 -0.790295388,11.3871006 L-0.707106781,11.2928932 L4.585,6 L-0.707106781,0.707106781 C-1.09763107,0.316582489 -1.09763107,-0.316582489 -0.707106781,-0.707106781 C-0.37666315,-1.03755041 0.127505471,-1.08838789 0.511402945,-0.859619226 L0.612899443,-0.790295388 Z" />
        </g>
      </g>
    </svg>
  );
}
