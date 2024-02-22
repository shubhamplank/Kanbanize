import type { FC } from "react";

import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/providers/modal-provider";
import QueryProvider from "@/components/providers/query-provider";

import { Toaster } from "sonner";

interface PlatformLayoutProps {
  children: React.ReactNode;
}

const PlatformLayout: FC<PlatformLayoutProps> = ({
  children,
}) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;
