"use client";
import { Accordion } from "@/components/ui/accordion";
import type { FC } from "react";
import {
  useOrganization,
  useOrganizationList,
} from "@clerk/nextjs";

import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import NavItem, { Organization } from "./nav-item";

interface SidebarProps {
  storageKey?: string;
}

const Sidebar: FC<SidebarProps> = ({
  storageKey = "t-sidebar-state",
}) => {
  const [expanded, setExpanded] = useLocalStorage<
    Record<string, any>
  >(storageKey, {});

  const {
    organization: activeOrganization,
    isLoaded: isLoadedOrg,
  } = useOrganization();

  const { userMemberships, isLoaded: isLoadedOrgList } =
    useOrganizationList({
      userMemberships: { infinite: true },
    });

  const defaultAccordianValue: string[] = Object.keys(
    expanded
  ).reduce((acc: string[], key: string) => {
    if (expanded[key]) {
      acc.push(key);
    }
    return acc;
  }, []);

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (
    !isLoadedOrg ||
    !isLoadedOrgList ||
    userMemberships.isLoading
  ) {
    return (
      <>
        <Skeleton />
      </>
    );
  }
  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          size="icon"
          type="button"
          variant={"ghost"}
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordianValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={
              activeOrganization?.id == organization.id
            }
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
};

export default Sidebar;
