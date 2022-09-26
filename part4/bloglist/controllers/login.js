/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('./../models/user')

// token creation / auth handling router

module.exports = loginRouter