import * as dotenv from 'dotenv'
import express from 'express'

import { fetchJson } from '../helpers/fetchWrapper.js'
import { postJson } from '../helpers/fetchWrapper.js'

dotenv.config()

const index = express.Router()

index.get('/', (request, response) => {
    const baseUrl = "https://api.buurtcampus-oost.fdnd.nl/api/v1"
    const stekjeUrl = baseUrl + '/stekjes?first=6'
    fetchJson(stekjeUrl).then((data) =>{
      response.render('index', {posted: request.query.posted})
    })
  })
  
index.get('/plantform', (request, response) => {
  response.render('plantpageform')
})

index.post('/plantform', (request, response) => {
  const baseUrl = "https://api.buurtcampus-oost.fdnd.nl/api/v1"
  const url = baseUrl + '/stekjes'
  request.body.createdAt = (new Date()).toISOString();
  postJson(url, request.body).then((data) => {
    let newStekje = { ... request.body }
    if (data.success) {
      response.redirect('/?posted=true')
    }
    
    else {
      const errormessage = `${data.message}: Er is iets mis gegaan`
      const newdata = { error: errormessage, values: newStekje }
      console.log(data)
      console.log(JSON.stringify(data))
      response.render('plantpageform', newdata)
    }
  })
})  

export default index
