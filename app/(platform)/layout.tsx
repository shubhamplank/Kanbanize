import { ClerkProvider } from "@clerk/nextjs";
import type { FC } from "react";
import { Toaster } from "sonner";

interface PlatformLayoutProps {
  children: React.ReactNode;
}

const PlatformLayout: FC<PlatformLayoutProps> = ({
  children,
}) => {
  return (
    <ClerkProvider>
      <Toaster />
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
