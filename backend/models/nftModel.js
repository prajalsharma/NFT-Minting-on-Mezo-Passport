const { v4: uuidv4 } = require('uuid');

// In-memory storage for NFTs
const nfts = [];

// NFT model with methods for CRUD operations
const NFTModel = {
  // Create a new NFT
  create: (nftData) => {
    const newNFT = {
      id: uuidv4(),
      ...nftData,
      createdAt: new Date().toISOString(),
    };
    
    nfts.push(newNFT);
    return newNFT;
  },
  
  // Get all NFTs
  getAll: () => {
    return [...nfts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  
  // Get NFTs by owner address
  getByOwner: (ownerAddress) => {
    return nfts.filter(nft => nft.owner.toLowerCase() === ownerAddress.toLowerCase())
               .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  
  // Get NFT by ID
  getById: (id) => {
    return nfts.find(nft => nft.id === id);
  },
  
  // Get NFT by transaction hash
  getByTransactionHash: (txHash) => {
    return nfts.find(nft => nft.transactionHash === txHash);
  },
  
  // Check if owner already has an NFT with the same name
  isDuplicate: (owner, name) => {
    return nfts.some(nft => 
      nft.owner.toLowerCase() === owner.toLowerCase() && 
      nft.name.toLowerCase() === name.toLowerCase()
    );
  }
};

module.exports = NFTModel;
