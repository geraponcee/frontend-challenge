"use strict";

const Restify = require('restify')
const rjwt = require('restify-jwt-community');
const jwt = require('jsonwebtoken');
const config = require('./config');
const user = require('./lib/user');
const err = require('restify-errors')
const server = Restify.createServer()

const corsMiddleware = require('restify-cors-middleware')
const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['Authorization'],
  exposeHeaders: ['Authorization']
})

server.pre(cors.preflight)
server.use(cors.actual)

server.use(Restify.plugins.queryParser())
server.use(Restify.plugins.bodyParser({ mapParams: false }))

server.use(rjwt(config.jwt).unless({
    path: ['/auth']
}));

server.get('/user', (req, res, next) => {
    res.send(req.user);
});

server.post('/auth', (req, res, next) => {
    let { username, password } = req.body;
    user.authenticate(username, password).then(data => {
        let token = jwt.sign(data, config.jwt.secret, {
            expiresIn: '15m'
        });

        let {iat, exp} = jwt.decode(token);
        res.send({iat, exp, token});
    }).catch(() => {
        return next(new err.UnauthorizedError('Invalid Credentials'))
    })
});


const url = '/api/members'
const members = [
  {
    firstName: 'Cosme',
    lastName: 'Fulanito',
    address: '742 Evergreen Terrance',
    ssn: '333-22-4444'
  }
]


function validString (item) {
  return typeof item === 'string' && item.trim().length > 1
}

server.get(url, (req, res) => {
  res.send(members)
})

server.post(url, (req, res, next) => {
  const body = req.body || {}
  const firstName = body.firstName || ''
  const lastName = body.lastName || ''
  const address = body.address || ''
  const ssn = body.ssn || ''
  if (!validString(firstName) || !validString(lastName) || !validString(address)) {
    return next(new err.BadRequestError('Invalid first name, last name or address'))
  }
  const regex = /^\d{3}-\d{2}-\d{4}$/
  if (regex.test(ssn) === false) {
    return next(new err.BadRequestError('Invalid SSN'))
  }

  const p = members.findIndex((m) => m.ssn === ssn)
  if (p !== -1) {
    return next(new err.BadRequestError('Duplicate SSN'))
  }  

  const item = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    address: address.trim(),
    ssn
  }

  members.push(item)
  res.send(item, 201)
})

server.listen(8081, () => {
  console.log('%s listening at %s', server.name, server.url);
})
