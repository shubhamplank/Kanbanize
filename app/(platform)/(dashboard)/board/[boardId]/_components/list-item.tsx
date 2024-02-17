import type { FC } from "react";
import { ListWithCards } from "@/types";
import ListHeader from "./list-header";

interface ListItemProps {
  data: ListWithCards;
  key: string;
  index: number;
}

const ListItem: FC<ListItemProps> = ({
  data,
  key,
  index,
}) => {
  return (
    <div className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} />
      </div>
    </div>
  );
};

export default ListItem;
