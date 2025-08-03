import Svg, { Path, SvgProps } from "react-native-svg";

export default function Bus(props: SvgProps) {
  return (
    <Svg width={50} height={50} fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5 6v9.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C6.52 19 7.08 19 8.2 19h7.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C19 17.48 19 16.92 19 15.8V6M5 6s0-3 7-3 7 3 7 3M5 6h14M5 13h14m-2 8v-2M7 21v-2m1-3h.01M16 16h.01"
      />
    </Svg>
  );
}
