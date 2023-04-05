import * as dotenv from 'dotenv'  
import express from 'express'

import { fetchJson } from '../helpers/fetchWrapper.js'  //fetchJsonfunctie importeren uit andere map.
import { postJson } from '../helpers/fetchWrapper.js'   //postJsonfunctie importeren uit ander map.

dotenv.config()

const index = express.Router()

index.get('/', (request, response) => {            
    const baseUrl = "https://api.buurtcampus-oost.fdnd.nl/api/v1"   // de basis url als cpnstante
    const stekjeUrl = baseUrl + '/stekjes?'                         // het endpoint uit de api waaruit ik de stekjes fetch
    
fetchJson(stekjeUrl).then((data) =>{
      let renderData = {  //object die meegestuurd wordt bij het renderen van de homepage
        stekjes: data.stekjes, // dit is de data uit de stekjes API
        posted: request.query.posted // get als ?posted=true#plant-list als parameter wordt meegestuurd, 
      }
      response.render('index', renderData) // render de homepagina: 'index', en het object 'renderData'. 
    })
  })
  

//dit is   
index.get('/plantform', (request, response) => {  
  response.render('plantpageform')
})

index.post('/plantform', (request, response) => {
  const baseUrl = "https://api.buurtcampus-oost.fdnd.nl/api/v1"  // de basis url als constante
  const url = baseUrl + '/stekjes'                               // het endpoint uit de api waarop ik nieuwe stekjes post
  request.body.createdAt = (new Date()).toISOString();           // een request naa  r de huidige datum.tijd
  postJson(url, request.body).then((data) => {                   // posten naar het endpoint        
    let newStekje = { ... request.body }                         // newStekje gelijk zetten aan de body(inhoud) van een stekje
    if (data.success) {                                          // .. als de data succesvol gepost is =>
      response.redirect('/?posted=true#plant-list-container')    // redirect dan naar de homepage en geef "posted" mee in de url.
    }

    else {
      const errormessage = `${data.message}: Er is iets mis gegaan` // als de data niet succesvol gepost is geef dan deze error
      const newdata = { error: errormessage, values: newStekje }  
      console.log(data)
      console.log(JSON.stringify(data))
      response.render('plantpageform', newdata) // laat opnieuw het formulier zien met de ingevulde waardes
    }
  })
})  

export default index
