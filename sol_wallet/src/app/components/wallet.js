"use client";

import { useState } from "react";
import * as web3 from "@solana/web3.js";

export default function Wallet() {
  const [keypair, setKeypair] = useState(null);
  const [balance, setBalance] = useState(null);

  const generateKeypair = async () => {
    const newKeypair = web3.Keypair.generate();
    setKeypair(newKeypair);

    // Connect to Solana Devnet
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
    const pubKey = new web3.PublicKey(newKeypair.publicKey);
    const bal = await connection.getBalance(pubKey);
    setBalance(bal / web3.LAMPORTS_PER_SOL);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Solana Wallet</h1>
      <button
        onClick={generateKeypair}
        className="bg-green-700 px-4 py-2 rounded-lg text-white mb-4"
      >
        Generate Keypair
      </button>

      {keypair && (
        <div className="text-center">
          <p className="mb-2">
            <strong>Public Key:</strong> {keypair.publicKey.toBase58()}
          </p>
          <p>
            <strong>Balance:</strong> {balance} SOL
          </p>
        </div>
      )}
    </div>
  );
}
