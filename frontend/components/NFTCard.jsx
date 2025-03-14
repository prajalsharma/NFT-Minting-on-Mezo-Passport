'use client';

export default function NFTCard({ nft, showOwner = true }) {
  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="card">
      <div className="w-full h-60 bg-gray-200 rounded-md overflow-hidden mb-4">
        <img
          src={nft.imageUrl}
          alt={nft.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400?text=NFT+Image';
          }}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold truncate">{nft.name}</h3>
          <span className="bg-bitcoin-orange text-white text-xs px-2 py-1 rounded-full">
            {nft.category}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2">{nft.description}</p>
        
        <div className="pt-2 border-t border-gray-100">
          {showOwner && (
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <span className="mr-1">Owner:</span>
                <span className="font-mono">{shortenAddress(nft.owner)}</span>
              </div>
              <div>
                Minted: {formatDate(nft.mintDate)}
              </div>
            </div>
          )}
          
          <div className="mt-2 text-xs text-gray-500 flex items-center">
            <span className="mr-1">Tx:</span>
            <a
              href={`https://www.blockchain.com/explorer/transactions/btc-testnet/${nft.transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono underline text-blue-500 truncate"
            >
              {shortenAddress(nft.transactionHash)}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
