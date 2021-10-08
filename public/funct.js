export async function getCachedData(cacheName, url) {
  const cacheStorage = await caches.open(cacheName);
  const cachedResponse = await cacheStorage.match(url);

  if (!cachedResponse || !cachedResponse.ok) {
    return false;
  }

  return await cachedResponse.json();
}
const cacheVersion = 1;
export const cacheName = `myapp-${cacheVersion}`;
export const url =
  "http://data.fixer.io/api/latest?access_key=0ae329c5f31ee61cff8dda76ab72f43c";
export const option = [
  {
    options: "please select",
  },
  {
    options: "A-Z",
  },
  {
    options: "Z-A",
  },
  {
    options: "low to high",
  },
  {
    options: "high to low",
  },
];
export const AllValues = {
  AED: 4.258524,
  ANG: 2.081183,
  AUD: 1.595878,
  AWG: 2.086829,
  AZN: 1.963704,
  BAM: 1.955787,
  BBD: 2.341129,
  BGN: 1.955835,
  BYN: 2.902812,
  BWP: 13.101362,
  BZD: 2.337229,
  CAD: 1.46099,
  CHF: 1.07699,
  CNY: 7.473983,
  CUC: 1.15935,
};
