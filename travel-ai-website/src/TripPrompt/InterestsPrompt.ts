export function getInterestString(): string {
  const numberOfAdults = localStorage.getItem("adults") || "0";
  const numberOfKids = localStorage.getItem("kids") || "0";

  const generateListNames = (): string[] => {
    const adultsArray = Array.from(
      { length: Number(numberOfAdults) },
      (_, index) => `Adult ${index + 1}`
    );
    const kidsArray = Array.from(
      { length: Number(numberOfKids) },
      (_, index) => `Kid ${index + 1}`
    );
    return [...adultsArray, ...kidsArray];
  };

  const listNames = generateListNames();

  const counts: { [key: string]: number } = {};

  listNames.forEach((listName) => {
    const stored = localStorage.getItem(listName);
    if (stored) {
      const selectedItems = JSON.parse(stored) as string[];
      selectedItems.forEach((item) => {
        if (counts[item]) {
          counts[item]++;
        } else {
          counts[item] = 1;
        }
      });
    }
  });

  const sortedCustomNames = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

  if (sortedCustomNames.length === 0) {
    return "No interests selected.";
  }

  const mostPicked = sortedCustomNames[0];
  const nextPicked = sortedCustomNames.slice(1, 3).join(' and ');
  const leastPicked = sortedCustomNames.slice(3).join(', ');

  if (sortedCustomNames.length === 1) {
    return `We are most interested in ${mostPicked}.`;
  } else if (sortedCustomNames.length === 2) {
    return `We are most interested in ${mostPicked} but also interested in ${nextPicked}.`;
  } else {
    return `We are most interested in ${mostPicked} but also interested in ${nextPicked}. We also have a little interest in ${leastPicked}.`;
  }
}