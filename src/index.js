import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import FetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const fetchCountries = new FetchCountries();
const searchBoxRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');
searchBoxRef.addEventListener('input', debounce(onCheckInput, DEBOUNCE_DELAY));
function onCheckInput(e) {
  const userInput = e.target.value.trim();
  clearMarkup();
  if (userInput === '') {
    return;
  }
  fetchCountries.query = e.target.value.trim();
  fetchCountries.fetchCards().then(verificationData).catch(Notify.failure);
}
function verificationData(countries) {
  if (countries.length > 10) {
    return Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length >= 2 && countries.length <= 10) {
    return (countryListRef.innerHTML = countries.map(itemsMurcup).join(''));
  } else if (countries.length === 1) {
    return cardMurcup(...countries);
  } else {
    Notify.failure('Oops, there is no country with that name');
  }
}
function itemsMurcup({ name, flags }) {
  return `
<li class="country_item">
   <img class="country_flag" src="${flags.svg}" height="40px" width="50px" alt="flag ${name.official}}">
   <p>${name}</p>
</li>
`;
}

function cardMurcup({ name, capital, population, flags, languages }) {
  return (countryListRef.innerHTML = `
  <div class="image-wrapper"><img src=${
    flags.svg
  } alt=flags ${name} width="50px" class='card-img' />
  <h2 class='card-title'>${name}</h2></div>
    <ul>
      <li card__item>Population: ${population}</li>
      <li card__item>Languages: 
      ${languages.map(parseLanguages).join(', ')}
      ${capital ? `<li card__item>Capital: ${capital}</li>` : ''}
    </ul>
    `);
}
function clearMarkup() {
  countryListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
}
function parseLanguages({ name }) {
  return `${name}`;
}
