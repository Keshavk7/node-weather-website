const request=require('request');

const forecast=(latitude,longitude,callback)=>{
const url='http://api.weatherstack.com/current?access_key=a408b653173b20cc6ffd84d21f038258&query='+latitude+','+longitude+'&units=f'
//request({url:url,json:true},(error,response)=>{ //Destructuring response in below line and writing single url
    request({url,json:true},(error,{body})=>{  //Destructuring 
  if(error){
      callback('unable to connect to location service',undefined)
  //}else if(response.body.error){
    }else if(body.error){
      callback('unable to find loaction',undefined)
  }/*else{
      callback(undefined,response.body.current.weather_descriptions[0]+'. it is currently '+response.body.current.temperature+ " degrees out. It feels like "+response.body.current.feelslike+" degrees out")
  }*/
  else{
    callback(undefined,body.current.weather_descriptions[0]+'. it is currently '+body.current.temperature+ " degrees out. It feels like "+body.current.feelslike+" degrees out")
}
})
}
module.exports=forecast                              