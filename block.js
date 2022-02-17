const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(timestamp, lastHash, hash, data){
        this.timestamp = timestamp
        this.hash = hash
        this.lastHash = lastHash
        this.data = data
    }



    toString(){
        return `Block = 
            timestamp = ${this.timestamp},
            last Hash = ${this.lastHash },
            hash = ${this.hash},
            data = ${this.data},
        `
    // last Hash = last ${this.lastHash.substring(0, 10) },
    // hash = ${this.hash.substring(0, 10)},
    }
 
    //primeiro bloco
    static genesis(){
        return new this(
            `Genesis time',
            '------------------',
            'FHUSDIOHFSDUOFFWQFQW'`,[])
    }


    static mineblock(lastBlock,data){
        const timestamp = Date.now()
        const lastHash = lastBlock.hash
        const hash = 'a-fazer-hash-aqui'

        return new this(timestamp, lastHash,hash,data)
    }

    //sha 256
    static hash(timestamp, lastHash, data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString()
    }

    static blockHash(block) {
        const { timestamp, lastHash, data } = block
      return Block.hash(timestamp, lastHash, data)
    }

    
}

module.exports = Block