import { OrganizationProfile } from "@clerk/nextjs";
import type { FC } from "react";

interface SettingsPageProps {}

const SettingsPage: FC<SettingsPageProps> = () => {
  return (
    <div className="w-full">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: { boxShadow: "none", width: "100%" },
            card: {
              border: "1px solid #e5e5e5",
              boxShadow: "none",
              width: "100%",
            },
          },
        }}
      />
    </div>
  );
};

export default SettingsPage;
