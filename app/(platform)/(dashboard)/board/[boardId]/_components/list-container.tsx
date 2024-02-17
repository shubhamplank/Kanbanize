"use client";
import { useState, type FC, useEffect } from "react";
import { ListWithCards } from "@/types";
import ListForm from "./list-form";
import ListItem from "./list-item";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

const ListContainer: FC<ListContainerProps> = ({
  data,
  boardId,
}) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <ol className="flex gap-x-3 h-full">
      {orderedData.map((item, index) => {
        return (
          <>
            <ListItem
              key={item.id}
              index={index}
              data={item}
            />
          </>
        );
      })}
      <ListForm />
      <div className="flex-shrink-0 w-1"></div>
    </ol>
  );
};

export default ListContainer;
