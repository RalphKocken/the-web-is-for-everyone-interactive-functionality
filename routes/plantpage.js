import * as dotenv from 'dotenv'
import express from 'express'
import { fetchJson } from '../helpers/fetchWrapper.js'

dotenv.config()

const plantpage = express.Router()

plantpage.get('/:id', (request, response) => {
    const baseUrl = "https://api.buurtcampus-oost.fdnd.nl/api/v1"
    let id = request.params.id
    let stekjeUrl = baseUrl +'/stekjes?id='+ id
     fetchJson(stekjeUrl).then((data) => {
      response.render('plantpage', data)
       })
    })

export default plantpage