const request = require('request');

const geoLocation = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + 
    '.json?access_token=pk.eyJ1IjoiZGJrYW1hbCIsImEiOiJjanhiaWJldjEwNjRxNDNzM3hwMm1nY2hzIn0.XfeHIj6oKrQwGFxYhNzWng';

    request({url, json: true}, (error, { body }) => {
        
        if (error) {
            callback('No data found', undefined);
        }
        else if (body.features.length == 0) {
            callback('Unable to find location, try search another location', undefined);
        }
        else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geoLocation