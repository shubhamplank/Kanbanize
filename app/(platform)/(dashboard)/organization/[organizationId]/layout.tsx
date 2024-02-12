import type { FC } from "react";
import OrganizationControl from "./_components/org-control";

interface OrganizationIdLayoutProps {
  children: React.ReactNode;
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
