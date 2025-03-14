
const express = require('express');
const nftController = require('../controllers/nftController');

const router = express.Router();

// POST /api/nft/mint - Mint a new NFT
router.post('/mint', nftController.mintNFT);

// GET /api/nft/all - Get all NFTs
router.get('/all', nftController.getAllNFTs);

// GET /api/nft/user/:address - Get NFTs by owner address
router.get('/user/:address', nftController.getNFTsByOwner);

// GET /api/nft/:id - Get NFT by ID
router.get('/:id', nftController.getNFTById);

module.exports = router;
