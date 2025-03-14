const NFTModel = require('../models/nftModel');
const bitcoinUtils = require('../utils/bitcoinUtils');

// Constants
const MINT_COST_SATS = 10000; // 10,000 sats (0.0001 BTC)
const RECIPIENT_BTC_ADDRESS = process.env.RECIPIENT_BTC_ADDRESS || 'YOUR_BITCOIN_TESTNET_ADDRESS_HERE';

// NFT Controller with handler methods
const nftController = {
  // Mint a new NFT
  mintNFT: async (req, res) => {
    try {
      const { name, description, imageUrl, category, owner, mintCost, mintDate, transactionHash } = req.body;
      
      // Validate required fields
      if (!name || !description || !imageUrl || !category || !owner || !transactionHash) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing required fields' 
        });
      }
      
      // Check for duplicate NFTs for this owner
      if (NFTModel.isDuplicate(owner, name)) {
        return res.status(400).json({ 
          success: false, 
          message: 'You already own an NFT with this name' 
        });
      }
      
      // Check if transaction has already been used for minting
      const existingNFT = NFTModel.getByTransactionHash(transactionHash);
      if (existingNFT) {
        return res.status(400).json({ 
          success: false, 
          message: 'This transaction has already been used to mint an NFT' 
        });
      }
      
      // Verify the Bitcoin transaction
      const verification = await bitcoinUtils.verifyTransaction(
        transactionHash, 
        MINT_COST_SATS, 
        RECIPIENT_BTC_ADDRESS
      );
      
      if (!verification.verified) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid transaction', 
          details: verification.reason 
        });
      }
      
      // Create the NFT
      const newNFT = NFTModel.create({
        name,
        description,
        imageUrl,
        category,
        owner,
        mintCost: mintCost || MINT_COST_SATS,
        mintDate: mintDate || new Date().toISOString(),
        transactionHash,
        transactionAmount: verification.amount,
        confirmations: verification.confirmations
      });
      
      return res.status(201).json({
        success: true,
        message: 'NFT minted successfully',
        nft: newNFT
      });
    } catch (error) {
      console.error('Error minting NFT:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error while minting NFT',
        error: error.message
      });
    }
  },
  
  // Get all NFTs
  getAllNFTs: (req, res) => {
    try {
      const nfts = NFTModel.getAll();
      return res.status(200).json(nfts);
    } catch (error) {
      console.error('Error fetching all NFTs:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error while fetching NFTs',
        error: error.message
      });
    }
  },
  
  // Get NFTs by owner
  getNFTsByOwner: (req, res) => {
    try {
      const { address } = req.params;
      
      if (!address) {
        return res.status(400).json({ 
          success: false, 
          message: 'Owner address is required' 
        });
      }
      
      const nfts = NFTModel.getByOwner(address);
      return res.status(200).json(nfts);
    } catch (error) {
      console.error('Error fetching NFTs by owner:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error while fetching NFTs by owner',
        error: error.message
      });
    }
  },
  
  // Get NFT by ID
  getNFTById: (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          message: 'NFT ID is required' 
        });
      }
      
      const nft = NFTModel.getById(id);
      
      if (!nft) {
        return res.status(404).json({ 
          success: false, 
          message: 'NFT not found' 
        });
      }
      
      return res.status(200).json(nft);
    } catch (error) {
      console.error('Error fetching NFT by ID:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error while fetching NFT',
        error: error.message
      });
    }
  }
};

module.exports = nftController;
