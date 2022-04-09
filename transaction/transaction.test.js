const Transaction  = require('./index.js')
const Wallet = require('../wallet')

//verifica se o saldo do remetente teve a quantia subtraida antes e depois da transação
describe('Transaction', ()=>{
  let transaction, wallet, recipient, amount

  beforeEach(()=>{
    wallet = new Wallet()
    amount = 50
    recipient = 'BL0CKCH41N'
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

  it('validates a validy transaction', ()=>{
    expect(Transaction.verifyTransaction(transaction)).toBe(true)
  })

  it('invalidates a corrupt transaction', ()=>{
    //5000 pois nosso balanço inicial é 500
    transaction.outputs[0].amount = 50000
    expect(Transaction.verifyTransaction(transaction)).toBe(false)
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

  describe('upating a transaction', ()=>{
    let nextAmount, nextRecipient
    beforeEach(()=> {
      nextAmount = 20
      nextRecipient = 'nextBL0CKCH41N',
      transaction = transaction.update(wallet, nextRecipient, nextAmount)
    })
    it('subtracts the next amount from the sender output', ()=> {
      expect(transaction.outputs.find(output => output.address == wallet.publicKey).amount).toEqual(wallet.balance - amount - nextAmount)
    })

    it('outputs an amount for the next recipient', ()=> {
      expect(transaction.outputs.find(output => output.address == nextRecipient).amount).toEqual(nextAmount)
    })
  })

})



