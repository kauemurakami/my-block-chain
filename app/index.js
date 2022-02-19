const express = require('express')
//class blockhain
const Blockchain = require('../blockchain')
//caso nao especifique no terminal, rodará na porta 3001
const HTTP_PORT = process.env.HTTP_PORT || 3001
// $ HTTP_PORT = 3002 npm run dev

const app = express()

const bc = new Blockchain()


