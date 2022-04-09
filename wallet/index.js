const {INITIAL_BALANCE} = require('../config')
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
    //criando assinaturas para cada transação
    //dataHash será criado sobre algum dado de interesse baseado nas caracteristas da transação 
    //(similar a do bloco)
    sign(dataHash){
        return this.keyPair.sign(dataHash)
    }

    //criptografia eliptica
}

module.exports = Wallet