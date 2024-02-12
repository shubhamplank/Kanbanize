"use client";
import { useEffect, type FC } from "react";
import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";

interface OrganizationControlProps {}

const OrganizationControl: FC<
  OrganizationControlProps
> = () => {
  const params = useParams();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    if (!setActive) return;
    setActive({
      organization: params.organizationId as string,
    });
  }, [setActive, params.organizationId]);
  return null;
};

export default OrganizationControl;
