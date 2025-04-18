import type { SVGIconProps } from "./types";

/**
 * 削除アイコンのSVGコンポーネント
 * @param props - SVGIconProps
 */
export default function DeleteIcon({ className = "" }: SVGIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <title>削除アイコン</title>
      <g
        id="icon/delete"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Lv1/icon/delete">
          <rect id="Rectangle" x="0" y="0" width="24" height="24" rx="4" />
          <path
            d="M18.9150409,8 C19.4673257,8 19.9150409,8.44771525 19.9150409,9 C19.9150409,9.02715443 19.9139349,9.0542976 19.9117256,9.08136201 L18.9321337,21.081362 C18.8897655,21.600373 18.4561866,22 17.9354491,22 L6.0645509,22 C5.54381343,22 5.11023453,21.600373 5.06786629,21.081362 L4.08827445,9.08136201 C4.04333945,8.5309083 4.45314334,8.04825038 5.00359706,8.00331538 L5.0442443,8.00082919 L18.9150409,8 Z M9.5,11 C9.22385763,11 9,11.2238576 9,11.5 L9,11.5 L9,18.5 C9,18.7761424 9.22385763,19 9.5,19 C9.77614237,19 10,18.7761424 10,18.5 L10,18.5 L10,11.5 C10,11.2238576 9.77614237,11 9.5,11 Z M14.5,11 C14.2238576,11 14,11.2238576 14,11.5 L14,11.5 L14,18.5 C14,18.7761424 14.2238576,19 14.5,19 C14.7761424,19 15,18.7761424 15,18.5 L15,18.5 L15,11.5 C15,11.2238576 14.7761424,11 14.5,11 Z M13,2 C13.5522847,2 14,2.44771525 14,3 L14,4 L20.5,4 C21.3284271,4 22,4.67157288 22,5.5 C22,6.32842712 21.3284271,7 20.5,7 L3.5,7 C2.67157288,7 2,6.32842712 2,5.5 C2,4.67157288 2.67157288,4 3.5,4 L10,4 L10,3 C10,2.44771525 10.4477153,2 11,2 L13,2 Z"
            id="Combined-Shape"
            fill="currentColor"
          />
        </g>
      </g>
    </svg>
  );
}
