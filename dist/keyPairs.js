"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const owenKeyPair = web3_js_1.Keypair.generate();
console.log(owenKeyPair.secretKey.toString());
const pk = new web3_js_1.PublicKey(owenKeyPair.publicKey);
