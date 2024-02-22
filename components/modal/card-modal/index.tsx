"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import { CardWithList } from "@/types";
import { useCardModal } from "@/hooks/use-card-modal";

import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";

export const CardModal = () => {
  const { isOpen, onClose, id } = useCardModal();

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        {!cardData ? (
          <Header.Skeleton />
        ) : (
          <Header data={cardData} />
        )}
      </DialogContent>
    </Dialog>
  );
};
