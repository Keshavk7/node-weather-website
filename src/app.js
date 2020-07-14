const path=require('path')
const express=require('express')
const port= process.env.PORT||3000

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../public'))

/*if we keep folder name views inside our web-server folder,express will automatically look into
that to render hbs(handlebars file),otherwise if we use any folder name other than views,(here,we 
are using templates)  we have to use these lines 1 and 2 to tell express*/  
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app=express()


//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')//we have to use this lines 1 to tell express
const partialsPath=path.join(__dirname,'../templates/partials')//if we use dis,we have to require hbs in beginning

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath) //we have to use this lines 2 to tell express to use templates instead views
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



/*app.get('',(req,res)=>{
    res.send("<h1>Hello there</h1>")
})*/ //It will never be used as we have set index.html in public directory 

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Keshav kumar'
    })
})

app.get('/about',(req,res)=>{
    res.render("about",{
        title:'About Krishna',
        name:'Keshav kumar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        title:'Help',
        name:'Keshav'
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address)
     return res.send({
         error:'Please provide the address'
     })
  
     geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
       if(error){
           return res.send({error})
       }
       forecast(latitude,longitude,(error,forecastData) =>{
           if(error){
               return res.send({error})
           }
           res.send({
               forecast:forecastData,
               location,
               address:req.query.address
           })
       })
     })




     //res.send({
     //    forecast:'It is snowing',
     //  location:'India',
    //address:req.query.address
    // })
})

app.get('/products',(req,res) =>{
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

app.get('/help/*',(req,res)=>{   //shows specific route help following any url it will return given message
    res.render('404',{
        title:'404',
        name:'Keshav kumar',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{ // * path shows default message to be displayed if none url matched with
                              //  the given route,it should be at end before app.listen 
    res.render('404',{
        title:'404',
        name:'Keshav kumar',
        errorMessage:'Page not found'
    })
})





app.listen(port,(req,res)=>{
    console.log("server started on port" + port)
})