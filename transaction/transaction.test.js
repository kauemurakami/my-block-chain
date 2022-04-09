const Transaction  = require('./index.js')
const Wallet = require('../wallet')

//verifica se o saldo do remetente teve a quantia subtraida antes e depois da transação
describe('Transaction', ()=>{
  let transaction, wallet, recipient, amount

  beforeEach(()=>{
    wallet = new Wallet()
    amount = 50
    recipient = 'd21nd128d21d0n421xFFF'
    transaction = Transaction.newTransaction(wallet, recipient,amount)
  })
  it('output the `amount` subtracted from the wallet balance', ()=> {
    expect(transaction.outputs.find(output => output.address == wallet.publicKey).amount).toEqual(wallet.balance - amount)
  })
  it('outputs `amount` added to the recipient', ()=> {
    expect(transaction.outputs.find(output => output.address == recipient).amount).toEqual(amount)
  })

  it('input the balance of the wallet',()=>{
    expect(transaction.input.amount).toEqual(wallet.balance)
  })

  describe('transacting with an amount exceeds the balance', ()=> {
    beforeEach(()=> {
      amount = 50000
      transaction = Transaction.newTransaction(wallet, recipient, amount)
    })
    it('does not create the transaction', ()=> {
      expect(transaction).toEqual(undefined)
    })
  })

})



