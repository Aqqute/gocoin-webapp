import React, { useState } from "react";
import Modal from "../PopupModal";
import Button from "../Button";
import toast from "react-hot-toast";
import { Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

const PUMP_FUN_VAULT = "2Kr7Whxn5UE28tEqSxJJNQkrVFnVFS5VKf51XMhJpump"; // TODO: Replace with your actual vault address
const TOKEN_MINT = "2Kr7Whxn5UE28tEqSxJJNQkrVFnVFS5VKf51XMhJpump"; // TODO: Replace with your token mint address

const BuyTokenModal = ({ isOpen, onClose, phantomAddress }) => {
  const [amount, setAmount] = useState(0.01);
  const [loading, setLoading] = useState(false);
  const [tx, setTx] = useState(null);

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
      const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/5dkOE0g3IiQEDQ2H7o4NE");
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
      const { signature } = await provider.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signature);
      setTx(signature);
      toast.success("SOL sent to pump.fun vault! Token will be distributed by pump.fun");
    } catch (e) {
      toast.error(e.message || "Transaction failed");
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
      </div>
    </Modal>
  );
};

export default BuyTokenModal;
