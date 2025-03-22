'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  evt.preventDefault();

  fetch('/fortune') 
    .then((response) => response.text())
    .then((serverData) => {
      // console.log(`${serverData}`)
      document.querySelector('#fortune-text').innerHTML = serverData
    });
  
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;

  // TODO: request weather with that URL and show the forecast in #weather-info
  const queryString = new URLSearchParams({ zipcode: `${zipcode}` }).toString();

  const queryUrl = `${url}?${queryString}`
  // console.log(`${queryUrl}`)

  fetch(queryUrl)
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log(`${responseJson['forecast']}`)
      document.querySelector('#weather-info').innerHTML = 
      responseJson['forecast']
    });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  }

  // console.log(`${formInputs['melon_type']}`)
  // console.log(`${formInputs['qty']}`)

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })

    .then((response) => response.json())
    .then((responseJson) => {
      const status = document.querySelector('#order-status');
      // status.innerHTML = ''
      if (responseJson['code'] === 'ERROR') {
        status.classList.add('order-error');
        status.innerHTML = responseJson['msg'];
      }
      else {
        status.innerHTML = responseJson['msg'];
      }
      // console.log(`${responseJson['msg']}`)
      // console.log(`${responseJson['code']}`)
    });
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);



function showDogImage(evt) {
  // Show image of dog from another website
  evt.preventDefault()

  fetch('https://dog.ceo/api/breeds/image/random')
    .then((response) => response.json())
    .then((responseJson) => {
      const dogImage = document.querySelector('#dog-image')
      dogImage.insertAdjacentHTML('beforeend', 
        `<div><img src=${responseJson.message}></div`)
    })

}

document.querySelector('#get-dog-image').addEventListener('click', showDogImage);