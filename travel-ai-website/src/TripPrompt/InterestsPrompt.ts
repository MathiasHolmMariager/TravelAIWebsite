export function getTopThreePickedCustomNames() {
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
    const topThreePicked = sortedCustomNames.slice(0, 3);
  
    // Function to generate the interest string
    const generateInterestString = (topThreePicked: string[]): string => {
      if (topThreePicked.length === 0) {
        return "No interests selected.";
      } else if (topThreePicked.length === 1) {
        return `We are most interested in ${topThreePicked[0]}.`;
      } else if (topThreePicked.length === 2) {
        return `We are most interested in ${topThreePicked[0]} but are also interested in ${topThreePicked[1]}.`;
      } else {
        const mostInterested = topThreePicked[0];
        const secondInterest = topThreePicked[1];
        const thirdInterest = topThreePicked[2];
  
        return `We are most interested in ${mostInterested} but are also interested in ${secondInterest} and ${thirdInterest}.`;
      }
    };
  
    const interestString = generateInterestString(topThreePicked);
  
    return interestString;
  }  