import { useState, type FC, useRef } from "react";
import { ListWithCards } from "@/types";
import ListHeader from "./list-header";
import { CardForm } from "./card-form";

interface ListItemProps {
  data: ListWithCards;
  key: string;
  index: number;
  onAddCard: () => void;
}

const ListItem: FC<ListItemProps> = ({
  data,
  key,
  index,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };
  return (
    <div className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader
          data={data}
          onAddCard={enableEditing}
        />
        <CardForm
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
          listId={data.id}
        />
      </div>
    </div>
  );
};

export default ListItem;
