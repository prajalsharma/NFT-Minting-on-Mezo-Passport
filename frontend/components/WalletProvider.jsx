'use client';
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

// Create a client for React Query
const queryClient = new QueryClient();

// Default wagmi config - will be replaced after initialization
const defaultWagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

export default function WalletProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  const [wagmiConfig, setWagmiConfig] = useState(defaultWagmiConfig);
  const [mezoChain, setMezoChain] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Import and initialize on client-side only
    const initWallet = async () => {
      try {
        // Dynamic imports to avoid server-side window references
        const { getConfig, mezoMatsnetTestnet, unisatWallet } = await import('@mezo-org/passport');
        
        // Configure bitcoin wallets
        const customBitcoinWallets = [
          {
            groupName: "Bitcoin wallets",
            wallets: [unisatWallet],
          },
        ];
        
        // Configure Mezo Passport
        const mezoConfig = getConfig({
          appName: "Bitcoin NFT Minting dApp",
          bitcoinWallets: customBitcoinWallets,
        });
        
        setWagmiConfig(mezoConfig);
        setMezoChain(mezoMatsnetTestnet);
        setMounted(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to initialize wallet:", error);
        setIsLoading(false);
      }
    };
    
    initWallet();
  }, []);

  // Don't render anything until client-side hydration is complete
  if (!mounted || isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-pulse text-lg">Loading wallet configuration...</div>
    </div>;
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={mezoChain ? [mezoChain] : []}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}