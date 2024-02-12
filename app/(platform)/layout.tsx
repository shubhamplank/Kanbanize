import { ClerkProvider } from "@clerk/nextjs";
import type { FC } from "react";

interface PlatformLayoutProps {
  children: React.ReactNode;
}

const PlatformLayout: FC<PlatformLayoutProps> = ({
  children,
}) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default PlatformLayout;
