const geocode=require('./util/geocode')
const forecast=require('./util/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicdirectorypath=path.join(__dirname,'../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

// Setup static directory to serve
app.use(express.static(publicdirectorypath))


app.get('',(req, res)=>{
    res.render('index',{
        title:'weather',
        name:'Nitin'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Nitin'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'This is help desk',
        title:'help',
        name:'Nitin'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }= {} ) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Abhishek Bhardwaj',
        errormessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'abhishek',
        errormessage:'Page not found.'
    })
})

//start up the server
app.listen(port, ()=>{
    console.log('Server is up on port '+port)
    
})