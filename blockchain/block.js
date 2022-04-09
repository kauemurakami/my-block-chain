// const SHA256 = require('crypto-js/sha256')
const ChainUtil = require('../chain_util/chain_util')
const crypto = require('crypto')
let nonce = crypto.randomBytes(16).toString('base64');
const {DIFFICULTY, MINE_RATE} = require('../config')

class Block{
    constructor(timestamp, lastHash, hash, data, nonce, difficulty){
        this.timestamp = timestamp
        this.hash = hash
        this.lastHash = lastHash
        this.data = data
        this.nonce = nonce
        this.difficulty = difficulty || DIFFICULTY
    }



    toString(){
        return `Block = 
            timestamp = ${this.timestamp},
            last Hash = ${this.lastHash },
            hash = ${this.hash},
            nonce = ${nonce},
            difficulty = ${this.difficulty},
            data = ${this.data},
        `
    }
 
    //primeiro bloco / bloco genesis
    static genesis(){
        return new this(
            'Genesis time',
            '------------------',
            'FHUSDIOHFSDUOFFWQFQW',[], 0, DIFFICULTY)
    }


    static mineblock(lastBlock,data){
        let nonce = 0
        let hash, timestamp
        const lastHash = lastBlock.hash
        let {difficulty} = lastBlock
        do{
            nonce++
            const timestamp = Date.now()
            difficulty = Block.adjustDifficulty(lastBlock, timestamp)
             hash = this.hash(timestamp, lastHash, data, nonce, difficulty)
        }while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));
        
        return new this(timestamp, lastHash, hash, data, nonce, difficulty)
    }
    //ajuste dinamico de dificuldado baseado no ultimo bloco
    static adjustDifficulty(lastblock, currentTime){
        let difficulty = lastblock.difficulty || DIFFICULTY
        difficulty = lastblock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1
        return difficulty
    }

    //sha 256
    static hash(timestamp, lastHash, data, nonce, difficulty){
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString()
    }

    static blockHash(block) {
        const { timestamp, lastHash, data, nonce, difficulty } = block
      return Block.hash(timestamp, lastHash, data, nonce, difficulty)
    }

    
}


module.exports = Block