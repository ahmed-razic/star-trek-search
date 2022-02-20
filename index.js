const API_ENDPOINT = 'http://stapi.co/api/v1/rest/';
const stRequest = new XMLHttpRequest();
let query = '';
let userInput = 'search';
let category = '';

//define const variables for DOM elements
const inputSelector = document.querySelector('#input');
const categorySelector = document.querySelector('#category');
const buttonSelector = document.querySelector('#button');
const buttonClearSelector = document.querySelector('#buttonClear');
const errorSelector = document.querySelector('#error');
const answerSelector = document.querySelector('#answer');

function showAnswer(response) {
  if (category === 'movie') category = 'movies';
  if (category === 'astronomicalObject') category = 'astronomicalObjects';
  if (category === 'character') category = 'characters';
  if (category === 'location') category = 'locations';
  if (category === 'movie') category = 'movies';
  if (category === 'season') category = 'seasons';
  if (category === 'spacecraft') category = 'spacecrafts';
  if (category === 'weapon') category = 'weapons';

  let myList = response[category];

  for (let i = 0; i < myList.length; i++) {
    let li = document.createElement('li');
    li.appendChild(
      category === 'movies' || category === 'seasons' || category === 'series'
        ? document.createTextNode(myList[i].title)
        : document.createTextNode(myList[i].name)
    );
    answerSelector.appendChild(li);
  }

  buttonSelector.setAttribute('disabled', 'disabled');
}

function showError(error) {
  errorSelector.innerHTML = error;
  errorSelector.style.visibility = 'visible';
  setTimeout(() => {
    errorSelector.style.visibility = 'hidden';
  }, 3000);
}

//Connect to API and get data
function getData() {
  query = API_ENDPOINT + category + '/' + userInput;

  stRequest.open('GET', query);
  stRequest.responseType = 'json';
  stRequest.onload = function () {
    showAnswer(stRequest.response);
  };

  stRequest.onerror = function () {
    showError('There was an error! Please select category.');
  };
  stRequest.send();
}

function clearData() {
  answerSelector.innerHTML = '';
  buttonSelector.removeAttribute('disabled');
}

//Begin search
category = categorySelector.addEventListener('click', e => (category = e.target.value));
//inputSelector.addEventListener('input', e => (userInput = e.target.value));

buttonSelector.addEventListener('click', getData);
buttonClearSelector.addEventListener('click', clearData);
