import { Card } from "@prisma/client";
import type { FC } from "react";

interface CardItemProps {
  data: Card;
  index: number;
}

const CardItem: FC<CardItemProps> = ({ data, index }) => {
  return (
    <div className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-sm shadow-sm">
      {data.title}
    </div>
  );
};

export default CardItem;
