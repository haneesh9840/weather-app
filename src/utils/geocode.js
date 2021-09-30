const request = require('request')
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGFiYmlydWhhbmVlc2giLCJhIjoiY2t1MnB2MTh2M3g2ZTJ1bnE1bTNib2JjeiJ9.Jh3CAApPqjh7-zI2GaZtJQ&limit=1'
    request({ url: url, json: true }, (error, response) => {
        if (error)
            callback("Internet connectivity Issues", undefined)
        else if (response.body.features.length == 0)
            callback("unable to find the location", undefined)
        else
            callback(undefined, {
                latitude: response.body.features[0].geometry.coordinates[1],
                longitude: response.body.features[0].geometry.coordinates[0],
                location: response.body.features[0].place_name
            })
    })
}
module.exports = geocode