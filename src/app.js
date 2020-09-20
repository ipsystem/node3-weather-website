const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Elbert Leite'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Elbert Leite'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You most provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error: error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            console.log(forecastData)
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
  
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You most provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})



app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a help text',
        title: 'Help',
        name: 'Elbert Leite'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Elbert Leite',
        errorMessage: 'Help Article not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Elbert Leite',
        errorMessage: 'Page not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is app on port 3000.')
})

//nodemon src/app.js
//nodemon src/app.js -e js,hbs