import { Product, Suggestion, Conclusion } from "./types";
import { differenceInDays, format } from "date-fns";
import { Category } from "shared";
import type { ProductNames } from "shared";
import { products } from "./AppleProducts";
import { zhCN, ja, enUS } from "date-fns/locale";

type SUPPORTED_LOCALES = "zh" | "ja" | "en";

const localeMap = {
  en: enUS,
  zh: zhCN,
  ja,
};

const formatPattern = "MMM y";

export const stringToUTCDate = (
  dateString: `${string}-${string}-${string}`
) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(Date.UTC(year!, month! - 1, day));
};

export const getDateStringAndDifference = (
  current: Date,
  next: Date,
  lang: SUPPORTED_LOCALES
) => {
  const display = format(current, formatPattern, { locale: localeMap[lang] });
  const diffInDays = differenceInDays(next, current);
  return [display, diffInDays] as const;
};

const getConclusion = (average: number, daysPassed: number) => {
  const oneSixth = average / 6;
  switch (true) {
    case daysPassed < 2 * oneSixth:
      return Conclusion.BUY_NOW;
    case daysPassed < 4 * oneSixth:
      return Conclusion.NEUTRAL;
    case daysPassed < 5 * oneSixth:
      return Conclusion.CAUTION;
    default:
      return Conclusion.DONT_BUY;
  }
};

export const getSuggestion = (
  product: Product,
  time: Date,
  lang: SUPPORTED_LOCALES
): Suggestion => {
  const [current, ...recentReleases] = product.releases;
  if (!current) throw new Error("Bad data.");
  const _current = getDateStringAndDifference(
    stringToUTCDate(current),
    time,
    lang
  );

  const _recentReleases = recentReleases.map((dateString, index, arr) => {
    const next = stringToUTCDate(arr[index - 1] || current);
    return getDateStringAndDifference(stringToUTCDate(dateString), next, lang);
  });

  const average = Math.round(
    _recentReleases.reduce((sum, [_, diff]) => sum + diff, 0) /
      recentReleases.length
  );

  const conclusion = getConclusion(
    // prioty use estimated update span to get conclusion
    // there should always be a valid estimatedUpdate Value if some product never updated
    product.estimatedUpdate || average,
    _current[1]
  );

  return {
    conclusion,
    average,
    current: _current,
    recentReleases: _recentReleases,
    estimatedUpdate: product.estimatedUpdate,
  };
};

export const getSuggestionToday = <T extends Category>(
  category: T,
  product: ProductNames<T>,
  lang: SUPPORTED_LOCALES
) => {
  const info: Product = products[category][product];
  return getSuggestion(info, new Date(), lang);
};

export * from "./types";
