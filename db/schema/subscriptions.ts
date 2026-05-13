import { boolean, date, index, numeric, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { users } from "@/db/schema";
import { billingCycleEnum, paymentMethodEnum, serviceEnum } from "@/db/schema/enums";

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    billingCycle: billingCycleEnum("billing_cycle").notNull(),
    service: serviceEnum("service").notNull(),
    startDate: date("start_date").notNull(),
    amount: numeric("amount", { precision: 10, scale: 2, mode: "number" }).notNull(),
    paymentMethod: paymentMethodEnum("payment_method").notNull(),
    notes: text("notes"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [index("subscriptions_user_idx").on(t.userId), index("subscriptions_service_idx").on(t.service)],
);
