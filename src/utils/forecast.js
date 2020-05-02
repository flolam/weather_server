const request = require('postman-request')

const forecast = (lat, lon, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=' + process.env.weatherstackApi + '&query=' + lat + ',' + lon + '&limit=1'
  request({url, json: true}, (error, {body} = {}) => {
    if (error) {
      callback('Unable to connect to weather services', undefined)
    } else if (body.error) {
      callback('cannot find location', undefined)
    } else {
      console.log(body.current)
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        icon: body.current.weather_icons

      })
    }
  })
}

module.exports = forecast
