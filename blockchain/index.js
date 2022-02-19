const Block = require('./block')

//BLOCKCHAIN CLASS
class Blockchain{
    constructor(){
        this.chain = [Block.genesis()]
    }

  

    addBlock(data){
        //const lastBlock = this.chain[this.chain.length - 1]
        const block = Block.mineblock(this.chain[this.chain.length - 1], data)
        this.chain.push(block)
        return block
    }
    isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false
        console.log('!= block genesis ok')

        for (let i = 1; i < chain.length; i++) {
          const block = chain[i];
          const lastBlock = chain[i-1];
          if (
            block.lastHash !== lastBlock.hash ||
            block.hash !== Block.blockHash(block)
          ) {
            console.log('equals a previous block')
            return false
          }
        }
        console.log('block valid')
        return true
      }

    replaceChain(newChain){
        if(newChain.length <= this.chain.length ){
            console.log('receive chain is not longer than the current chain')
            return false
        }else if(this.isValidChain(newChain)){
            console.log('The received chain is not valid')
            return false
        }
        console.log('replace blockchain with the new chain')
        this.chain = newChain
        return true
    }





}

module.exports = Blockchain