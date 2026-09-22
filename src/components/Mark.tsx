import type { HTMLAttributes } from "react";
import markSvg from "../assets/mark.svg?raw";

export default function Mark({
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...rest}
      className={`inline-block [&>svg]:block [&>svg]:h-full [&>svg]:w-full ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: markSvg }}
    />
  );
}
