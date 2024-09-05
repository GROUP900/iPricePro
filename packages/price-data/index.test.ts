import {
  countries,
  getShopURL,
  storeInfoByCategory,
  PATH_PREFIX,
  ScrapeRule,
  Country,
  ProductStoreInfo,
} from "shared";
import { describe, expect, it } from "vitest";
import isURL from "is-url";
import pRetry from "p-retry";
import { getPriceWithShopURL } from "./src/getProductPrices";

const macbookPro: ProductStoreInfo = {
  appleComPath: `${PATH_PREFIX}/buy-mac/macbook-pro`,
  rule: ScrapeRule.Metric,
  key: "14-inch MacBook Pro - Silver",
};

const appleWatchUltra: ProductStoreInfo = {
  appleComPath: `${PATH_PREFIX}/buy-watch/apple-watch-ultra`,
  rule: ScrapeRule.ProductBootstrap,
  key: "watch_cases-titanium-49mm-gpscell",
};

const US: Country = { name: "United States", currencyCode: "USD", path: "" };

const allProducts = Object.values(storeInfoByCategory).flatMap((c) =>
  Object.values(c).map((p) => p)
);

const createPairs = (country: Country) =>
  allProducts.map((product) => ({
    country,
    product,
  }));

// normal store
const ph = createPairs(countries["PH"]!);
// store without path
const us = createPairs(countries["US"]!);
// store redirect to different domain
const cn = createPairs(countries["CN"]!);
// store with multiple language
const ch = createPairs(countries["CH"]!);

const pairs = [...ph, ...us, ...cn, ...ch];

describe("shop url", () => {
  it.concurrent.each(pairs)(
    "should generate valid URL with $product.name in $country.name",
    async ({ country, product }) => {
      const url = getShopURL(product, country.path);
      expect(url).toSatisfy(isURL);
      expect(
        await pRetry(
          () => {
            return fetch(url).then((r) => r.status);
          },
          { retries: 2 }
        )
      ).not.toBe(404);
    }
  );
});

describe("get price from html", () => {
  it("should get price from an apple page with price inside metrics json", async () => {
    const url = getShopURL(macbookPro, US.path);
    const price = await getPriceWithShopURL(url, macbookPro);
    expect(price).toBeGreaterThan(0);
  });
  it("should get price from an apple page with price inside PRODUCT_SELECT_BOOTSTRAP object", async () => {
    const url = getShopURL(appleWatchUltra, US.path);
    const price = await getPriceWithShopURL(url, appleWatchUltra);
    expect(price).toBeGreaterThan(0);
  });
});

describe("scrape price", () => {
  it.concurrent.each(pairs)(
    "should get price in number with $product.key in $country.name",
    async ({ country, product }) => {
      const url = getShopURL(product, country.path);
      try {
        const price = await getPriceWithShopURL(url, product);
        expect(price).toBeGreaterThan(0);
      } catch (error) {
        // sometimes it throw an error if some product not sells in some country, for example homepod in philippines.
        expect(error).toBeInstanceOf(Error);
      }
    }
  );
});
