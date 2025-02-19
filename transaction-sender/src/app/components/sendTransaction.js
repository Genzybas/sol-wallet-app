"use client";

import { useState } from "react";
import * as web3 from "@solana/web3.js";
import bs58 from "bs58";

export default function SendTransaction() {
  const [senderSecret, setSenderSecret] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");

  const handleTransaction = async () => {
    setError("");
    setTxHash(null);

    try {
      if (!senderSecret || !receiver || !amount) {
        setError("Please fill in all fields.");
        return;
      }

      const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

      // Decode secret key
      const senderKeypair = web3.Keypair.fromSecretKey(bs58.decode(senderSecret));
      const senderPubKey = senderKeypair.publicKey;
      const receiverPubKey = new web3.PublicKey(receiver);
      const lamports = web3.LAMPORTS_PER_SOL * parseFloat(amount);

      // Check sender balance
      const senderBalance = await connection.getBalance(senderPubKey);
      if (senderBalance < lamports) {
        setError("Insufficient balance.");
        return;
      }

      // Create transaction
      const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
          fromPubkey: senderPubKey,
          toPubkey: receiverPubKey,
          lamports,
        })
      );

      // Sign and send transaction
      const signature = await web3.sendAndConfirmTransaction(connection, transaction, [senderKeypair]);
      setTxHash(signature);

      // Update balance
      const newBalance = await connection.getBalance(senderPubKey);
      setBalance(newBalance / web3.LAMPORTS_PER_SOL);
    } catch (err) {
      setError("Transaction failed. Check the keys and try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Send SOL</h1>

      <input
        type="text"
        placeholder="Sender Secret Key (Base58)"
        value={senderSecret}
        onChange={(e) => setSenderSecret(e.target.value)}
        className="p-2 mb-2 w-[250px] max-w-md bg-gray-800 rounded"
      />
      
      <input
        type="text"
        placeholder="Receiver Public Key"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        className="p-2 mb-2 w-full max-w-md bg-gray-800 rounded"
      />
      
      <input
        type="number"
        placeholder="Amount (SOL)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 mb-2 w-full max-w-md bg-gray-800 rounded"
      />

      <button
        onClick={handleTransaction}
        className="bg-green-700 px-4 py-2 rounded-lg text-white mt-3"
      >
        Send SOL
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {txHash && (
        <div className="mt-4">
          <p>✅ Transaction Successful!</p>
          <p>
            <strong>Tx Hash:</strong>{" "}
            <a
              href={`https://explorer.solana.com/tx/${txHash}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300"
            >
              View on Solana Explorer
            </a>
          </p>
          <p><strong>New Balance:</strong> {balance} SOL</p>
        </div>
      )}
    </div>
  );
}
