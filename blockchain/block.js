const SHA256 = require('crypto-js/sha256')
let nonce = crypto.randomBytes(16).toString('base64');
class Block{
    constructor(timestamp, lastHash, hash, data){
        this.timestamp = timestamp
        this.hash = hash
        this.lastHash = lastHash
        this.data = data
        this.nonce = nonce
    }



    toString(){
        return `Block = 
            timestamp = ${this.timestamp},
            last Hash = ${this.lastHash },
            hash = ${this.hash},
            nonce = ${nonce},
            data = ${this.data},
        `
    // last Hash = last ${this.lastHash.substring(0, 10) },
    // hash = ${this.hash.substring(0, 10)},
    }
 
    //primeiro bloco
    static genesis(){
        return new this(
            'Genesis time',
            '------------------',
            'FHUSDIOHFSDUOFFWQFQW',[], 0)
    }


    static mineblock(lastBlock,data){
        let nonce = 0
        let hash, timestamp
        const lastHash = lastBlock.hash
        do{
            nonce++
            const timestamp = Date.now()
             hash =this.hash(timestamp, lastHash, data, nonce)
        }while( ){

        }
        
        return new this(timestamp, lastHash,hash,data)
    }

    //sha 256
    static hash(timestamp, lastHash, data, nonce){
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString()
    }

    static blockHash(block) {
        const { timestamp, lastHash, data, nonce } = block
      return Block.hash(timestamp, lastHash, data, nonce)
    }

    
}

module.exports = Block