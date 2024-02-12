import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrganizationPage(
  params: type
) {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl={"/organization/:id"}
      afterCreateOrganizationUrl={"/organization/:id"}
    />
  );
}
