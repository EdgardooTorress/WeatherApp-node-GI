const request = require('request') // import the request library
const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=296424da665a003ef673b8155a52513a&query='+ latitude + ',' + longitude + '&units=f'

    request({url, json:true},(error, {body})=>{ 
        if(error){// if there is a low level eror (no internet)
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){ // if API returns an error 
            callback('Unable to find location', undefined)

        }else{// if everything works correctly 
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + '. It feels like ' + body.current.feelslike + " degrees out. There is " + body.current.precip +'% chance of rain' )
        }

    })

}// export the forecast file function so other files can use
module.exports = forecast