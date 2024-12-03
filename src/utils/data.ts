import { baseURL } from ".";

export type MatchPosition = {
  start: number;
  end: number;
};

export type MatchResult = {
  value: string;
  matches: MatchPosition[];
};

export const searchCities = async (query: string): Promise<MatchResult[]> => {
  const res = await fetch(`${baseURL}/cities.json`);
  const cities = (await res.json()) as string[];

  return new Promise((resolve) => {
    setTimeout(() => {
      const results = cities
        .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
        .map((value) => {
          const matches: MatchPosition[] = [];
          const lowerItem = value.toLowerCase();
          const lowerQuery = query.toLowerCase();
          let pos = 0;

          // Find all occurrences of the query in the item
          while (pos !== -1) {
            pos = lowerItem.indexOf(lowerQuery, pos);
            if (pos !== -1) {
              matches.push({
                start: pos,
                end: pos + query.length,
              });
              pos += 1; // Move to next character to find additional matches
            }
          }

          return {
            value,
            matches,
          };
        });

      resolve(results);
    }, 1000);
  });
};
