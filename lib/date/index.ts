import { es } from "date-fns/locale";

import { DateFnsDateAdapter } from "./date-fns.adapter";

export * from "./adapter.interface";

export const dt = new DateFnsDateAdapter(es);
