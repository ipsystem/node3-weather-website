const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=de00d6358959dd2d373ab5ac508e594e&query=' + latitude + ',' + longitude + '&unist=m'

    request({url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            // callback(undefined, body.current.weather_descriptions[0] + ' It is currently. There is a '+ body.current.humidity + '% change of rain')
            callback(undefined,
                 {
                    desc: body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degrees. Feels like '+ body.current.feelslike + ' It is now ' + body.location.localtime ,
                    icon: body.current.weather_icons[0]
                })
        }
    })
}

module.exports = forecast