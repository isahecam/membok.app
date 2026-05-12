import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const authSearchParamsParsers = {
  error: parseAsString.withDefault(""),
};

export const authSearchParams = createSearchParamsCache(authSearchParamsParsers);
