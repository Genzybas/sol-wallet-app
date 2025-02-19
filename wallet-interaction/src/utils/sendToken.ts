import {
    getAssociatedTokenAddress,
    getOrCreateAssociatedTokenAccount,
    transfer,
    TOKEN_PROGRAM_ID,
  } from "@solana/spl-token";
  import { PublicKey, Connection, Transaction, sendAndConfirmTransaction, Keypair } from "@solana/web3.js";
  
  export async function sendToken(
    connection: Connection,
    fromKeypair: Keypair, 
    toPublicKey: PublicKey,
    amount: number
  ) {
    const mint = new PublicKey("YOUR_TOKEN_MINT_ADDRESS"); // Change to your token mint address
  
    // Get or create associated token accounts
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      fromKeypair,
      mint,
      fromKeypair.publicKey
    );
  
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      fromKeypair,
      mint,
      toPublicKey
    );
  
    const transaction = new Transaction().add(
      transfer(
        TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromKeypair.publicKey,
        [],
        amount * 10 ** 9
      )
    );
  
    return await sendAndConfirmTransaction(connection, transaction, [fromKeypair]); 
  }
  