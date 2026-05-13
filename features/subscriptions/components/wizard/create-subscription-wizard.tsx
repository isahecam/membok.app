"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { createSubscriptionAction } from "@/features/subscriptions/actions/create-subscription.action";
import { SubscriptionForm } from "@/features/subscriptions/components/forms/subscription-form";
import { WizardStepSelectService } from "@/features/subscriptions/components/wizard/wizard-step-select-service";
import { SERVICES_REGISTRY } from "@/features/subscriptions/lib/services-catalog";
import { SubscriptionSchema } from "@/features/subscriptions/schemas/subscription.schema";
import {
  useWizardActions,
  useWizardIsOpen,
  useWizardStep,
  useWizardSelectedDate,
  useWizardSelectedService,
} from "@/features/subscriptions/store/subscription-wizard.store";
import type { SubscriptionPayload } from "@/features/subscriptions/types/subscription.types";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { gooeyToast } from "@/shared/components/ui/goey-toaster";
import { showErrorToast } from "@/shared/lib/show-error-toast";

export function CreateSubscriptionWizard() {
  const isOpen = useWizardIsOpen();
  const selectedDate = useWizardSelectedDate();
  const selectedService = useWizardSelectedService();
  const step = useWizardStep();
  const { close } = useWizardActions();
  const [isPending, startTransition] = useTransition();

  const methods = useForm<SubscriptionPayload>({
    resolver: zodResolver(SubscriptionSchema),
    defaultValues: {
      name: "",
      amount: undefined,
      startDate: "",
      billingCycle: "monthly",
      paymentMethod: "credit-card",
      notes: "",
    },
  });

  // Sincroniza la fecha de la celda → campo startDate
  useEffect(() => {
    if (selectedDate) {
      methods.setValue("startDate", selectedDate, { shouldValidate: false });
    }
  }, [selectedDate, methods]);

  // Sincroniza el servicio seleccionado → campo name
  useEffect(() => {
    if (selectedService) {
      const { name } = SERVICES_REGISTRY[selectedService];
      methods.setValue("name", name, { shouldValidate: false });
      methods.setValue("service", selectedService, { shouldValidate: false });
    }
  }, [selectedService, methods]);

  async function onSubmit(data: SubscriptionPayload) {
    startTransition(async () => {
      const [error] = await createSubscriptionAction(data);

      if (error) {
        showErrorToast(error.reason);
        return;
      }

      gooeyToast.success("Suscripción registrada correctamente", {
        showTimestamp: false,
      });

      handleClose();
    });
  }

  function handleClose() {
    methods.reset();
    close();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{step.name}</DialogTitle>
          <DialogDescription>{step.description}</DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          {step.id === "services" && <WizardStepSelectService />}
          {step.id === "form" && <SubscriptionForm />}
        </FormProvider>

        <DialogFooter>
          {step.id === "form" && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cerrar
              </Button>

              <Button
                type="button"
                onClick={methods.handleSubmit(onSubmit, (errors) => {
                  console.log(errors);
                })}
                disabled={isPending}>
                {isPending ? "Registrando..." : "Registrar suscripción"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
