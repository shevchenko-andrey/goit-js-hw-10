const BASE_URL = 'https://restcountries.com/v2/name/';
const FILTER_SETTINGS = '?fields=name,capital,population,flags,languages';
export function fetchArticles(country) {
  const url = `${BASE_URL}${country}${FILTER_SETTINGS}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw Error('Oops, there is no country with that name');
    }
    return response.json();
  });
}
