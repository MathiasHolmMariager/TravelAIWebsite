import { getInterestString } from "./InterestsPrompt";

const interests = getInterestString();
const adults = localStorage.getItem('adults');
const kids = localStorage.getItem('kids');
const city = localStorage.getItem('city');

const fullPrompt = `We are ${adults} adults and ${kids} kids going on a trip to ${city}. ${interests} What are some things we could do in the city that fit our interests?`;
export {fullPrompt};