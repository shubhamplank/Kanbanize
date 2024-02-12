"use client";
import type { FC } from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Layout,
  Settings,
  Activity,
  CreditCard,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface NavItemProps {
  key: string;
  isActive: boolean;
  isExpanded: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

const NavItem: FC<NavItemProps> = ({
  key,
  isActive,
  isExpanded,
  organization,
  onExpand,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      label: "Boards",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Setting",
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billling",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/billing`,
    },
  ];
  return (
    <AccordionItem
      className="border-none"
      value={organization.id}
    >
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-700/10 transition  text-start no-underline hover:no-underline",
          isActive &&
            !isExpanded &&
            "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex items-center fap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              fill
              src={organization.imageUrl}
              alt="image"
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-sm ml-2">
            {organization.name}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={"ghost"}
            size="sm"
            className={cn(
              "w-full font-normal justify-start pl-10 mb-1",
              pathname === route.href &&
                "bg-sky-500/10 text-sky-700"
            )}
            onClick={() => router.push(route.href)}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default NavItem;
