import { fetchBreeds, fetchCatByBreed } from './js/cat-api'
const errorMsg = 'Oops! Something went wrong! Try reloading the page!'

function markupCardCats(breeds) {
    const markup = breeds.map(({ url, breeds: [{ name, temperament, description, wikipedia_url }], }) => {
        return `img class='cat-info__cat-img' src='${url} alt='cat ${name}' width='460px'><div class="cat-info__text-box">
        <h2 class="cat-info__tittle">${name}</h2>
        <p class="cat-info__description">${description}</p>
        <p class="cat-info__temperament"><span class="temperament__header">Temperament:</span> ${temperament}</p>
      </div>`}).join();
    catInfoEl.innerHTML = markup;
}
