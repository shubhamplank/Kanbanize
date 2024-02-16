import type { FC } from "react";

interface ListWrapperProps {
  children: React.ReactNode;
}

const ListWrapper: FC<ListWrapperProps> = ({
  children,
}) => {
  return (
    <div className="shrink-0 h-full w-[272px] select-none">
      <main>{children}</main>
    </div>
  );
};

export default ListWrapper;
