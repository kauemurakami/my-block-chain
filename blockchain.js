const Block = require('./block')

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
            console.log('igual ao block anterior ')
            return false
          }
        }
        console.log('block valido')
        return true
      }


}

module.exports = Blockchain