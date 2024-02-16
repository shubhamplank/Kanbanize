"use client";

import {
  useState,
  type FC,
  useRef,
  ElementRef,
} from "react";

import { Button } from "@/components/ui/button";

import { Board } from "@prisma/client";
import { FormInput } from "@/components/form/form-input";

interface BoardTitleFormProps {
  data: Board;
}

const BoardTitleForm: FC<BoardTitleFormProps> = ({
  data,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title");
    console.log("i am submited", title);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        className="flex items-center gap-x-2"
        ref={formRef}
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={data.title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }

  return (
    <Button
      className="font-bold text-lg h-auto w-auto p-1 px-2"
      variant={"transparent"}
      onClick={enableEditing}
    >
      {data.title}
    </Button>
  );
};

export default BoardTitleForm;
