"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import { CardWithList } from "@/types";
import { AuditLog } from "@prisma/client";
import { useCardModal } from "@/hooks/use-card-modal";

import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

import { Header } from "./header";
import { ColorPicker } from "./color-picker";
import { Description } from "./description";
import { Actions } from "./actions";
import { Activity } from "./activity";

export const CardModal = () => {
  const { isOpen, onClose, id } = useCardModal();

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });
  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        {!cardData ? (
          <div className="flex">
            <Header.Skeleton />
            <ColorPicker.Skeleton />
          </div>
        ) : (
          <div className="flex">
            <Header data={cardData} />
            <ColorPicker data={cardData} />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}
              {!auditLogsData ? (
                <Activity.Skeleton />
              ) : (
                <Activity items={auditLogsData} />
              )}
            </div>
          </div>
          {!cardData ? (
            <Actions.Skeleton />
          ) : (
            <Actions
              id={id as string}
              listId={cardData.listId}
              title={cardData.title}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
