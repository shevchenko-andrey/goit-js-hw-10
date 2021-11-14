const BASE_URL = 'https://restcountries.com/v2/name/';
const FILTER_SETTINGS = '?fields=name,capital,population,flags,languages';
export default class FetchCountries {
  constructor() {
    this.searchQuery = '';
  }

  fetchCards() {
    const url = `${BASE_URL}${this.searchQuery}${FILTER_SETTINGS}`;

    return fetch(url).then(response => {
      console.log(response);
      console.log('!response.ok', !response.ok);
      if (!response.ok) {
        return Promise.reject('Oops, there is no country with that name');
      }
      return response.json();
    });
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
