console.log('client side javascript');
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const locationMessage = document.querySelector("#location");
const forecastMessage = document.querySelector("#forecast");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    locationMessage.textContent = 'Loading..';
    forecastMessage.textContent = '';

    const address = searchElement.value;
    const url = '/weather?address=' + address;

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                locationMessage.textContent = data.error;
            }
            else {
                // console.log(data.location)
                // console.log(data.forecast)
                locationMessage.textContent = data.location;
                forecastMessage.textContent = data.forecast;
            }
        })
    })
})