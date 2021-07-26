import path from 'path' // has path and __dirname
import express from 'express'
import oauthServer from '../oauth/server'

import DebugControl from '../utilities/debug'


const router = express.Router() // Instantiate a new router

const filePath = path.join(__dirname, '../public/oauthAuthenticate.html')

router.get('/', (req,res) => {  // send back a simple form for the oauth
  res.sendFile(filePath)
})


router.post('/authorize', (req: { body: { [x: string]: any; user?: any; username?: any; password?: any } },res: { redirect: (arg0: string) => void },next: () => void) => {
  DebugControl.log.flow('Initial User Authentication')
  const {username, password} = req.body
  if(username === 'username' && password === 'password') {
    req.body.user = {user: 1}
    return next()
  }
  const params = [ // Send params back down
    'client_id',
    'redirect_uri',
    'response_type',
    'grant_type',
    'state',
  ]
    .map(a => `${a}=${req.body[a]}`)
    .join('&')
  return res.redirect(`/oauth?success=false&${params}`)
}, (req: any,res: any, next: () => void) => { // sends us to our redirect with an authorization code in our url
  DebugControl.log.flow('Authorization')
  return next()
}, oauthServer.authorize({
  authenticateHandler: {
    handle: (req: { body: { [x: string]: any; user?: any } }) => {
      DebugControl.log.functionName('Authenticate Handler')
      DebugControl.log.parameters(Object.keys(req.body).map(k => ({name: k, value: req.body[k]})))
      return req.body.user
    }
  }
}))

router.post('/token', (req: any,res: any,next: () => void) => {
  DebugControl.log.flow('Token')
  next()
},oauthServer.token({
  requireClientAuthentication: { // whether client needs to provide client_secret for specific grants
    // 'authorization_code': false,
  },
}))  // Sends back token

export default router;