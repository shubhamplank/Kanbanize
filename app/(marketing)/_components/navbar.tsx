import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <div className="flex items-center fixed top-0 w-full h-14 px-4 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between w-full mx-auto md:max-w-screen-2xl">
        <Logo />
        <div className="flex items-center justify-between w-full space-x-4 md:block md:w-auto">
          <Button
            size="sm"
            variant="outline"
            asChild
          >
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            asChild
          >
            <Link href="/sign-up">
              Get Taskify for free
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
