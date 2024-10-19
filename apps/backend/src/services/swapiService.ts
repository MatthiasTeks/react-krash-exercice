export const fetchFromSWAPI = async (endpoint: string) => {
  const response = await fetch(`${process.env.SW_API}/${endpoint}`);
  if (!response.ok) {
    throw new Error('Resource not found');
  }
  return response.json();
};

export const fetchDetails = async (urlArray: string[]): Promise<any[]> => {
  const data = await Promise.all(
    urlArray.map(async (url: string) => {
      const res = await fetch(url);
      if (res.ok) {
        return res.json();
      }
      return null;
    })
  );
  return data.filter((item) => item !== null);
};

/**
 * This function enriches an entity by fetching and replacing related data from URL references.
 * For properties that contain arrays of URLs (e.g., related films or characters), it retrieves 
 * detailed information from each URL, replacing the URLs with objects containing names or titles.
 * This provides a fully enriched entity with associated details instead of just raw URL links.
 * 
 * @param entity - The main entity to enrich with associated data.
 * @returns The entity with associated details fetched and included.
 */
export const enrichEntityData = async (entity: any) => {
  const entityKeys = Object.keys(entity);

  const enrichedData = await Promise.all(
    entityKeys.map(async (key) => {
      if (Array.isArray(entity[key]) && entity[key].every((item: any) => typeof item === 'string' && item.startsWith('http'))) {
        const details = await fetchDetails(entity[key]);
        return [key, details.map((item) => {
          if (item.name) return { name: item.name, url: item.url };
          if (item.title) return { title: item.title, url: item.url };
          return { url: item.url };
        })];
      }
      return [key, entity[key]];
    })
  );

  return Object.fromEntries(enrichedData);
};