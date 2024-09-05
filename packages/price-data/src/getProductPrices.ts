import {
  getShopURL,
  productIdByCategory,
  ProductStoreInfo,
  ScrapeRule,
  storeInfoByCategory,
} from "shared";
import { countries, CountryCode } from "shared";
import { Metrics, ProductSelectionBootstrap } from "./types";
import { loadContents, looseJSONParse } from "./utils";
import * as cheerio from "cheerio";

export const getPriceFromProductSelectionBootstrap = (
  $: cheerio.CheerioAPI,
  target: string
) => {
  const targetScript = $("script")
    .map((_, el) => $(el).html())
    .toArray()
    .find((v) => v.includes("PRODUCT_SELECTION_BOOTSTRAP"));

  if (!targetScript)
    throw new Error("No product bootstrap script on this page");
  const trimed = targetScript.trim();
  const objectStr = (trimed.endsWith(";") ? trimed.slice(0, -1) : trimed)
    .replace(/\\\"/g, "")
    .replace("window.PRODUCT_SELECTION_BOOTSTRAP = ", "");
  const obj = looseJSONParse<ProductSelectionBootstrap>(objectStr);
  const product = obj?.productSelectionData.displayValues.prices[target];
  if (!product) throw new Error("can not locate product in product bootstrap");
  const price = product.amount;
  return price;
};

export const getPriceFromMetrics = ($: cheerio.CheerioAPI, name: string) => {
  const metricsScript = $("#metrics").html();
  if (!metricsScript) throw new Error("No metrics on this page");
  const metrics = JSON.parse(metricsScript) as Metrics;
  const matchedProducts = metrics.data.products.filter((p) => {
    return p.name.replace(/\s/g, "") === name.replace(/\s/g, "");
  });
  if (!matchedProducts.length)
    throw new Error("can not locate product in metrics");
  if (matchedProducts.length === 1) return matchedProducts[0]!.price.fullPrice;
  const prices = matchedProducts.map((p) => p.price.fullPrice);
  return Math.min(...prices);
};

export const getPriceWithShopURL = async (
  shopURL: string,
  product: ProductStoreInfo
) => {
  const res = await loadContents(shopURL);
  const $ = cheerio.load(res);
  return product.rule === ScrapeRule.Metric
    ? getPriceFromMetrics($, product.key)
    : getPriceFromProductSelectionBootstrap($, product.key);
};

const getProductByProductId = (productId: string) => {
  const targetCategory = Object.values(storeInfoByCategory).find((c) =>
    Object.keys(c).find((id) => id === productId)
  );
  if (!targetCategory) throw new Error("Bad productId");
  const product = Object.entries(targetCategory).find(
    ([id]) => id === productId
  )![1];
  return product;
};

export const getProductPriceByCountryCodeAndProductId = (
  productId: string,
  countryCode: CountryCode
) => {
  const product = getProductByProductId(productId);
  const country = countries[countryCode];
  const shopPath = getShopURL(product, country.path);
  return getPriceWithShopURL(shopPath, product)
    .then((price) => {
      console.log(`Price of ${productId} in ${countryCode}: ${price}`);
      return price;
    })
    .catch(() => {
      console.warn(`scrape price failed on ${productId} in ${country.name}`);
      return null;
    });
};

export const getProductPricesByProductId = async (productId: string) => {
  const map: Partial<{
    [key in CountryCode]: number | null;
  }> = {};
  const product = getProductByProductId(productId);

  await Promise.all(
    Object.values(CountryCode).map(async (countryCode) => {
      const country = countries[countryCode];
      const shopPath = getShopURL(product, country.path);
      await getPriceWithShopURL(shopPath, product)
        .then((price) => {
          console.log(`Price of ${productId} in ${countryCode}: ${price}`);
          map[countryCode] = price;
        })
        .catch(() => {
          console.warn(
            `scrape price failed on ${productId} in ${country.name}`
          );
          map[countryCode] = null;
        });
    })
  );

  return map;
};

export const getPricesForAllProducts = async () => {
  const allProductIds = Object.values(productIdByCategory).flatMap(
    (ids) => ids
  );
  const map: {
    [id: string]: Awaited<ReturnType<typeof getProductPricesByProductId>>;
  } = {};

  await Promise.all(
    allProductIds.map(async (id) => {
      await getProductPricesByProductId(id).then((res) => {
        map[id] = res;
      });
    })
  );
  
  return map;
};
