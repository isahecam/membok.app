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
            className="size-full"
            key={service}
            type="button"
            onClick={() => selectService(service)}>
            <div className="grid place-items-center gap-2 p-4">
              <Image src={logoUrl} alt={name} width={32} height={32} />
              <span className="text-sm font-medium">{name}</span>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
