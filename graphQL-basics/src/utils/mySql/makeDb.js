const { mySqlConnectionSpecs } = require('../../config')
const { dissoc } = require('ramda')
const connection = require('./connect')

const newSpecs = dissoc('database',mySqlConnectionSpecs)

const createDb =  connection(newSpecs).promise().query(`CREATE DATABASE ${mySqlConnectionSpecs}`)

