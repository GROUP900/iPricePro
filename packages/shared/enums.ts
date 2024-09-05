export enum Category {
  IOS = "ios",
  MAC = "mac",
  MUSIC = "music",
  OTHER = "other",
}

export enum ScrapeRule {
  /**
   * get price from metric json
   */
  Metric,
  /**
   * get price from product bootstrap object in script tag
   */
  ProductBootstrap,
}

export enum CountryCode {
  US = "US",
  AU = "AU",
  AT = "AT",
  BE = "BE",
  BR = "BR",
  CA = "CA",
  CN = "CN",
  FR = "FR",
  DE = "DE",
  HK = "HK",
  IN = "IN",
  IT = "IT",
  JP = "JP",
  MY = "MY",
  MX = "MX",
  NL = "NL",
  SG = "SG",
  KR = "KR",
  ES = "ES",
  SE = "SE",
  CH = "CH",
  TW = "TW",
  TH = "TH",
  TR = "TR",
  AE = "AE",
  UK = "UK",
  // countries without a apple store
  PH = "PH",
  VN = "VN",
}
