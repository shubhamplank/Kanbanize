import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { CardWithList } from "@/types";
import { useParams } from "next/navigation";
import { updateCard } from "@/actions/update-card";

type hexProps =
  | "#FFFFFF"
  | "#f88379"
  | "#f6b092"
  | "#f2d2a9"
  | "#aaf0d1"
  | "#a084aa";
interface ColorPickerProps {
  data: CardWithList;
}

export const ColorPicker = ({ data }: ColorPickerProps) => {
  const params = useParams();
  const { execute } = useAction(updateCard, {
    onSuccess: () => {
      toast.success("card updated");
    },
    onError: (err) => toast.error(err),
  });

  const setColor = (backgroundColor: hexProps) => {
    const id = data?.id as string;
    const boardId = params?.boardId as string;
    execute({ backgroundColor, id, boardId });
  };
  return (
    <div className="flex gap-x-2 mr-4">
      <div
        className="h-8 w-8 rounded-full  bg-[#FFFFFF] border-2 shadow-sm border-sha hover:scale-110 transition"
        role="button"
        onClick={() => setColor("#FFFFFF")}
      ></div>
      <div
        className="h-8 w-8 rounded-full  bg-[#f88379] shadow-sm hover:scale-110 transition"
        role="button"
        onClick={() => setColor("#f88379")}
      ></div>
      <div
        className="h-8 w-8 rounded-full bg-[#f6b092] shadow-sm  hover:scale-110 transition"
        role="button"
        onClick={() => setColor("#f6b092")}
      ></div>
      <div
        className="h-8 w-8 rounded-full bg-[#f2d2a9] shadow-sm  hover:scale-110 transition"
        role="button"
        onClick={() => setColor("#f2d2a9")}
      ></div>
      <div
        className="h-8 w-8 rounded-full bg-[#aaf0d1] shadow-sm hover:scale-110 transition"
        role="button"
        onClick={() => setColor("#aaf0d1")}
      ></div>
      <div
        className="h-8 w-8 rounded-full bg-[#a084aa] shadow-sm hover:scale-110 transition"
        role="button"
        onClick={() => setColor("#a084aa")}
      ></div>
    </div>
  );
};

ColorPicker.Skeleton = function ColorPickerSkeleton() {
  return (
    <div className="flex gap-x-2 mr-4">
      <Skeleton className="h-8 w-8 rounded-full bg-neutral-600" />
      <Skeleton className="h-8 w-8 rounded-full bg-neutral-600" />
      <Skeleton className="h-8 w-8 rounded-full bg-neutral-600" />
    </div>
  );
};
