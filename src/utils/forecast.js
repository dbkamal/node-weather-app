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
            callback(undefined, {
                temp: body.currently['temperature'],
                rain: body.currently['precipProbability'],
                weather: body.daily.summary
            });
        }
    })
}

module.exports = forecast