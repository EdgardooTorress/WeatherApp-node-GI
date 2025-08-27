const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) +'&access_token=pk.eyJ1IjoiZWp0Zjk5IiwiYSI6ImNtZXB0N2VzaDBqMTMybHExdjA5cW5xOW4ifQ.lUx4WgmhYVGIdTVTdEswng&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error){ // if there is a low level error
            callback('Unable to connect to location services', undefined)
        }else if (body.features.length === 0){ // if the API works but does not find any matching results
            callback('Unable to find location. Try another search', undefined)
        }else {// if everything works fine, return 
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].properties.full_address
            })
        }
    })
}
//export the geocode function so it can be used in other files
module.exports = geocode