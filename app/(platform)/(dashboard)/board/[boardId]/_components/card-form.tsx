import {
  forwardRef,
  type FC,
  useRef,
  KeyboardEventHandler,
} from "react";

import { Button } from "@/components/ui/button";
import { FormTextarea } from "@/components/form/form-textarea";

import { Plus, X } from "lucide-react";
import { FormSubmit } from "@/components/form/form-submit";
import {
  useEventListener,
  useOnClickOutside,
} from "usehooks-ts";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { createCard } from "@/actions/create-card";

interface CardFormProps {
  listId: string;
  parentId: string;
  isEditing: boolean;
  enableEditing: (id: string) => void;
  disableEditing: () => void;
}

export const CardForm = forwardRef<
  HTMLTextAreaElement,
  CardFormProps
>(
  (
    {
      listId,
      parentId,
      isEditing,
      enableEditing,
      disableEditing,
    },
    ref
  ) => {
    const params = useParams();
    const router = useRouter();
    let isParent = true;

    if (parentId) isParent = false;

    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card- ${data.title} created`);
        disableEditing();
        router.refresh();
      },
      onError: (err) => {
        toast.error(err);
      },
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextAreaKeyDown: KeyboardEventHandler<
      HTMLTextAreaElement
    > = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const boardId = params.boardId as string;
      const listId = formData.get("listId") as string;

      console.log("i am submited", title);
      console.log("isParent", isParent);

      const pId = isParent ? "" : parentId;
      execute({
        parentId: pId,
        isParent,
        title,
        listId,
        boardId,
      });
    };

    if (isEditing) {
      return (
        <form
          className="m-1 py-0.5 px-1 space-y-4"
          ref={formRef}
          action={onSubmit}
        >
          <FormTextarea
            id="title"
            onKeyDown={onTextAreaKeyDown}
            ref={ref}
            errors={fieldErrors}
            placeholder="Enter a titlle for this card"
          />
          <input
            hidden
            id="listId"
            name="listId"
            value={listId}
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add card</FormSubmit>
            <Button
              onClick={disableEditing}
              size={"sm"}
              variant={"ghost"}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div className="pt-2 px-2">
        <Button
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm "
          size={"sm"}
          variant={"ghost"}
          onClick={() => enableEditing("")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
