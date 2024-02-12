import type { FC } from "react";

import { cn } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

interface LogoProps {}

const headingFont = localFont({
  src: "../../public/font.woff2",
});

const Logo: FC<LogoProps> = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image
          src="/logo.svg"
          alt="logo"
          height={30}
          width={30}
        />
      </div>
      <p
        className={cn(
          "text-lg text-neutral-700 pb-1",
          headingFont.className
        )}
      >
        Taskify
      </p>
    </Link>
  );
};

export default Logo;
