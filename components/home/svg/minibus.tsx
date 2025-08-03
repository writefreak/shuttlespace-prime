import Svg, { Path, SvgProps } from "react-native-svg";

export default function Minibus(props: SvgProps) {
  return (
    <Svg width="50" height="50" fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M2 12h19.928M8 17h8m-8 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0-4 0m12 0a2 2 0 1 0 4 0m-4 0a2 2 0 1 1 4 0M14 5v7M8 5v7m-4 5a2 2 0 0 1-2-2V8.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C3.52 5 4.08 5 5.2 5h10.943c.676 0 1.014 0 1.317.099.267.087.514.23.722.419.236.213.404.507.74 1.094l2.656 4.65c.157.275.236.412.291.558.05.13.085.264.107.4.024.155.024.313.024.63V15a2 2 0 0 1-2 2"
      />
    </Svg>
  );
}
