import {Keypair, PublicKey} from '@solana/web3.js';

const owenKeyPair = Keypair.generate();
console.log(owenKeyPair.secretKey.toString());
const pk = new PublicKey(owenKeyPair.publicKey);
