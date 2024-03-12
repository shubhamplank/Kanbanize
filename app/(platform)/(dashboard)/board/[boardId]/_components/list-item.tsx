"use client";

import { ElementRef, useRef, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
import { CardWithList, ListWithCards } from "@/types";

import { CardForm } from "./card-form";
import { CardItem } from "./card-item";
import { ListHeader } from "./list-header";

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import { ColorPicker } from "@/components/modal/card-modal/color-picker";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

export const ListItem = ({
  data,
  index,
}: ListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const isResizingRef = useRef(false);
  const listRef = useRef<ElementRef<"li">>(null);
  const mouseDownClientX = useRef<number>(0);

  const [isResetting, setIsResetting] = useState(false);
  const [parentId, setParentId] = useState<string>("");

  let offsetWidth = 0;

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = (id: string) => {
    setIsEditing(true);
    if (id !== "") setParentId(id);

    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  // Resize Logic of List
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;

    mouseDownClientX.current = event.clientX;

    offsetWidth = listRef.current
      ? listRef.current.offsetWidth
      : 0;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;

    let mouseMoveClientX = e.clientX;

    let newWidth =
      offsetWidth +
      (mouseMoveClientX - mouseDownClientX.current);

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (listRef.current) {
      listRef.current.style.width = `${newWidth}px`;
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    isResizingRef.current = false;
    document.removeEventListener(
      "mousemove",
      handleMouseMove
    );
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (listRef.current) {
      setIsResetting(true);
      listRef.current.style.width = "272px";
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  return (
    <Draggable
      draggableId={data.id}
      index={index}
    >
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={(el) => {
            listRef.current = el;
            provided.innerRef(el);
          }}
          className={cn(
            "group/list h-full flex w-[272px] shrink-0 select-none relative",
            isResetting &&
              "transition-all ease-in-out duration-300"
          )}
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
          >
            <ListHeader
              onAddCard={enableEditing}
              data={data}
            />
            <Droppable
              droppableId={data.id}
              type="card"
            >
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                    data.cards.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {data.cards.map((card, index) => (
                    <ContextMenu key={card.id}>
                      <ContextMenuTrigger>
                        <CardItem
                          index={index}
                          data={card}
                          onAddCard={enableEditing}
                        />
                      </ContextMenuTrigger>
                      <ContextMenuContent className="w-64">
                        <ContextMenuItem>
                          <ColorPicker
                            data={card as CardWithList}
                          />
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              listId={data.id}
              ref={textareaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
              parentId={parentId}
            />
          </div>
          <div
            onMouseDown={handleMouseDown}
            onDoubleClick={resetWidth}
            className="
           opacity-0 
           group-hover/list:opacity-100 
           transition
           cursor-ew-resize
           absolute  
           h-full w-1
           bg-primary/10 
           right-0 
           top-0"
          />
        </li>
      )}
    </Draggable>
  );
};
