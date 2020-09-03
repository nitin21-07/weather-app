const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&APPID=8da806a2b6556586126a081312ad8e1d'
    
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to weather service',undefined)
        }
        else if(body.message){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,'Current Temperature is ' + parseInt(body.main.temp-273.15) +' degree. This high today is '+parseInt(body.main.temp_max-273.15)+' with low of '+ parseInt(body.main.temp_min-273.15)+'. Humidity '+body.main.humidity+'% and Wind speed is '+ parseInt(body.wind.speed*3.6)+'kmph')
            }
        })
}
module.exports=forecast