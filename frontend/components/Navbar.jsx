'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useBitcoinAccount } from '@mezo-org/passport';
import { useAccount } from 'wagmi';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [btcAddress, setBtcAddress] = useState(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        const account = useAccount();
        const bitcoin = useBitcoinAccount();
        setIsConnected(account?.isConnected || false);
        setBtcAddress(bitcoin?.btcAddress || null);
      } catch (error) {
        console.error('Error initializing wallet hooks:', error);
      }
    }
  }, [mounted]);
  
  // Don't render connection-dependent content during SSR
  if (!mounted) {
    return (
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-bitcoin-orange text-2xl font-bold">₿</span>
              <Link href="/" className="text-xl font-bold">
                Bitcoin NFT Minter
              </Link>
            </div>
            <div className="hidden md:flex space-x-6 items-center">
              <Link href="/" className="hover:text-bitcoin-orange transition-colors">
                Home
              </Link>
              <Link href="/mint" className="hover:text-bitcoin-orange transition-colors">
                Mint NFT
              </Link>
              <Link href="/gallery" className="hover:text-bitcoin-orange transition-colors">
                Gallery
              </Link>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-200 rounded-md px-4 py-2">Connect Wallet</div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Client-side render with full functionality
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-bitcoin-orange text-2xl font-bold">₿</span>
            <Link href="/" className="text-xl font-bold">
              Bitcoin NFT Minter
            </Link>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="hover:text-bitcoin-orange transition-colors">
              Home
            </Link>
            <Link href="/mint" className="hover:text-bitcoin-orange transition-colors">
              Mint NFT
            </Link>
            <Link href="/gallery" className="hover:text-bitcoin-orange transition-colors">
              Gallery
            </Link>
            {isConnected && (
              <Link href="/my-nfts" className="hover:text-bitcoin-orange transition-colors">
                My NFTs
              </Link>
            )}
          </div>
          <div className="flex items-center">
            <ConnectButton label="Connect Wallet" />
          </div>
        </div>
        {isConnected && btcAddress && (
          <div className="mt-2 text-sm text-gray-600 text-right">
            <span>Connected: {btcAddress.substring(0, 6)}...{btcAddress.substring(btcAddress.length - 4)}</span>
          </div>
        )}
      </div>
    </nav>
  );
}