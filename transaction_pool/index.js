class TransactionPool{
  constructor(){
    this.transactions = []
  }
  //update ou create transaction na pool de transações
  updateOrAddTransaction(transaction){
    let transactionWithId = this.transactions.find(t => t.id === transaction.id )

    if(transactionWithId){
      this.transactions[this.transactions.indexOf(transactionWithId)] = transaction
    }else {
      this.transactions.push(transaction)
    }
  }
  //verifica se a transação já existe na pool de transações
  existingTransaction(address){
    //caso exista retornará o objeto de transação, caso não exista retornará undefined
    return this.transactions.find(t => t.input.address === address)
  }
}

module.exports = TransactionPool