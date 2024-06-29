import * as fs from "fs";
import {Keypair} from "@solana/web3.js";

const secret = JSON.parse(fs.readFileSync('secret.json').toString()) as number[];
const secretKey = Uint8Array.from(secret);
const ownerKeyPair = Keypair.fromSecretKey(secretKey);
const publicKey = ownerKeyPair.publicKey;
console.log(publicKey.toString());

// Public Keys are derived from the secret key