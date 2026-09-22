import type { HTMLAttributes } from "react";
import logoSvg from "../assets/logo.svg?raw";

export default function Logo({
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...rest}
      className={`zecro-logo inline-block [&>svg]:block [&>svg]:h-auto [&>svg]:w-full ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: logoSvg }}
    />
  );
}
