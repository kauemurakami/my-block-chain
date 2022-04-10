const {INITIAL_BALANCE} = require('../config')
const ChainUtil = require('../chain_util/chain_util')
const Transaction = require('../transaction')

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

    createTransaction(recipient, amount, transactionPool){
      if(amount > this.balance){
        console.log(`Amount: ${amount} exceeds current balance: ${this.balance}`)
        return
      }
      let transaction = transactionPool.existingTransaction(this.publicKey)
      //se existe vamos atualizar
      if(transaction){
        transaction.update(this, recipient, amount)
      }else{
        //se não existe vamos adiciona-la
        transaction = Transaction.newTransaction(this, recipient, amount)
        transactionPool.updateOrAddTransaction(transaction)
      }
      return transaction
    }
}

module.exports = Wallet