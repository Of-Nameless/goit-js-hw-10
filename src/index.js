import './css/styles.css';
import debounce from 'lodash.debounce';
import {Notify} from 'notiflix';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
let searchValue = '';
const refs = {
    input: document.getElementById('search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info')
};

refs.input.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(e) {
    searchValue = e.target.value.trim();
    // console.log(searchValue);
    fetchCountries(searchValue)
        .then(country => {
            if (country.length > 10) {
            Notify.warning('Too many matches found. Please enter a more specific name')
            }
            if (country.length >= 2 && country.length <= 10) {
                return createListMarkup(country);
                
            }
            if(country.length === 1) {
               return createCardMarkup(country);
            }
    })
}

function createListMarkup(country) {
    const markup = country.map(arr => {
        return `<li>
        <p class="country-name">
          <span class="country-flag">
            <img src="${arr.flags.svg}" width="30px" height="20px">
          </span> <b>${arr.official}</b>
        </p>
      </li>`
    }).join('');
    refs.list.insertAdjacentHTML('beforeend', markup)
};

function createCardMarkup(country) {
    const markup = country.map(arr => {
       return `<p class="country-name">
          <span class="country-flag">
            <img src="${arr.flags.svg}" width="30px" height="20px">
          </span> <b>${arr.official}</b>
        </p>
        <p><b>Capital:</b>${arr.capital}</p>
      <p><b>Population:</b>${arr.population}</p>
      <p><b>Languages:</b>${Object.values(arr.languages)}</p>`
    }).join('');
    refs.info.insertAdjacentHTML('beforeend', markup)
};