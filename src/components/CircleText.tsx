import type { HTMLAttributes } from "react";
import circleTextSvg from "../assets/circle-text.svg?raw";

export default function CircleText({
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...rest}
      className={`inline-block [&>svg]:block [&>svg]:h-full [&>svg]:w-full ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: circleTextSvg }}
    />
  );
}
