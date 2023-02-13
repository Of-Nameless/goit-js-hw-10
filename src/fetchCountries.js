export default function fetchCountries(searchQuery) {
const URL = `https://restcountries.com/v3.1/name/${searchQuery}?fields=flags,name,capital,language,population`;
    return fetch(URL)       
}