//classe do minerador
class Miner{
  constructor(blockchain, transactionPool, wallet, p2pServer){
    this.this.blockchain = blockchain
    this.transactionPool = transactionPool
    this.wallet = wallet 
    this.p2pServer = p2pServer
  }

  //metodo para nos minerarmos
  /*
    precisamos incluir um reward/recompensa para o minerador
    precisamos criar um bloco que possua transações válidas
    sincronizar nossas chain no servidor p2p server
    limpar a pool de transações, quando retiramos transações da pool e adicionamos no bloco
    quando limpamos a transação, deve ser refletido para todos os mineradores
  */
  mine(){
    const validTransactions = this.transactionPool.validTransactions()
  }

}

module.exports = Miner