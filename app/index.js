const express = require('express')
//class blockhain
const Blockchain = require('../blockchain')
//caso nao especifique no terminal, rodará na porta 3001
const HTTP_PORT = process.env.HTTP_PORT || 3001
// $ HTTP_PORT = 3002 npm run dev
const P2PServer = require('./p2p-server')

const app = express()

//bc
const blockchain = new Blockchain()
const p2pServer = new P2PServer(blockchain)

app.use(express.json())

app.post('/mine', (req, res)=>{
    const block = blockchain.addBlock(req.body.data)
    console.log(`new block add: ${block.toString()}`)
    p2pServer.syncChain()
    res.redirect('/blocks')
})

app.get('/blocks', (req, res)=> {
    res.json(blockchain.chain)
},)

app.listen(HTTP_PORT, ()=> console.log(`api started on port ${HTTP_PORT}`))
p2pServer.listen()
