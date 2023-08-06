import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

Notiflix.Notify.init({
  timeout: 3333,
  position: 'center-center',
  width: '333px',
  fontSize: '16px',
  cssAnimationStyle: 'from-left',
});

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

const errorMsg = 'Oops! Something went wrong! Try reloading the page!';

selectEl.addEventListener('change', catInfoShow);

fetchBreeds().then(breeds => {
  renderSelect(breeds);
  selectEl.classList.remove('is-hidden');
  loaderEl.classList.add('is-hidden');
}).catch(() => {
  loaderEl.classList.add('is-hidden');
  Notiflix.Notify.failure(errorMsg);
});

function renderSelect(breeds) {
  const markup = breeds.map(({ name, id }) => {
    return `<option value ='${id}'>${name}</option>`;
  }).join();

  selectEl.innerHTML = markup;

  new SlimSelect({
    select: selectEl,
  })
}

function catInfoShow(evt) {
  catInfoEl.computedStyleMap.opacity = 0.2;
  loaderEl.classList.remove('is-hidden');
  const breedId = evt.currentTarget.value;
  fetchCatByBreed(breedId).then(breeds => {
    catInfoEl.style.opacity = 1;
    markupCardCats(breeds);
    loaderEl.classList.add('is-hidden');
  }).catch(() => {
    loaderEl.classList.add('is-hidden');
    Notiflix.Notify.failure(errorMsg);
})
}

function markupCardCats(breeds) {
    const markup = breeds.map(({ url, breeds: [{ name, temperament, description}], }) => {
        return `<img class='cat-info__img' src='${url}' alt='cat ${name}' width='460px'><div class="cat-info__box">
        <h2 class="cat-info__tittle">${name}</h2>
        <p class="cat-info__description">${description}</p>
        <p class="cat-info__temperament"><span class="cat__subtitle">Temperament:</span> ${temperament}</p>
      </div>`}).join();
    catInfoEl.innerHTML = markup;
}
