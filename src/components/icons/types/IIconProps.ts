import { SVGProps } from "react";

interface IIconProps extends SVGProps<SVGSVGElement> {
  isDefaultFill?: boolean;
  isActive?: boolean;
}

export type { IIconProps };
