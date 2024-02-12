import type { FC } from "react";

interface ClerkLayoutProps {
  children: React.ReactNode;
}

const ClerkLayout: FC<ClerkLayoutProps> = ({
  children,
}) => {
  return (
    <div className="flex items-center justify-center h-full">
      {children}
    </div>
  );
};

export default ClerkLayout;
