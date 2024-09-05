import { PATH_PREFIX } from "./constants";
import { Category, CountryCode, ScrapeRule } from "./enums";
import { Country, ProductStoreInfo, ProductNames } from "./types";

export const productIdByCategory = {
  [Category.IOS]: [
    "iphone_15",
    "iphone_15_pro",
    "ipad_pro",
    "ipad_air",
    "ipad",
    "iphone_se",
    "ipad_mini",
  ],
  [Category.MAC]: [
    "macbook_air_13",
    "macbook_air_15",
    "macbook_pro_14",
    "macbook_pro_16",
    "imac",
    "mac_pro",
    "mac_studio",
    "mac_mini",
  ],
  [Category.MUSIC]: [
    "airpods",
    "airpods_pro",
    "airpods_max",
    "homepod",
    "homepod_mini",
  ],
  [Category.OTHER]: [
    "vision_pro",
    "apple_watch",
    "apple_watch_ultra",
    "apple_tv",
    "apple_watch_se",
  ],
};

export const storeInfoByCategory: {
  [K in Category]: {
    [P in ProductNames<K>]: ProductStoreInfo;
  };
} = {
  [Category.IOS]: {
    ipad_pro: {
      appleComPath: `${PATH_PREFIX}/buy-ipad/ipad-pro`,
      rule: ScrapeRule.Metric,
      key: "11-inch iPad Pro Wi‑Fi 256GB with standard glass - Silver",
    },
    ipad_air: {
      appleComPath: `${PATH_PREFIX}/buy-ipad/ipad-air`,
      rule: ScrapeRule.Metric,
      key: "11-inch iPad Air Wi-Fi 128GB - Blue",
    },
    ipad: {
      appleComPath: `${PATH_PREFIX}/buy-ipad/ipad`,
      rule: ScrapeRule.Metric,
      key: "10.9-inch iPad Wi‑Fi 64GB - Blue",
    },
    ipad_mini: {
      appleComPath: `${PATH_PREFIX}/buy-ipad/ipad-mini`,
      rule: ScrapeRule.Metric,
      key: "iPad mini Wi‑Fi 64GB - Starlight",
    },
    iphone_15: {
      appleComPath: `${PATH_PREFIX}/buy-iphone/iphone-15`,
      rule: ScrapeRule.Metric,
      key: "iPhone 15 128GB Green",
    },
    iphone_15_pro: {
      appleComPath: `${PATH_PREFIX}/buy-iphone/iphone-15-pro`,
      rule: ScrapeRule.Metric,
      key: "iPhone 15 Pro 128GB Natural Titanium",
    },
    iphone_se: {
      appleComPath: `${PATH_PREFIX}/buy-iphone/iphone-se`,
      rule: ScrapeRule.Metric,
      key: "iPhone SE 64GB Starlight",
    },
  },
  [Category.MAC]: {
    macbook_air_13: {
      appleComPath: `${PATH_PREFIX}/buy-mac/macbook-air`,
      rule: ScrapeRule.Metric,
      key: "13-inch MacBook Air with M3 chip - Midnight",
    },
    macbook_air_15: {
      appleComPath: `${PATH_PREFIX}/buy-mac/macbook-air`,
      rule: ScrapeRule.Metric,
      key: "15-inch MacBook Air with M3 chip - Midnight",
    },
    imac: {
      appleComPath: `${PATH_PREFIX}/buy-mac/imac`,
      rule: ScrapeRule.Metric,
      key: "Orange iMac",
    },
    macbook_pro_14: {
      appleComPath: `${PATH_PREFIX}/buy-mac/macbook-pro`,
      rule: ScrapeRule.Metric,
      key: "14-inch MacBook Pro - Silver",
    },
    macbook_pro_16: {
      appleComPath: `${PATH_PREFIX}/buy-mac/macbook-pro`,
      rule: ScrapeRule.Metric,
      key: "16-inch MacBook Pro - Silver",
    },
    mac_pro: {
      appleComPath: `${PATH_PREFIX}/buy-mac/mac-pro`,
      rule: ScrapeRule.Metric,
      key: "Mac Pro",
    },
    mac_studio: {
      appleComPath: `${PATH_PREFIX}/buy-mac/mac-studio`,
      rule: ScrapeRule.Metric,
      key: "Mac Studio",
    },
    mac_mini: {
      appleComPath: `${PATH_PREFIX}/buy-mac/mac-mini`,
      rule: ScrapeRule.Metric,
      key: "Mac mini",
    },
  },
  [Category.MUSIC]: {
    airpods: {
      appleComPath: `${PATH_PREFIX}/product/MPNY3`,
      rule: ScrapeRule.Metric,
      key: "AirPods (3rd generation) with Lightning Charging Case",
    },
    airpods_pro: {
      appleComPath: `${PATH_PREFIX}/product/MTJV3`,
      rule: ScrapeRule.Metric,
      key: "AirPods Pro (2nd generation) with MagSafe Charging Case (USB‑C)",
    },
    airpods_max: {
      appleComPath: `${PATH_PREFIX}/buy-airpods/airpods-max`,
      rule: ScrapeRule.Metric,
      key: "AirPods Max - Silver",
    },
    homepod: {
      appleComPath: `${PATH_PREFIX}/buy-homepod/homepod`,
      rule: ScrapeRule.Metric,
      key: "HomePod - Midnight",
    },
    homepod_mini: {
      appleComPath: `${PATH_PREFIX}/buy-homepod/homepod-mini`,
      rule: ScrapeRule.Metric,
      key: "HomePod mini - Blue",
    },
  },
  [Category.OTHER]: {
    vision_pro: {
      appleComPath: `${PATH_PREFIX}/buy-vision/apple-vision-pro`,
      rule: ScrapeRule.ProductBootstrap,
      key: "apple_vision_pro_2024-256gb",
    },
    apple_watch: {
      appleComPath: `${PATH_PREFIX}/buy-watch/apple-watch`,
      rule: ScrapeRule.ProductBootstrap,
      key: "watch_cases-aluminum-41mm-gps",
    },
    apple_watch_se: {
      appleComPath: `${PATH_PREFIX}/buy-watch/apple-watch-se`,
      rule: ScrapeRule.ProductBootstrap,
      key: "watch_cases-aluminum-40mm-gps",
    },
    apple_watch_ultra: {
      appleComPath: `${PATH_PREFIX}/buy-watch/apple-watch-ultra`,
      rule: ScrapeRule.ProductBootstrap,
      key: "watch_cases-titanium-49mm-gpscell",
    },
    apple_tv: {
      appleComPath: `${PATH_PREFIX}/buy-tv/apple-tv-4k`,
      rule: ScrapeRule.Metric,
      key: "Apple TV 4K Wi‑Fi with 64GB storage",
    },
  },
};

export const countries: {
  [K in CountryCode]: Country;
} = {
  US: { name: "United States", currencyCode: "USD", path: "" },
  AU: { name: "Australia", currencyCode: "AUD", path: "/au" },
  AT: { name: "Austria", currencyCode: "EUR", path: "/at" },
  BE: { name: "Belgium", currencyCode: "EUR", path: "/be-fr" },
  BR: { name: "Brazil", currencyCode: "BRL", path: "/br" },
  CA: { name: "Canada", currencyCode: "CAD", path: "/ca" },
  CN: {
    name: "China mainland",
    currencyCode: "CNY",
    path: "/cn",
  },
  FR: { name: "France", currencyCode: "EUR", path: "/fr" },
  DE: { name: "Germany", currencyCode: "EUR", path: "/de" },
  HK: { name: "Hong Kong", currencyCode: "HKD", path: "/hk" },
  IN: { name: "India", currencyCode: "INR", path: "/in" },
  IT: { name: "Italy", currencyCode: "EUR", path: "/it" },
  JP: { name: "Japan", currencyCode: "JPY", path: "/jp" },
  MY: { name: "Malaysia", currencyCode: "MYR", path: "/my" },
  MX: { name: "Mexico", currencyCode: "MXN", path: "/mx" },
  NL: { name: "Netherlands", currencyCode: "EUR", path: "/nl" },
  SG: { name: "Singapore", currencyCode: "SGD", path: "/sg" },
  KR: { name: "South Korea", currencyCode: "KRW", path: "/kr" },
  ES: { name: "Spain", currencyCode: "EUR", path: "/es" },
  SE: { name: "Sweden", currencyCode: "SEK", path: "/se" },
  CH: { name: "Switzerland", currencyCode: "CHF", path: "/ch-fr" },
  TW: { name: "Taiwan", currencyCode: "TWD", path: "/tw" },
  TH: { name: "Thailand", currencyCode: "THB", path: "/th" },
  TR: { name: "Turkey", currencyCode: "TRY", path: "/tr" },
  AE: {
    name: "United Arab Emirates",
    currencyCode: "AED",
    path: "/ae",
  },
  UK: { name: "United Kingdom", currencyCode: "GBP", path: "/uk" },
  // countries without a apple store
  PH: { name: "Philippines", currencyCode: "PHP", path: "/ph" },
  VN: { name: "Vietnam", currencyCode: "VND", path: "/vn" },
};
