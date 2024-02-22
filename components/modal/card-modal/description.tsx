"use client";

import { useRef, type FC, useState } from "react";
import { CardWithList } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { AlignLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-submit";

import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import {
  useEventListener,
  useOnClickOutside,
} from "usehooks-ts";

interface DescriptionProps {
  data: CardWithList;
}

export const Description: FC<DescriptionProps> = ({
  data,
}) => {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });

      toast.success(`Description updated`);
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

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onTextAreaKeyDown: KeyboardEventHandler<
    HTMLTextAreaElement
  > = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const onSubmit = (formData: FormData) => {
    const id = data.id as string;
    const boardId = params.boardId as string;

    const description = formData.get(
      "description"
    ) as string;

    execute({ description, id, boardId });
  };

  if (isEditing) {
    return (
      <div className="flex items-start gap-x-3 w-full">
        <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
        <div className="w-full">
          <p className="text-semibold text-neutral-700 mb-2">
            Description
          </p>
          <form
            className="min-h-[78px] bg-white text-sm font-medium py-3 px-3.5 rounded-md"
            ref={formRef}
            action={onSubmit}
          >
            <FormTextarea
              id="description"
              onKeyDown={onTextAreaKeyDown}
              ref={textareaRef}
              errors={fieldErrors}
              defaultValue={data.description || undefined}
              placeholder="Enter a Description for this card"
            />
            <input
              hidden
              id="id"
              name="id"
              value={data.id}
            />
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="text-semibold text-neutral-700 mb-2">
          Description
        </p>
        <div
          role="button"
          onClick={enableEditing}
          className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
        >
          {data.description ||
            "Add a more detailed description"}
        </div>
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeletion() {
  return (
    <div className="flex items-center gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="bg-neutral-200 w-24 h-6 mb-2" />
        <Skeleton className="bg-neutral-200 w-full h-[78px] mb-2" />
      </div>
    </div>
  );
};
