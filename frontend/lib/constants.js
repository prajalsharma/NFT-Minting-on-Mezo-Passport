

// API endpoints
export const API_BASE_URL = 'http://localhost:3001/api';
export const API_ENDPOINTS = {
  MINT_NFT: `${API_BASE_URL}/nft/mint`,
  GET_USER_NFTS: `${API_BASE_URL}/nft/user`,
  GET_ALL_NFTS: `${API_BASE_URL}/nft/all`,
  GET_NFT_BY_ID: `${API_BASE_URL}/nft`,
};

// Bitcoin settings
export const MINT_COST_SATS = 10000; // 10,000 sats (0.0001 BTC)
export const RECIPIENT_BTC_ADDRESS = 'bc1qq437eqfvlnv3xfdqwzfd7j3gxnp9jxdxaa84er'; // Replace with your Bitcoin testnet address


// NFT settings
export const NFT_CATEGORIES = [
  'Art',
  'Collectible',
  'Game',
  'Music',
  'Video',
  'Meme',
  'Other'
];
