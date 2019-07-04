const request = require('request');

const forecast = (latitude, longitude, callback) => {
    
    const url = 'https://api.darksky.net/forecast/f77884dfae9f2d3fe90037235942c9b6/' + latitude + ',' + longitude;
    
    request({url, json: true}, (error, { body }) => {

        if (error) {
            callback('No data found', undefined);
        }
        else if (body.error) {
            callback('Unable to find weather', undefined);
        }
        else {
            console.log(body.daily.data[0]);
            callback(undefined, {
                temp: body.currently['temperature'],
                rain: body.currently['precipProbability'],
                weather: body.daily.summary,
                highTemp: body.daily.data[0].temperatureMax,
                lowTemp: body.daily.data[0].temperatureMin
            });
        }
    })
}

module.exports = forecast