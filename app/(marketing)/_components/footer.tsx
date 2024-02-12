import type { FC } from "react";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className=" fixed bottom-0 w-full  px-4  border-t bg-slate-100">
      <div className="flex items-center justify-between w-full mx-auto md:max-w-screen-2xl">
        <Logo />
        <div className="flex items-center justify-between w-full space-x-4 md:block md:w-auto">
          <Button
            size="sm"
            variant={"ghost"}
          >
            Privacy Policy
          </Button>
          <Button
            size="sm"
            variant={"ghost"}
          >
            Terms and condition
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
