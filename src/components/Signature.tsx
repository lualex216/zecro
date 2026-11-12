import type { HTMLAttributes } from "react";
import signatureSvg from "../assets/signature.svg?raw";

export default function Signature({
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...rest}
      className={`inline-block [&>svg]:block [&>svg]:h-full [&>svg]:w-full ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: signatureSvg }}
    />
  );
}
