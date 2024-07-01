"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const fs = __importStar(require("fs"));
const secret = JSON.parse(fs.readFileSync('secret.json').toString());
const secretKey = Uint8Array.from(secret);
const ownerKeyPair = web3_js_1.Keypair.fromSecretKey(secretKey);
console.log(ownerKeyPair.publicKey.toBase58());
const transaction = new web3_js_1.Transaction(); // Making a tansaction many instruction can be added to it
const receipient = new web3_js_1.PublicKey("4bCtf9EMjHUFUs8hoyka2Jq2DazpNs18ikqcYNzDozaK");
const sendSolInstruction = web3_js_1.SystemProgram.transfer({
    fromPubkey: ownerKeyPair.publicKey,
    toPubkey: receipient,
    lamports: web3_js_1.LAMPORTS_PER_SOL * 0.001
});
// Making an Instruction to transfer SOL and adding it in transaction
transaction.add(sendSolInstruction);
// const connection = new Connection("https://docs-demo.solana-mainnet.quiknode.pro");
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('testnet'));
const sendTransaction = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signature = yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [ownerKeyPair], {
            maxRetries: 5
        });
        console.log('Transaction successful with signature:', signature);
    }
    catch (error) {
        console.error('Failed to send transaction:', error);
    }
});
sendTransaction();
