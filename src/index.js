import './css/styles.css';
import debounce from 'lodash.debounce';
import SearchCountry from './fetchCountries';
import { Notify } from 'notiflix';

const searchInput = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const container = document.querySelector('.country-info');
const searchCountry = new SearchCountry();
console.log(searchCountry);
const DEBOUNCE_DELAY = 300;

searchInput.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(e) {
  resetCountryList();
  searchCountry.country = e.target.value.trim();
  if (searchCountry.country) {
    searchCountry.fetchCountries().then(data => createMarkup(data));
  } 
}

function createMarkup(data) {
  if (data.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
      }
  if (data.length === 1) {
    createCountryCard();
  }
  if (data.length >= 2 && data.length <= 10) {
    createCountryList();
  }

  function createCountryList() {
  const markup = data.map(
        ({ name, flags }) =>
          `<li>
            <p><image src="${flags.svg}" alt="${name}" height="30" width="40"/> 
            <span><b>${name.official}</span>
            </p>
          </li>`
      )
    .join('');

  countryList.innerHTML = markup;
  }

  function createCountryCard() {
    const markup = data
      .map(
        ({ name, capital, population, flags, languages }) =>
          `<div class='country-item'>
            <h2><image src="${flags.svg}" alt="${name}" height="40" width="50"/><b> ${name.official}</b></h2>
            <h3><span>Capital: </span> ${capital} </h3>
            <p><span><b>Population: </b></span> ${population}</p>
            <p><span><b>Languages: </b></span>${Object.values(languages).join(', ')}</p>
          </div>`)
      .join('');
    container.innerHTML = markup;
  }
}

function resetCountryList() {
  countryList.innerHTML = '';
  container.innerHTML = '';
};