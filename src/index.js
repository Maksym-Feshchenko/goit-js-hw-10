//import
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
import './css/styles.css';

//Const time delay
const DEBOUNCE_DELAY = 300;

//Search DOM
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

//More specific name
const renderCountriesList = (countries) => {
  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

//Search interface
  const markup = countries
    .map((country) => {
      return `
        <li>
          <img src="${country.flags.svg}" alt="flag" width="50">
          ${country.name}
        </li>
      `;
    })
    .join('');

  countryList.innerHTML = markup;
  countryInfo.innerHTML = '';
};

//Field filtering
const renderCountry = (country) => {
  const markup = `
    <h2>${country.name}</h2>
    <img src="${country.flags.svg}" alt="flag" width="200">
    <p><b>Capital:</b> ${country.capital}</p>
    <p><b>Population:</b> ${country.population}</p>
    <p><b>Languages:</b> ${country.languages[0].name}</p>
  `;

  countryInfo.innerHTML = markup;
  countryList.innerHTML = '';
};

//Time delay
const onSearch = debounce((event) => {
  const searchQuery = event.target.value.trim();

  if (searchQuery.length === 0) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(searchQuery)
    .then((countries) => {
      if (countries.length === 1) {
        renderCountry(countries[0]);
      } else {
        renderCountriesList(countries);
      }
    })
    .catch((error) => {
      Notiflix.Notify.failure('Oops, something went wrong...');
      console.log(error);
    });
}, DEBOUNCE_DELAY);

//Adding an "input" event to an HTML element
searchBox.addEventListener('input', onSearch);

