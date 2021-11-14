import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import { fetchArticles } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBoxRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
searchBoxRef.addEventListener('input', debounce(onCheckInput, DEBOUNCE_DELAY));
function onCheckInput(e) {
  const userInput = e.target.value.trim();
  if (userInput === '') {
    return;
  }
  fetchArticles(userInput)
    .then(verificationData)
    .catch(Notify.failure('Oops, there is no country with that name'));
}
function verificationData(countries) {
  if (countries.length > 10) {
    return Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length <= 10) {
    return (countryListRef.innerHTML = countries.map(itemsMurcup).join(''));
  } else {
    return cardMurcup(countries);
  }
}
function itemsMurcup({ name, flags }) {
  return `
<li class="country_item">
   <img src="${flags.svg}" width="100px" alt="flag ${name.official}}">
   <p>${name}</p>
</li>
`;
}

function cardMurcup(name, capital, population, flags, languages) {
  return (countryListRef.innerHTML = `<article class='card animate__animated animate__fadeInUp' style="width: 18rem">
  <img src='${flags.svg}' alt='flags ${name.official}' width="100px" class='card-img' />
  <div class=''>
    <h2 class='card-title'>${name.official}}</h2>
    <ul class=''>
      <li class='list-group-item'>Population: ${population}</li>
      <li class='list-group-item'>Languages: 
      ${languages}
      <li class='list-group-item'>Capital: ${capital}</li>
    </ul>
  </div>`);
}
