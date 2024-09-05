import pRetry, { AbortError } from "p-retry";

export const loadContents = (url: string) => {
  const func = async () => {
    const res = await fetch(url);
    if (res.status === 404) throw new AbortError(res.statusText);
    return res.text();
  };
  return pRetry(func, { retries: 2 });
};

export const processObjectConcurrently = async <T>(obj: {
  [key: string]: T;
}) => {
  const promises = Object.keys(obj).map(async (key) => {
    const value = obj[key];
    // Assuming value is a promise or an async operation
    const result = await value; // Wait for the promise to resolve
    return { [key]: result }; // Return an object with the resolved value
  });

  // Wait for all promises to settle
  const results = await Promise.all(promises);

  // Combine all results into a single object
  return results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
};

export const looseJSONParse: <T>(obj: string) => T | null = (obj) => {
  try {
    return eval(`(${obj})`);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
};