export async function getCachedData(cacheName, url) {
  const cacheStorage = await caches.open(cacheName);
  const cachedResponse = await cacheStorage.match(url);

  if (!cachedResponse || !cachedResponse.ok) {
    return false;
  }

  return await cachedResponse.json();
}

export const option = [
  {
    options: "A-Z",
  },
  {
    options: "Z-A",
  },
  {
    options: "low",
  },
  {
    options: "high",
  },
];
