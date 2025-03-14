import axios from 'axios';
import { API_ENDPOINTS } from './constants';

// Create an axios instance
const apiClient = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions for NFT interactions
export const nftApi = {
  // Mint a new NFT
  mintNFT: async (nftData, transactionHash) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.MINT_NFT, {
        ...nftData,
        transactionHash,
      });
      return response.data;
    } catch (error) {
      console.error('Error minting NFT:', error);
      throw error;
    }
  },

  // Get all NFTs for a specific user
  getUserNFTs: async (address) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.GET_USER_NFTS}/${address}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user NFTs:', error);
      return [];
    }
  },

  // Get all NFTs in the gallery
  getAllNFTs: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.GET_ALL_NFTS);
      return response.data;
    } catch (error) {
      console.error('Error fetching all NFTs:', error);
      return [];
    }
  },

  // Get a specific NFT by ID
  getNFTById: async (id) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.GET_NFT_BY_ID}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching NFT with ID ${id}:`, error);
      return null;
    }
  },
};
