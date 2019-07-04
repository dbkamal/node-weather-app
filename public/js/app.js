console.log('client side javascript');
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const locationMessage = document.querySelector("#location");
const forecastMessage = document.querySelector("#forecast");
const tempMessage = document.querySelector("#temp");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    locationMessage.textContent = 'Loading..';
    forecastMessage.textContent = '';
    tempMessage.textContent = '';

    const address = searchElement.value;
    const url = '/weather?address=' + address;

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationMessage.textContent = data.error;
            }
            else {
                locationMessage.textContent = data.location;
                forecastMessage.textContent = data.forecast;
                tempMessage.textContent = 'Highest Temp. ' + data.highTemp + ' Lowest Temp. ' + data.lowTemp;
            }
        })
    })
})