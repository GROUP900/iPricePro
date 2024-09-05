import { CountryCode } from "shared";

export interface Metrics {
  data: {
    products: {
      name: string;
      sku: string;
      price: {
        fullPrice: number;
      };
    }[];
  };
}

export interface ProductSelectionBootstrap {
  productSelectionData: {
    displayValues: {
      prices: {
        [type: string]: {
          amount: number;
        };
      };
    };
  };
}

export type PriceMap = Partial<{
  [key in CountryCode]: number | null;
}>;
