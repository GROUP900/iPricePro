import {
  Category,
  CountryCode,
  productIdByCategory,
  ProductNames,
} from "shared";
import { existsSync, readFileSync, writeFileSync } from "fs";
import {
  getProductPriceByCountryCodeAndProductId,
  getProductPricesByProductId,
} from "@/getProductPrices";
import { PriceMap } from "@/types";

export const writeProductPrices = (productId: string, contents: PriceMap) => {
  const path = `./results/${productId}.json`;
  writeFileSync(path, JSON.stringify(contents, null, 2));
};

const readProductPrices = (productId: string) => {
  const path = `./results/${productId}.json`;
  if (!existsSync(path)) writeFileSync(path, "{}");
  return JSON.parse(readFileSync(path, "utf8")) as PriceMap;
};

export const merge = () => {
  const results = Object.values(Category).reduce(
    (acc, category) => {
      acc[category] = {};
      return acc;
    },
    {} as Record<
      Category,
      Partial<{
        [key in ProductNames<Category>]: string;
      }>
    >
  );
  Object.values(Category).forEach((category) => {
    const productIds = productIdByCategory[category];
    productIds.forEach((productId) => {
      const path = `./results/${productId}.json`;
      if (!existsSync(path)) return;
      const prices = JSON.parse(readFileSync(path, "utf8"));
      results[category][productId] = prices;
    });
  });
  return results;
};

export const mergeAndSave = () =>
  writeFileSync("./results/all.json", JSON.stringify(merge(), null, 2));

export const isValueOfStringEnum = <T extends Record<string, string>>(
  enumType: T,
  value: string
): value is T[keyof T] => Object.values<string>(enumType).includes(value);

/**
 * find product prices in all the country
 */
export const updateProductPriceInAllCountries = async (
  productId: string,
  dry: boolean
) => {
  const results = await getProductPricesByProductId(productId);
  if (dry) return;
  writeProductPrices(productId, results);
  mergeAndSave();
};

/**
 *  find product price in one country
 */
export const updateProductPriceInCountry = async (
  productId: string,
  countryCode: string,
  dry: boolean
) => {
  if (!isValueOfStringEnum(CountryCode, countryCode))
    throw new Error("Invalid country code.");
  const price = await getProductPriceByCountryCodeAndProductId(
    productId,
    countryCode as CountryCode
  );
  if (dry) return;
  const next = readProductPrices(productId);
  next[countryCode] = price;
  writeProductPrices(productId, next);
  mergeAndSave();
};
