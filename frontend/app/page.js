import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Bitcoin NFT Minting dApp</h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Mint NFTs on Bitcoin using Mezo Passport and Unisat Wallet. 
          Pay with Bitcoin testnet sats and get your NFT minted instantly.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/mint" className="btn-primary">
            Mint an NFT
          </Link>
          <Link href="/gallery" className="btn-secondary">
            Browse Gallery
          </Link>
        </div>
      </section>
      
      <section className="py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-bitcoin-orange text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Connect Wallet</h3>
              <p className="text-gray-600 text-center">
                Connect your Unisat Bitcoin wallet using Mezo Passport integration.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-bitcoin-orange text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Create NFT</h3>
              <p className="text-gray-600 text-center">
                Fill out the NFT details including name, description, and image URL.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-bitcoin-orange text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Pay & Mint</h3>
              <p className="text-gray-600 text-center">
                Pay a small fee in Bitcoin testnet sats and get your NFT minted instantly.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-gray-100 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Built With</h2>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <div className="tech-badge">Next.js 15</div>
            <div className="tech-badge">Mezo Passport</div>
            <div className="tech-badge">Unisat Wallet</div>
            <div className="tech-badge">Bitcoin</div>
            <div className="tech-badge">Tailwind CSS</div>
          </div>
        </div>
      </section>
    </div>
  );
}
