
import React, { useState, useEffect } from "react";
import Modal from "../PopupModal";
import Button from "../Button";
import toast from "react-hot-toast";
import { Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";

const PUMP_FUN_VAULT = "2Kr7Whxn5UE28tEqSxJJNQkrVFnVFS5VKf51XMhJpump"; // TODO: Replace with your actual vault address
const TOKEN_MINT = "2Kr7Whxn5UE28tEqSxJJNQkrVFnVFS5VKf51XMhJpump"; // TODO: Replace with your token mint address

const BuyTokenModal = ({ isOpen, onClose, phantomAddress }) => {
  const [amount, setAmount] = useState(0.01);
  const [loading, setLoading] = useState(false);
  const [tx, setTx] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);

  // Use Alchemy endpoint for all Solana operations
  const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/5dkOE0g3IiQEDQ2H7o4NE");

  // Fetch token balance
  const fetchBalance = async () => {
    if (!phantomAddress) return;
    try {
      const mintPubkey = new PublicKey(TOKEN_MINT);
      const ownerPubkey = new PublicKey(phantomAddress);
      // Derive the Associated Token Account (ATA)
      const ata = await getAssociatedTokenAddress(mintPubkey, ownerPubkey);
      // Get account info
      const accountInfo = await connection.getTokenAccountBalance(ata);
      setTokenBalance(accountInfo.value.uiAmount || 0);
    } catch (err) {
      console.error(err);
      setTokenBalance(0); // probably means no account exists yet
    }
  };

  useEffect(() => {
    if (phantomAddress) {
      fetchBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phantomAddress, tx]); // re-check balance after a buy transaction

  // Buy token logic
  const handleBuy = async () => {
    if (!window.solana || !window.solana.isPhantom) {
      toast.error("Phantom wallet not found");
      return;
    }
    if (!amount || amount <= 0) {
      toast.error("Enter a valid SOL amount");
      return;
    }
    setLoading(true);
    try {
      const provider = window.solana;
      const fromPubkey = provider.publicKey;
      const toPubkey = new PublicKey(PUMP_FUN_VAULT);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports: amount * 1e9,
        })
      );

      // Set recent blockhash and fee payer
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPubkey;

      // signAndSendTransaction can return a string or { signature }
      let result = await provider.signAndSendTransaction(transaction);
      let signature = typeof result === "string" ? result : result.signature;
      if (!signature) throw new Error("No transaction signature returned");

      await connection.confirmTransaction(signature);

      setTx(signature);
      toast.success("SOL sent to pump.fun vault! Token will be distributed.");
      await fetchBalance(); // refresh token balance
    } catch (e) {
      toast.error(e?.message || e?.toString() || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4 text-center">Buy Token from Pump.fun</h2>

        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">Amount (SOL)</label>
          <input
            type="number"
            min="0.001"
            step="0.001"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-full p-2 rounded border"
          />
        </div>

        <Button
          content={loading ? "Processing..." : "Buy Token"}
          onClick={handleBuy}
          disabled={loading}
        />

        {tx && (
          <div className="mt-3 text-xs text-green-600 break-all">
            Transaction: <a href={`https://solscan.io/tx/${tx}`} target="_blank" rel="noopener noreferrer">{tx}</a>
          </div>
        )}

        {tokenBalance !== null && (
          <div className="mt-3 text-sm text-blue-600">
            Your GoToken Balance: {tokenBalance}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BuyTokenModal;
