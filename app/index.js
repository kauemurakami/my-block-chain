const express = require('express')
//class blockhain
const Blockchain = require('../blockchain')
//caso nao especifique no terminal, rodará na porta 3001
const HTTP_PORT = process.env.HTTP_PORT || 3001
// $ HTTP_PORT = 3002 npm run dev
const P2PServer = require('./p2p-server')
//pool de transações 
const TransactionPool = require('../transaction_pool')
//wallet
const Wallet = require('../wallet')

const app = express()
//transactions pool
const tp = new TransactionPool()
//wallet 
const wallet = new Wallet()
//bc
const blockchain = new Blockchain()
const p2pServer = new P2PServer(blockchain, tp)

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

app.get('/transactions', (req, res)=> {
    res.json(tp.transactions)
})

app.post('/transaction', (req, res)=> {
    const {recipient, amount} = req.body
    const transaction = wallet.createTransaction(recipient, amount, tp)
    p2pServer.broadcastTransaction(transaction)
    res.redirect('/transactions')
})

app.get('/public-key', (req,res)=>{
    res.json({
        publicKey : wallet.publicKey
    })
})
app.listen(HTTP_PORT, ()=> console.log(`api started on port ${HTTP_PORT}`))
p2pServer.listen()
