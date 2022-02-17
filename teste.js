const Block = require('./block.js')

const block = new Block('2348','31232131233123','42143253565235','100')
//block acima
console.log(block.toString())
//bloco genesis 
console.log(Block.genesis().toString())


const blockGenesis = Block.mineblock(Block.genesis(), '$500')
console.log(blockGenesis.toString)


