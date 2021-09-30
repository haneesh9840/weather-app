const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=2c21125a2a8d4d67ed18b08d4642928f&query=" + latitude + "," + longitude + "&units=f"
    request({ url: url, json: true }, (error, response) => {
        if (error)
            callback("No internet connectivity!", undefined)

        else if (response.body.error)
            callback("Unable to find the Location!", undefined)
        else
            callback(undefined, "Currently the temperature is " + response.body.current.temperature + ". and there is " + response.body.current.precip + "% chance of rain and it feels like " + response.body.current.weather_descriptions[0])

    })

}
module.exports = forecast