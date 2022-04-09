//transação de carteira <-> carteira
const ChainUtil = require('../chain_util')
class Transaction{

  constructor(){
    this.id = ChainUtil.id()
    this. input = null
    this.outputs = []
  }
  /*
    > sendWallet = objeto carteira do remetente, 
    vamos utilizar campos importantes como endereço da carteira e balance (saldo)
    > recipient= endereço da carteira que irá receber a transação
    > amount = quantia que será enviada do sender -> recipient
  */
  static newTransaction(senderWallet, recipient, amount){
    const transaction = new this()
    if(senderWallet.balance < amount){
      console.log(`
      Amount: ${amount} exceeds balance`)
      return
    }

    transaction.outputs.push(...[{ amount: senderWallet.balance - amount, 
      address: senderWallet.publicKey},
      {amount, address: recipient}
    ])
    return transaction
  }

}