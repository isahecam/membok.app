"use client";

import { PencilLineIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { BILLING_CYCLES_REGISTRY } from "@/features/subscriptions/lib/billing-cycles-catalog";
import { PAYMENT_METHODS_REGISTRY } from "@/features/subscriptions/lib/payment-methods-catalog";
import { SERVICES_REGISTRY } from "@/features/subscriptions/lib/services-catalog";
import {
  useDaySubscriptionsActions,
  useDaySubscriptionsIsOpen,
  useDaySubscriptionsSelectedDate,
} from "@/features/subscriptions/store/day-subscriptions.store";
import type { Subscription } from "@/features/subscriptions/types/subscription.types";
import { isSubscriptionDueOn } from "@/features/subscriptions/utils/is-subscription-due-on";
import { dt } from "@/lib/date";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/shared/components/ui/item";

interface Props {
  subscriptions: Subscription[];
}

export function DaySubscriptionsModal({ subscriptions }: Props) {
  const isOpen = useDaySubscriptionsIsOpen();
  const selectedDate = useDaySubscriptionsSelectedDate();
  const { close, addNew } = useDaySubscriptionsActions();

  if (!selectedDate) return null;

  const subsForDay = subscriptions.filter((s) => isSubscriptionDueOn(s, selectedDate));
  const formattedDate = dt.format(selectedDate, "PPP");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Suscripciones del día</DialogTitle>
          <DialogDescription>{formattedDate}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <ItemGroup className="gap-4">
            {subsForDay.map((sub) => {
              const service = SERVICES_REGISTRY[sub.service];
              return (
                <Item key={sub.id} variant="muted" role="listitem">
                  <ItemMedia variant="icon">
                    <Image
                      src={service.logoUrl}
                      alt={service.name}
                      width={32}
                      height={32}
                      className="size-8 object-cover"
                    />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="line-clamp-1">{service.name}</ItemTitle>
                    <ItemDescription>
                      <span className="font-features-[tnum]">${sub.amount}</span> {` · `}
                      {BILLING_CYCLES_REGISTRY[sub.billingCycle].label} {` · `}
                      {PAYMENT_METHODS_REGISTRY[sub.paymentMethod].label}
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <PencilLineIcon />
                    </Button>
                    <Button variant="destructive" size="icon" className="rounded-full">
                      <TrashIcon />
                    </Button>
                  </ItemActions>
                </Item>
              );
            })}
          </ItemGroup>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={close}>
            Cerrar
          </Button>
          <Button onClick={addNew}>Crear nueva</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
