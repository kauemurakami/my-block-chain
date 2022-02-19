const Blockchain = require('./index')
const Block = require('./block')
describe('Blockchain', ()=>{
   
    let bc;
    let bc2;
    beforeEach(()=> {
        bc = new Blockchain // uma instance para cada teste
        bc2 = new Blockchain // uma instance para cada teste
    })

    it('starts with genesis block',() => {

        expect(bc.chain[0]).toEqual(Block.genesis())
    })

    it('adds a new block',() => {
        const data = 'file.pdf'
        bc.addBlock(data)

        expect(bc.chain[bc.chain.length - 1].data).toEqual(data)
    })

    // it('validate as valid chain', ()=> {
    //     bc2.addBlock('500U$D');
    //     expect(bc.isValidChain(bc2.chain)).toBe(true)
    // })

    it('invalidates a chain with a corrupt genesis block', () => {
        bc2.chain[0].data = 'Bad data';

      expect(bc.isValidChain(bc2.chain)).toBe(false);
    });
    
    it('invalidates a corrupt chain', () => {
      bc2.addBlock('200USD');
      bc2.chain[1].data = '0USD';

      expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('replace the chain with a valid chain', ()=> {
        bc2.addBlock('600USD')
        bc.replaceChain(bc2.chain)

        expect(bc.chain).toEqual(bc2.chain)
    })

    it('does not replace the chain with one of less or equal length', ()=> {
        bc.addBlock('300USD')
        bc.replaceChain(bc2.chain)

        expect(bc.chain).not.toEqual(bc2.chain)
    })
})