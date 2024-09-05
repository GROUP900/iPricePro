import { getPricesForAllProducts } from "@/getProductPrices";
import { defineCommand, runMain } from "citty";
import { mergeAndSave, writeProductPrices } from "./utils";

const main = defineCommand({
  async run() {
    const results = await getPricesForAllProducts();
    Object.entries(results).map(([productId, results]) =>
      writeProductPrices(productId, results)
    );
    mergeAndSave();
  },
});

runMain(main);
