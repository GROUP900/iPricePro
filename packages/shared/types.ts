import { Category, ScrapeRule } from "./enums";
import { productIdByCategory } from "./presets";

export type ProductNames<C extends Category> =
  (typeof productIdByCategory)[C][number];

export interface Country {
  name: string;
  currencyCode: SUPPORTED_CURRENCY;
  path: string;
}

export interface ProductStoreInfo {
  /** path for scrape content on apple.com */
  appleComPath: string;
  subPath?: string;
  rule: ScrapeRule;
  /**
   * there are a lot hardware configs for most apple products..
   * but we only scrape entry-level config price now.
   */
  key: string;
}

export type SUPPORTED_CURRENCY =
  | "USD"
  | "AUD"
  | "EUR"
  | "BRL"
  | "CAD"
  | "CNY"
  | "HKD"
  | "INR"
  | "JPY"
  | "MYR"
  | "MXN"
  | "SGD"
  | "KRW"
  | "SEK"
  | "CHF"
  | "TWD"
  | "TRY"
  | "AED"
  | "GBP"
  | "PHP"
  | "VND"
  | "THB";
