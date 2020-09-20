const request = require('postman-request')

const courseApi = (tes, callback) => {
    const url = 'http://devfull-educationhify.cs114.force.com/ip/services/apexrest/v1/coursesFind?nationality=Brazil&numUnitsSearch=12&country=Australia&field=Business&courseCity=Brisbane'

    request({url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            // callback(undefined, body.current.weather_descriptions[0] + ' It is currently. There is a '+ body.current.humidity + '% change of rain')
            console.log('Search API result')
            callback(undefined, body)
        }
    })
}

module.exports = courseApi