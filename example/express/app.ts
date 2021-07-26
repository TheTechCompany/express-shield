import express from 'express'

const app = express()
const port = 3030
import bodyParser from 'body-parser'
import oauthServer from './oauth/server'

import DebugControl from './utilities/debug'

import client from './routes/client'
import auth from './routes/auth'
import secure from './routes/secure'

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(DebugControl.log.request())

app.use('/client', client) // Client routes
app.use('/oauth', auth) // routes to access the auth stuff
// Note that the next router uses middleware. That protects all routes within this middleware
app.use('/secure', (req: any,res: any,next: () => void) => {
  DebugControl.log.flow('Authentication')
  return next()
}, oauthServer.authenticate(), secure) // routes to access the protected stuff
app.use('/', (req,res) => res.redirect('/client'))


app.listen(port)
console.log("Oauth Server listening on port ", port)
