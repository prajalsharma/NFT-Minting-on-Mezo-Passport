"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { NFT_CATEGORIES, MINT_COST_SATS } from '../lib/constants';

export default function MintForm() {
  const [mounted, setMounted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    category: "",
  });

  // Add state for bitcoin account data
  const [btcAddress, setBtcAddress] = useState(null);
  const [sendBitcoin, setSendBitcoin] = useState(null);

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mintedNFT, setMintedNFT] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dynamically import the bitcoin hooks on the client side
  useEffect(() => {
    const loadBitcoinHooks = async () => {
      if (!mounted) return;

      try {
        const { useBitcoinAccount, useSendBitcoin } = await import(
          "@mezo-org/passport"
        );
        
        // Initialize bitcoin account data
        const accountData = useBitcoinAccount();
        const sendBitcoinData = useSendBitcoin();
        setBtcAddress(accountData?.btcAddress);
        setSendBitcoin(sendBitcoinData?.sendBitcoin);
      } catch (err) {
        console.error("Failed to load Bitcoin hooks:", err);
        setError(
          "Failed to load Bitcoin wallet integration. Please refresh and try again."
        );
      }
    };

    loadBitcoinHooks();
  }, [mounted]);

  // Initialize wagmi account
  useEffect(() => {
    if (!mounted) return;

    try {
      const account = useAccount();
      setIsConnected(account?.isConnected || false);
    } catch (err) {
      console.error("Failed to initialize wagmi account:", err);
    }
  }, [mounted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset states
    setError("");
    setSuccess("");
    setMintedNFT(null);

    // Validate form
    if (
      !formData.name ||
      !formData.description ||
      !formData.imageUrl ||
      !formData.category
    ) {
      setError("Please fill out all fields");
      return;
    }

    if (!isConnected || !btcAddress || !sendBitcoin) {
      setError("Please connect your wallet first");
      return;
    }

    try {
      // Use the stored bitcoin data instead of calling hooks
      // Continue with your minting logic
      // ...
    } catch (err) {
      console.error("Minting error:", err);
      setError(err.message || "Failed to mint NFT. Please try again.");
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="mb-4">Please connect your Bitcoin wallet to mint NFTs.</p>
      </div>
    );
  }

  
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Mint a New Bitcoin NFT</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {mintedNFT && (
        <div className="card mb-6">
          <h3 className="text-xl font-bold mb-2">Your New NFT</h3>
          <div className="flex items-center">
            <div className="w-24 h-24 bg-gray-200 rounded overflow-hidden mr-4">
              <img
                src={mintedNFT.imageUrl}
                alt={mintedNFT.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold">{mintedNFT.name}</p>
              <p className="text-sm text-gray-600 truncate">
                {mintedNFT.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">ID: {mintedNFT.id}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            NFT Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter a name for your NFT"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field min-h-[100px]"
            placeholder="Describe your NFT"
            required
          />
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter a direct link to your image"
            required
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select a category</option>
            {NFT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? "Minting..." : `Mint NFT (${MINT_COST_SATS} sats)`}
          </button>
          <p className="text-sm text-gray-500 mt-2 text-center">
            NFT will be minted after Bitcoin transaction is confirmed.
          </p>
        </div>
      </form>
    </div>
  );
}
