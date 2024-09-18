import { IIconProps } from "./types/IIconProps";

interface FolderIconProps extends IIconProps {
  type?: "default" | "stack";
}

const FolderTypes = {
  default:
    "M4 20C3.45 20 2.97933 19.8043 2.588 19.413C2.19667 19.0217 2.00067 18.5507 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.98 4.19667 3.45067 4.00067 4 4H9.175C9.44167 4 9.696 4.05 9.938 4.15C10.18 4.25 10.3923 4.39167 10.575 4.575L12 6H20C20.55 6 21.021 6.196 21.413 6.588C21.805 6.98 22.0007 7.45067 22 8V18C22 18.55 21.8043 19.021 21.413 19.413C21.0217 19.805 20.5507 20.0007 20 20H4ZM4 18H20V8H11.175L9.175 6H4V18Z",
  stack:
    "M3 21C2.45 21 1.97933 20.8043 1.588 20.413C1.19667 20.0217 1.00067 19.5507 1 19V6H3V19H20V21H3ZM7 17C6.45 17 5.97933 16.8043 5.588 16.413C5.19667 16.0217 5.00067 15.5507 5 15V4C5 3.45 5.196 2.97933 5.588 2.588C5.98 2.19667 6.45067 2.00067 7 2H12L14 4H21C21.55 4 22.021 4.196 22.413 4.588C22.805 4.98 23.0007 5.45067 23 6V15C23 15.55 22.8043 16.021 22.413 16.413C22.0217 16.805 21.5507 17.0007 21 17H7ZM7 15H21V6H13.175L11.175 4H7V15Z"
};

const FolderIcon = (props: FolderIconProps) => {
  const { isDefaultFill, type = "default", ...otherProps } = props;

  return (
    <svg
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      fill={isDefaultFill ? "currentColor" : "--neutral-80"}
      {...otherProps}
    >
      <path d={FolderTypes[type]} />
    </svg>
  );
};

export { FolderIcon };
