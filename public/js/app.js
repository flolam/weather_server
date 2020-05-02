const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
const weatherIcon = document.querySelector('#weatherIcon')
//const weatherIcon = document.getElementById('image_X');


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  messageOne.textContent = 'Loading..'
  messageTwo.textContent = ''
  weatherIcon.classList.add('d-none')
  fetch('/weather?adress=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error

      } else {
        weatherIcon.classList.remove('d-none')
        weatherIcon.src = data.forecastData.icon
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecastData.description + ' ' + data.forecastData.temperature + ' C°'
      }
    })
  })
})
