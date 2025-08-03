import Svg, { Path, SvgProps } from "react-native-svg";

export default function Shuttle(props: SvgProps) {
  return (
    <Svg fill="none" width={50} height={50} viewBox="0 0 24 24" {...props}>
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m3 8 2.722 2.268a1 1 0 0 0 .64.232h11.276a1 1 0 0 0 .64-.232L21 8M6.5 14h.01m10.99 0h.01M8.16 4.5h7.68a2 2 0 0 1 1.736 1.008l2.897 5.07A4 4 0 0 1 21 12.562V18.5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5.938a4 4 0 0 1 .527-1.984l2.897-5.07A2 2 0 0 1 8.161 4.5ZM7 14a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm11 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
      />
    </Svg>
  );
}
