//import express en dotenv 
import express, { request } from 'express'

//maak een nieuwe express app
const server = express()

//public map gebruiken
server.use(express.static('public'))

//stel de views in
server.set('view engine', 'ejs')
server.set('views', './views')

// Stel afhandeling van formulieren in
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

//hier komen de routes

server.get('/', (request, response) => {
  const baseUrl = "https://api.buurtcampus-oost.fdnd.nl/api/v1"
  const stekjeUrl = baseUrl + '/stekjes'

  fetchJson(stekjeUrl).then((data) =>{
    response.render('index', data)
  })
})

// Detail pagina// 

server.get('/plantpage/:id', (request, response) => {
  const baseUrl = "https://api.buurtcampus-oost.fdnd.nl/api/v1"
  let id = request.params.id
  let stekjeUrl = baseUrl +'/stekjes?id='+ id
   fetchJson(stekjeUrl).then((data) => {
    response.render('plantpage', data)
     })
})

server.get('/new', (request, response) => {
  response.render('plantpageform')
})

server.post('/new', (request, response) => {
  const baseUrl = "https://api.buurtcampus-oost.fdnd.nl/api/v1"
  const url = baseUrl + '/stekjes'
  request.body.aanmelddatum = (new Date()).toISOString();
  postJson(url, request.body).then((data) => {
    let newStekje = { ... request.body }

    if (data.success) {
      response.redirect('/') 
      // TODO: squad meegeven, message meegeven
      // TODO: Toast meegeven aan de homepagina
    } 
    
    else {
      const errormessage = `${data.message}: Mogelijk komt dit door de slug die al bestaat.`
      const newdata = { error: errormessage, values: newStekje }
      console.log(data)
      console.log(JSON.stringify(data))
      response.render('plantpageform', newdata)
    }
  })
})

//poortnummer instellen
server.set('port', 8000)

//start de server
server.listen(server.get('port'), () => {
  console.log(`Application started on http://localhost:${server.get('port')}`)
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}

/**
 * postJson() is a wrapper for the experimental node fetch api. It fetches the url
 * passed as a parameter using the POST method and the value from the body paramater
 * as a payload. It returns the response body parsed through json.
 * @param {*} url the api endpoint to address
 * @param {*} body the payload to send along
 * @returns the json response from the api endpoint
 */
export async function postJson(url, body) {
  return await fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((error) => error)
}

