// const BASE_URL = 'https://restcountries.com/v2';

// export default function fetchCountries(name) {
//     return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`)
//     .then(responce => {
//         if (!responce.ok) {
//             throw new Error(responce.status);
//         }
//         return responce.json()
//     })
// }

export default function fetchCountries(searchQuery) {
const URL = `https://restcountries.com/v3.1/name/${searchQuery}?fields=flags,name,capital,lang,population`;
    return fetch(URL)       
}