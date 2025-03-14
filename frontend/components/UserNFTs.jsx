'use client';

import { useState, useEffect } from 'react';
import { useBitcoinAccount } from '@mezo-org/passport';
import { useAccount } from 'wagmi';
import NFTCard from './NFTCard';
import { nftApi } from '../lib/api';

export default function UserNFTs() {
  const { isConnected } = useAccount();
  const { btcAddress } = useBitcoinAccount();
  
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch user NFTs when address changes
  useEffect(() => {
    const fetchUserNFTs = async () => {
      if (!isConnected || !btcAddress) return;
      
      try {
        setLoading(true);
        const data = await nftApi.getUserNFTs(btcAddress);
        setNfts(data);
      } catch (err) {
        console.error('Failed to fetch user NFTs:', err);
        setError('Failed to load your NFTs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserNFTs();
  }, [btcAddress, isConnected]);

  if (!isConnected) {
    return (
      <div className="text-center p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="mb-4">Please connect your Bitcoin wallet to view your NFTs.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bitcoin-orange"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My NFTs</h2>
      
      {nfts.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">You don't have any NFTs yet.</p>
          <a href="/mint" className="btn-primary inline-block">
            Mint Your First NFT
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <NFTCard key={nft.id} nft={nft} showOwner={false} />
          ))}
        </div>
      )}
    </div>
  );
}
