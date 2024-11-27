export const data = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Charlotte",
];

export const fetchData = (query: string) => {
  console.log("fetchData", new Date());
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(data.filter((item) => item.toLowerCase().includes(query.toLowerCase())));
    }, 1000);
  });
};
