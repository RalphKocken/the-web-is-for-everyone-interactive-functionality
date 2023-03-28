import express from 'express'
import indexRoute from './routes/index.js'
import plantpageRoute from './routes/plantpage.js'
const server = express()

// Stel het poortnummer in
server.set('port', process.env.PORT || 8000)

// Stel de view engine in
server.set('view engine', 'ejs')
server.set('views', './views')

// Stel de public map in
server.use(express.static('public'))

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use('/', indexRoute)
server.use('/plantpage', plantpageRoute)
  
// server.get('/aanmelden', function (request, response) {
//   response.render('stekje-aanmelden')
// })
// server.get('/registreren', function (request, response) {
//   response.render('stekje-registreren')
// })

// Start met luisteren
server.listen(server.get('port'), () => {
  console.log(`Application started on http://localhost:${server.get('port')}`)
})