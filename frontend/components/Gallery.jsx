'use client';

import { useState, useEffect } from 'react';
import NFTCard from './NFTCard';
import { nftApi } from '../lib/api';
import { NFT_CATEGORIES } from '../lib/constants';

export default function Gallery() {
  const [nfts, setNfts] = useState([]);
  const [filteredNfts, setFilteredNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Fetch all NFTs
  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true);
        const data = await nftApi.getAllNFTs();
        setNfts(data);
        setFilteredNfts(data);
      } catch (err) {
        console.error('Failed to fetch NFTs:', err);
        setError('Failed to load NFTs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  // Filter NFTs by category
  const filterNFTs = (category) => {
    setActiveFilter(category);
    if (category === 'All') {
      setFilteredNfts(nfts);
    } else {
      setFilteredNfts(nfts.filter((nft) => nft.category === category));
    }
  };

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
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">NFT Gallery</h2>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => filterNFTs('All')}
            className={`px-4 py-2 rounded-full text-sm ${
              activeFilter === 'All'
                ? 'bg-bitcoin-orange text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          
          {NFT_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => filterNFTs(category)}
              className={`px-4 py-2 rounded-full text-sm ${
                activeFilter === category
                  ? 'bg-bitcoin-orange text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {filteredNfts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No NFTs found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNfts.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
