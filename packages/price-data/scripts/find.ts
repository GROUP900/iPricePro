import { defineCommand, runMain } from "citty";
import {
  updateProductPriceInAllCountries,
  updateProductPriceInCountry,
} from "./utils";

const main = defineCommand({
  args: {
    productId: {
      type: "positional",
      description: "product id",
      required: false,
    },
    countryCode: {
      type: "positional",
      description: "Country code",
      required: false,
    },
    dry: {
      type: "boolean",
      description: "dry run",
    },
  },
  async run({ args: { productId, countryCode, dry } }) {
    switch (true) {
      case Boolean(productId && countryCode):
        await updateProductPriceInCountry(productId, countryCode, dry);
        break;
      case Boolean(productId):
        await updateProductPriceInAllCountries(productId, dry);
        break;
      default:
        throw new Error("you should provide at least productId.");
    }
  },
});

runMain(main);
