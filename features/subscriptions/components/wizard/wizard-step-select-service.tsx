import Image from "next/image";

import { SERVICES, SERVICES_REGISTRY } from "@/features/subscriptions/lib/services-catalog";
import { useWizardActions } from "@/features/subscriptions/store/subscription-wizard.store";
import { Button } from "@/shared/components/ui/button";

export function WizardStepSelectService() {
  const { selectService } = useWizardActions();

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {SERVICES.map((service) => {
        const { name, logoUrl } = SERVICES_REGISTRY[service];

        return (
          <Button
            variant="outline"
            className="h-24 w-full"
            key={service}
            type="button"
            onClick={() => selectService(service)}>
            <div className="grid size-full place-items-center gap-2 py-3">
              <Image src={logoUrl} alt={name} width={32} height={32} className="size-8 object-contain" />
              <span className="text-xs font-medium text-balance">{name}</span>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
