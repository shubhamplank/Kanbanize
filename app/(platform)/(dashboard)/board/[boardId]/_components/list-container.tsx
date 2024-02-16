"use client";
import type { FC } from "react";
import { ListWithCards } from "@/types";
import ListForm from "./list-form";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

const ListContainer: FC<ListContainerProps> = ({
  data,
  boardId,
}) => {
  return (
    <ol>
      <ListForm />
      <div className="flex-shrink-0 w-1"></div>
    </ol>
  );
};

export default ListContainer;
