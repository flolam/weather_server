const path = require('path')
require('dotenv').config()
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT

app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '../views/partials',))
app.use(express.static(path.join(__dirname, '../public',)))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.adress) {
    return res.send({
      error: "You must provide an adress"
    })
  }
  geocode(req.query.adress, (error, {lat, lon, location} = {}) => {
    if (error) {
      return res.send({
        error
      })
    } else {
      forecast(lat, lon, (error, forecastData) => {
        if (error) {
          return res.send({
            error
          })
        } else {
          res.send({
            adress: req.query.adress,
            location,
            forecastData
          })
        }
      })
    }
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help'
  })
})

app.get('/about', (req, res) => {
  res.render('help', {
    title: 'About'
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('Server is up on port '+ port)
})

