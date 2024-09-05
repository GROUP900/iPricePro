import { APPLE } from "./constants";
import { ProductStoreInfo } from "./types";

export const getShopURL = (
  productInfo: ProductStoreInfo,
  countryPath: string
) => {
  let url = `${APPLE}${countryPath}${productInfo.appleComPath}`;
  if (productInfo.subPath) url += productInfo.subPath;
  return url;
};
