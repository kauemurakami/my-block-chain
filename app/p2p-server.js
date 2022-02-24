const WebSocket = require('ws')

const P2P_PORT = process.env.P2P_PORT || 5001
// rodar setando as portas 
//$ HTTP_PORT = 3002 P2P_PORT = 5003 PEERS = ws://localhost:5001 npm run dev

//caso exista conexoes abertas vamos separa por , ou retornar um array vazio
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []

class P2PServer{
    constructor(blockchain){
        this.blockchain = blockchain,
        this.socket = [] // lista dos servidores websockets
    }

    listen(){
        const server = new WebSocket.Server({port: P2P_PORT})
        server.on('connection-ws', socket => this.connectSocket(socket)
        )
        this.connectToPeers()
        console.log(`Listening for peer-to-peer connections on : ${P2P_PORT} `)
    }

    connectSocket(socket){
        this.socket.push(socket)
        console.log(`socket connected, list sockets: ${this.socket}`)
        this.messageHandler(socket)
        this.sendChain(socket)
    }

    connectToPeers(){
        peers.forEach( peer =>{
            const socket = new WebSocket(peer)
            socket.on('open', () => this.connectSocket(socket)
            )}
        )
    }

    messageHandler(socket){
        socket.on('message', message => {
            const data = JSON.parse(message)
            this.blockchain.replaceChain(data)
        })
    }

    syncChain(){
        this.socket.forEach( socket => this.sendChain(socket))
    }
    sendChain(socket){
        socket.send(JSON.stringify(this.blockchain.chain))

    }
}

module.exports = P2PServer