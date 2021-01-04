const request = require('axios')

const courseApi = (req, callback) => {
    console.log('==> req'+req.category)
    console.log(req)
    const url = 'https://devfull-educationhify.cs76.force.com/ip/services/apexrest/v1/coursesFind'
    const formData = {
        nationality:"Brazil",
        city:["Sydney","Melbourne"],
        batchsize:1
    }

    request.post(url, req).then( response => {
        console.log("==> response");
        // console.log(response.data)
        callback(undefined, response.data)
      })
      .catch(function (error) {
        console.log(error);
      });

    // request.post({url: url, formData: formData}, (error, body) => {
    //     if(error){
    //         callback('Unable to connect', undefined)
    //     }else if(body.error){
    //         callback('Unable to find location', undefined)
    //     }else{
    //         // callback(undefined, body.current.weather_descriptions[0] + ' It is currently. There is a '+ body.current.humidity + '% change of rain')
    //         console.log('Search API result')
    //         console.log('Upload successful!  Server responded with:', body);
    //         callback(undefined, JSON.stringify(body))
    //     }
    // })
}

module.exports = courseApi