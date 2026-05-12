import Image, { ImageProps } from "next/image";

import { cn } from "@/shared/lib/utils";

type MembokLogoProps = Omit<ImageProps, "src" | "alt" | "width" | "height">;

export function MembokLogo({ className, ...props }: MembokLogoProps) {
  return (
    <Image
      {...props}
      src="/membok.svg"
      alt="Membok Logo"
      width={225}
      height={54}
      priority
      className={cn("h-6 w-auto select-none", className)}
    />
  );
}
