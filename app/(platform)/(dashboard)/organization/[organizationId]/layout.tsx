import type { FC } from "react";
import OrganizationControl from "./_components/org-control";
import { auth } from "@clerk/nextjs";
import { startCase } from "lodash";

interface OrganizationIdLayoutProps {
  children: React.ReactNode;
}

export async function generateMetadata() {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || "organization"),
  };
}
const OrganizationIdLayout: FC<
  OrganizationIdLayoutProps
> = ({ children }) => {
  return (
    <>
      <OrganizationControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
