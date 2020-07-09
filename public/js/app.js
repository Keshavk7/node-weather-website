console.log('client side javascript file is loaded')

/*fetch('http://puzzle.mead.io/puzzle').then((response)=>{
   response.json().then((data)=>{
  console.log(data)
  })
  
})*/

/*fetch('http://localhost:3000/weather?address=patna').then((response)=>{
  response.json().then((data)=>{
      if(data.error){
          console.log(data.error)
      }else{
          console.log(data.location)
          console.log(data.forecast)
      }
  })
})*/

const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const mssg1= document.querySelector("#mssg-1")
//mssg1.textContent="From javascript" or mssg1.innerHTML="From javascript" both give same result
const mssg2=document.querySelector("#mssg-2")

weatherform.addEventListener('submit',(e)=>
{
    e.preventDefault()
    const location=search.value

    mssg1.textContent="Loading..."
    mssg2.textContent=""

    fetch('http://localhost:3000/weather?address='+ location).then((response)=>{
  response.json().then((data)=>{
      if(data.error){
          mssg1.textContent=data.error
          //console.log(data.error)
      }else{
          mssg1.textContent=data.location
          mssg2.textContent=data.forecast
          //console.log(data.location)
          //console.log(data.forecast)
      }
  })
})
    
})