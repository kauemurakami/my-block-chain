const transactionPool = require('./')
const Transaction = require('../transaction/')
const Wallet = require('../wallet/')
const TransactionPool = require('./')
describe('TransactionPool ',()=> {
  let transactionPool, wallet, transaction

  beforeEach(() => {
    transactionPool = new TransactionPool()
    wallet = new Wallet()
    transaction = Transaction.newTransaction(wallet, 'r@nd0m-@ddr3ss', 30 )
    transactionPool.updateOrAddTransaction(transaction)
  })

  it('adds a transaction to the pool', ()=> {
    expect(transactionPool.transactions.find( t => t.id === transaction.id)).toEqual(transaction)
  })

  it('updates a transaction in the pool', ()=> {
    const oldTransaction = JSON.stringify(transaction)
    const newTransaction = transaction.update(wallet, 'n3xt-r3c1p13nt', 50)
    transactionPool.updateOrAddTransaction(newTransaction)
    expect(JSON.stringify(transactionPool.transactions.find(t => t.id === newTransaction ))).not.toEqual(oldTransaction)

  })

})