const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoLocation = require('./utils/geoLocation');
const forecast = require('./utils/forecast');

const app = express()

// define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewDirPath)
hbs.registerPartials(partialsDirPath)

// setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'John'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me!',
        name: 'John'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'John'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Provide address search string'
        })
    }

    const address = req.query.address;

    // ES6 modification: apply object destructuring on data object
    geoLocation(address, (error, { location, longitude, latitude } = {}) => {
        if (error) {
            res.send({
                error: error
            })
        }
        else {
            forecast(latitude, longitude, (error, { temp, rain, weather }) => {
                if (error) {
                    res.send({
                        error: error
                    })
                }
                else {
                    res.send({
                        location: location,
                        temp: temp,
                        rain: rain,
                        forecast: weather
                    })
                }
            })
        }
    })
})

// error page - use wildcard
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help doc not found',
        name: 'John'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'John'
    })
})

app.listen(3000, () => {
    console.log('nodejs server is running..')
})