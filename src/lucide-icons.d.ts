declare module "lucide-react/dist/esm/icons/*.mjs" {
  import { FC, SVGProps } from "react";

  const Icon: FC<
    SVGProps<SVGSVGElement> & {
      size?: string | number;
      color?: string;
      strokeWidth?: string | number;
      absoluteStrokeWidth?: boolean;
    }
  >;

  export default Icon;
}
