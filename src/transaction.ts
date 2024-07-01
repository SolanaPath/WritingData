import {
    Keypair,
    SystemProgram,
    Transaction,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl,
    Connection, sendAndConfirmTransaction
} from "@solana/web3.js";
import * as fs from "fs";

const secret = JSON.parse(fs.readFileSync('secret.json').toString()) as number[];
const secretKey = Uint8Array.from(secret);
const ownerKeyPair = Keypair.fromSecretKey(secretKey);

console.log(ownerKeyPair.publicKey.toBase58());

const transaction = new Transaction(); // Making a tansaction many instruction can be added to it
const receipient = new PublicKey("4bCtf9EMjHUFUs8hoyka2Jq2DazpNs18ikqcYNzDozaK");

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: ownerKeyPair.publicKey,
    toPubkey: receipient,
    lamports: LAMPORTS_PER_SOL * 0.001
})
// Making an Instruction to transfer SOL and adding it in transaction

transaction.add(sendSolInstruction);
// const connection = new Connection("https://docs-demo.solana-mainnet.quiknode.pro");
const connection = new Connection(clusterApiUrl('testnet'));


const sendTransaction = async () => {
    try {
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [ownerKeyPair],
            {
                maxRetries: 5
            }
        );
        console.log('Transaction successful with signature:', signature);
    } catch (error) {
        console.error('Failed to send transaction:', error);
    }
};

sendTransaction();

