const axios = require('axios');

// Bitcoin utilities for verifying transactions
const bitcoinUtils = {
  // Verify Bitcoin transaction on testnet
  verifyTransaction: async (txHash, expectedAmount, recipientAddress) => {
    try {
      // For testnet, we use testnet blockchain explorers API
      const response = await axios.get(
        `https://blockstream.info/testnet/api/tx/${txHash}`
      );
      
      const transaction = response.data;
      
      // Find the output that matches our recipient address
      const targetOutput = transaction.vout.find(
        output => output.scriptpubkey_address === recipientAddress
      );
      
      if (!targetOutput) {
        return {
          verified: false,
          reason: 'Recipient address not found in transaction outputs',
        };
      }
      
      // Convert satoshis to number
      const amount = targetOutput.value;
      
      // Check if amount is correct (within a small margin for fees)
      if (amount < expectedAmount) {
        return {
          verified: false,
          reason: `Amount too low. Expected ${expectedAmount} sats, got ${amount} sats`,
        };
      }
      
      return {
        verified: true,
        amount,
        confirmations: transaction.status.confirmed ? transaction.status.block_height : 0,
      };
    } catch (error) {
      console.error('Error verifying Bitcoin transaction:', error);
      return {
        verified: false,
        reason: 'Failed to verify transaction',
        error: error.message,
      };
    }
  },
};

module.exports = bitcoinUtils;
