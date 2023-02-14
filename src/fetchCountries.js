import { Notify } from 'notiflix';

export default class SearchCountry {
  constructor() {
    this.name = '';
  }

  fetchCountries() {
    const url = `https://restcountries.com/v3.1/name/${this.name}?fields=name,capital,population,flags,languages`;

    return fetch(url).then(response => {
        if (!response.ok) {
          throw new Error(
            Notify.failure('Oops, there is no country with that name')
          )
        }
        return response.json();
    })
      
  }
  get country() {
    return this.name;
  }
  set country(newCountry) {
    this.name = newCountry;
  }
}