const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const { hidden } = require('chalk')
const viewpath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')
app.use(express.static(path.join(__dirname, '../public')))
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port=process.env.PORT||3000
    //setup handlers and views
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)



app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'sanfransisco'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'weather',
        name: 'hd'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'weather',
        name: 'hd',
        message: 'ayyayo vodhama pakane tea kottu pettanu'
    })
})

// app.get("", (req, res) => {
//     res.send("<html><h1>weather</h1></html>")

// })

app.get("/weather", (req, res) => {
    if (!req.query.address)
        return res.send({
            error: "address must be specified"
        })
    const address = req.query.address
    geocode(address, (error, data) => {
            if (error)
                return res.send({ error })
            forecast(data.latitude, data.longitude, (error, forecastdata) => {
                if (error)
                    return res.send({ error })
                return res.send({
                    forecast: forecastdata,
                    location: data.location,
                    address
                })
            })
        })
        // 
        // res.send({
        //     forecast: "rainy",
        //     location: val,
        //     address: val
        // })

})
app.get("/help/*", (req, res) => {
    res.render('404', {
        message: "help not specified",
        name: "hd"
    })
})
app.get("*", (req, res) => {
    res.render('404', {
        name: "hd",
        message: "Page NOt found"
    })
})
app.listen(port, () => {
    console.log("RUnning!")
        //console.log(__dirname, __filename)
})
