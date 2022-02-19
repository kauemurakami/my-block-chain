const express = require('express')
//class blockhain
const Blockchain = require('../blockchain')
//caso nao especifique no terminal, rodará na porta 3001
const HTTP_PORT = process.env.HTTP_PORT || 3001
// $ HTTP_PORT = 3002 npm run dev

const app = express()

const blockchain = new Blockchain()

app.use(express.json())

app.post('/mine', (req, res)=>{
    const block = blockchain.addBlock(req.body.data)
    console.log(`new block add: ${block.toString()}`)
    res.redirect('/blocks')
})

app.get('/blocks', (req, res)=> {
    res.json(blockchain.chain)
},)

app.listen(HTTP_PORT, ()=> console.log(`api started on port ${HTTP_PORT}`))

