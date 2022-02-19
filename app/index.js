const express = require('express')
//class blockhain
const Blockchain = require('../blockchain')
//caso nao especifique no terminal, rodará na porta 3001
const HTTP_PORT = process.env.HTTP_PORT || 3001
// $ HTTP_PORT = 3002 npm run dev

const app = express()

const blockchain = new Blockchain()

app.get('/blocks', (req, res)=> {
    res.json(blockchain.chain)
},)

app.listen(HTTP_PORT, ()=> console.log(`api started on port ${HTTP_PORT}`))
