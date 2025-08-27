const request = require('request') // import the request function


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) +'&access_token=pk.eyJ1IjoiZWp0Zjk5IiwiYSI6ImNtZXB0N2VzaDBqMTMybHExdjA5cW5xOW4ifQ.lUx4WgmhYVGIdTVTdEswng&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error){ // low levels error
            callback('Unable to connect to location services', undefined)
        }else if (body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        }else {
            callback(undefined, { // if eveything goew well get that information from the API
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].properties.full_address
            })
        }
    })
}

module.exports = geocode // export geocode to be use in other files