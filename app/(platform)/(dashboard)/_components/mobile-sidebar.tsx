"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Menu } from "lucide-react";
import type { FC } from "react";
import Sidebar from "./sidebar";

interface MobileSidebarProps {}

const MobileSidebar: FC<MobileSidebarProps> = () => {
  const { onOpen, onClose, isOpen } = useMobileSidebar();
  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden mr-2"
        variant={"ghost"}
        size="sm"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet
        open={isOpen}
        onOpenChange={onClose}
      >
        <SheetContent
          className="p-2 pt-10"
          side="left"
        >
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
