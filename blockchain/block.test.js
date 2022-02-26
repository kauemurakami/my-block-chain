const Block = require('./block')
// const {DIFFICULTY} = require('../config')


describe('Block', ()=>{
    let data,lastBlock,block
    beforeEach(()=> {
        data = 'index.html'
        lastBlock = Block.genesis() 
        block = Block.mineblock(lastBlock, data)
    })

    it('sets the `data` to match the input', () => {
        expect(block.data).toEqual(data)
    })

    it('sets the `lastHash` to match the hash of the las Black', ()=>{
        expect(block.lastHash).toEqual(lastBlock.hash)
    })

    it( 'generates a hash that matches the difficulty', () => {
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty)) 
    })

    // esperar que a dificuldade seja decrementada para uma geração lenta de blocos
    it( 'lowers the difficulty for slowly mine blocks', () => {
        expect(Block.adjustDifficulty(block, block.timestamp + 360000)).toEqual(block.difficulty - 1)  //timestamp + 1h para forçar o decremento da dificuldade
    })

    //erro
    // esperar incrementar a dificuldade para uma inserção de blocos muito rapida
    // it( 'raises the difficulty for quickly mined blocks', () => {
    //     expect(Block.adjustDifficulty(block, block.timestamp + 1)).toEqual(block.difficulty + 1 ) //add +1 millisecond
    // })
})