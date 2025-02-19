"use client";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { PublicKey, Connection } from "@solana/web3.js";
import { sendToken } from "@/utils/sendToken"; // Import sendToken function

export default function Home() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [tokenBalances, setTokenBalances] = useState<{ mint: string; amount: number }[]>([]);
  
  const recipientAddress = "RECIPIENT_WALLET_ADDRESS"; // Replace with the actual recipient wallet address
  const tokenAmount = 1; // Number of tokens to send

  // Fetch SOL Balance
  useEffect(() => {
    if (connected && publicKey) {
      connection
        .getBalance(publicKey)
        .then((bal) => setBalance(bal / 1e9)) // Convert lamports to SOL
        .catch((err) => console.error("Error fetching SOL balance:", err));
    }
  }, [connected, publicKey, connection]);

  // Fetch SPL Token Balances
  useEffect(() => {
    if (connected && publicKey) {
      connection
        .getParsedTokenAccountsByOwner(publicKey, {
          programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
        })
        .then((res) => {
          setTokenBalances(
            res.value.map((acc) => ({
              mint: acc.account.data.parsed.info.mint,
              amount: acc.account.data.parsed.info.tokenAmount.uiAmount,
            }))
          );
        })
        .catch((err) => console.error("Error fetching token balances:", err));
    }
  }, [connected, publicKey, connection]);

  // Handle Sending Token
  const handleSendToken = async () => {
    if (!publicKey) {
      alert("Connect your wallet first!");
      return;
    }

    try {
      const recipient = new PublicKey(recipientAddress); // Convert recipient to PublicKey
      const txSignature = await sendToken(connection, publicKey, recipient, tokenAmount);

      console.log("Transaction Signature:", txSignature);
      alert(`Token Sent! Tx: ${txSignature}`);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Check console for details.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">Token Wallet</h1>
      <WalletMultiButton />

      {connected && publicKey && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-800">
          <p>Wallet Address: {publicKey.toBase58()}</p>
          <p>SOL Balance: {balance !== null ? balance.toFixed(4) : "Loading..."}</p>
        </div>
      )}

      {connected && tokenBalances.length > 0 && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-800">
          <h2 className="text-lg font-semibold">Token Balances</h2>
          {tokenBalances.map((token, index) => (
            <p key={index}>
              Mint: {token.mint} - Balance: {token.amount}
            </p>
          ))}
        </div>
      )}

      {/* Send Token Button */}
      {connected && (
        <button
          onClick={handleSendToken}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Send Token
        </button>
      )}
    </div>
  );
}
