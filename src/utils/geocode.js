const request=require('request')

const geocode= (address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2VzaGF2azc4NCIsImEiOiJja2JrcnAwNmMxMjAwMnJvNXZ0djQ3NW1mIn0.b8GF6HHdHuK4db1eXaODWA&limit=1'
    request({url,json:true},(error,{body})=>{
      if(error){
          callback('unable to connect to location service',undefined)
      }else if(body.features.length===0){
        callback('unable to find loation,try another search',undefined)
      }else{
          callback(undefined,{
           latitude:body.features[0].center[1],
           longitude:body.features[0].center[0],
           location:body.features[0].place_name
          })
      }
    }) 
}
module.exports=geocode