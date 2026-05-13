import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import { BILLING_CYCLES, getBillingCycleMetadata } from "@/features/subscriptions/lib/billing-cycles-catalog";
import { PAYMENT_METHODS, getPaymentMethodMetadata } from "@/features/subscriptions/lib/payment-methods-catalog";
import { SubscriptionPayload } from "@/features/subscriptions/types/subscription.types";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/lib/utils";

export function SubscriptionForm() {
  const { control } = useFormContext<SubscriptionPayload>();

  return (
    <FieldGroup className="py-6">
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor={field.name}>Nombre</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Netflix, Spotify, YouTube..."
                autoComplete="off"
              />
            </FieldContent>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="billingCycle"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor={field.name}>Periodo de pago</FieldLabel>
              <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id={field.name} aria-invalid={fieldState.invalid} className="w-full min-w-[120px]">
                  <SelectValue placeholder="Facturación" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {BILLING_CYCLES.map((cycle) => {
                    const { label } = getBillingCycleMetadata(cycle);

                    return (
                      <SelectItem key={cycle} value={cycle}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FieldContent>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="startDate"
        control={control}
        render={({ field, fieldState }) => {
          const dateValue = field.value ? parseISO(field.value) : undefined;

          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor={field.name}>Fecha de inicio</FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id={field.name}
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                      aria-invalid={fieldState.invalid}>
                      <CalendarIcon className="mr-2 size-4" />
                      {dateValue ? format(dateValue, "PPP") : <span>Selecciona una fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateValue}
                      onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : null)}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    />
                  </PopoverContent>
                </Popover>
              </FieldContent>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />

      <Controller
        name="amount"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Monto</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="number"
              aria-invalid={fieldState.invalid}
              placeholder="0.00"
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === "" ? undefined : parseFloat(value));
              }}
              value={field.value ?? ""}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="paymentMethod"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor={field.name}>Pago con</FieldLabel>
              <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id={field.name} aria-invalid={fieldState.invalid} className="w-full min-w-[120px]">
                  <SelectValue placeholder="Pago con" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {PAYMENT_METHODS.map((method) => {
                    const { label } = getPaymentMethodMetadata(method);

                    return (
                      <SelectItem key={method} value={method}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FieldContent>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="notes"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor={field.name}>Notas</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                className="min-h-[120px]"
                value={field.value ?? ""}
              />
            </FieldContent>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
