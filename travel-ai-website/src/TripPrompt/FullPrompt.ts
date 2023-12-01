import { getInterestString } from "./InterestsPrompt";

const interests = getInterestString();
const adults = localStorage.getItem('adults');
const kids = localStorage.getItem('kids');
const city = localStorage.getItem('city');

const fullPrompt = `We are ${adults} adults and ${kids} kids going on a trip to ${city}. ${interests} What are some things we could do in the city that fit our interests? I want you to give me the things to do as a numbered list and please just only give me the list with a small description for each thing to do.`;
export {fullPrompt};