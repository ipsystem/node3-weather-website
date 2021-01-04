const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const courseApi = require('./utils/courseApi')
const coursesFilterApi = require('./utils/coursesFilterApi')
const bodyParser = require('body-parser');


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000

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

app.get('/courses', (req, res) => {
    res.render('courses', {
        title: 'Search',
        name: 'Elbert Leite'
    })
})

app.get('/searchFilters', (req, res) => {

    res.render('searchFilters', {
        title: 'Show Filter Options',
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

app.post('/searchCourses', (req, res) => {

   
    console.log('==> body3:' + req.body)
    console.log(req.body.category)
    courseApi(req.body, (error, response) => {
        if(error){
            return res.send({error: error})
        }
        console.log(response)
        res.send(response)
       
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

app.get('/helpfilter', (req, res) => {
    coursesFilterApi(undefined, (error, response) => {
        if(error){
            return res.send({error: error})
        }
        // console.log('===>response')
        // console.log(response)
        res.send(response)
       
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

app.listen(port, () => {
    console.log('Server is app on port '+ port)
})

//nodemon src/app.js
//nodemon src/app.js -e js,hbs