import { useRef, type FC, useState } from "react";
import ListWrapper from "./list-wrapper";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import {
  useEventListener,
  useOnClickOutside,
} from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";

interface ListFormProps {}

const ListForm: FC<ListFormProps> = () => {
  const params = useParams();
  const router = useRouter();
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

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };
  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`${data.title} updated`);
      disableEditing();
      router.refresh();
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    console.log("i am submited", title);
    execute({ title, boardId });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title..."
          />
          <input
            hidden
            value={params.boardId}
            name="boardId"
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add List</FormSubmit>
            <Button
              onClick={disableEditing}
              size={"sm"}
              variant={"ghost"}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }
  return (
    <ListWrapper>
      <form className="w-full p-3 rounded-md bg-white space-y-4 shadow-md">
        <button
          onClick={enableEditing}
          className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
        >
          <Plus className="h-4 w-4 mr-2" /> Add a list
        </button>
      </form>
    </ListWrapper>
  );
};

export default ListForm;
