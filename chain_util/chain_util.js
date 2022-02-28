// metodos que vao criar hashs/chaves unicas 
//todos os dados de criptografia
//utils

const EC = require('elliptic').ec

// algoritmo de criptografia de curva eliptica
// modelo que o bitcoin utiliza
const ec = new EC('secp256k1') 

class ChainUtil {


    static genKeyPair(){
        return ec.genKeyPair()
    }

}

module.exports = ChainUtil