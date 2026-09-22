import type { HTMLAttributes } from "react";

export default function ServiceIcon({
  svg,
  className,
  ...rest
}: { svg: string } & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...rest}
      className={`inline-block [&>svg]:block [&>svg]:h-full [&>svg]:w-full ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
