const {INITIAL_BALANCE} = require('../config')
const chainUntil = require('../chain_util')
const ChainUtil = require('../chain_util/chain_util')
class Wallet {
    constructor(){
        this.balance = INITIAL_BALANCE,
        this.keyPair = ChainUtil.genKeyPair()
        this.publicKey = this.keyPair.getPublic().encode('hex')
    }


    toString(){
        return `
            Wallet - 
            publicKey: ${this.publicKey.toString()}
            balance: ${this.balance}
        `
    }

    //criptografia eliptica
}

module.exports = Wallet