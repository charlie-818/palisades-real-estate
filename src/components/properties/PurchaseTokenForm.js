import { useState, useEffect } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { ethers } from 'ethers';
import { purchasePropertyTokens } from '../../utils/contracts';

export default function PurchaseTokenForm({ property }) {
  const { signer, account, isConnected, connectWallet } = useWeb3();
  const [tokenAmount, setTokenAmount] = useState('');
  const [ethAmount, setEthAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // When token amount changes, calculate ETH amount
  useEffect(() => {
    if (tokenAmount && property.tokenPrice) {
      const tokens = parseInt(tokenAmount);
      if (!isNaN(tokens)) {
        const ethCost = (tokens * parseFloat(property.tokenPrice)).toFixed(6);
        setEthAmount(ethCost);
      }
    } else {
      setEthAmount('');
    }
  }, [tokenAmount, property.tokenPrice]);
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isConnected) {
      await connectWallet();
      return;
    }
    
    // Reset status
    setError('');
    setSuccess('');
    
    // Validate input
    if (!tokenAmount || parseInt(tokenAmount) <= 0) {
      setError('Please enter a valid number of tokens to purchase');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Call the purchase function
      const result = await purchasePropertyTokens(
        signer,
        property.address,
        tokenAmount,
        ethAmount
      );
      
      if (result.success) {
        setSuccess(`Successfully purchased ${tokenAmount} tokens! Transaction: ${result.txHash}`);
        setTokenAmount('');
        setEthAmount('');
      } else {
        setError(result.error || 'Transaction failed. Please try again.');
      }
    } catch (err) {
      console.error('Error purchasing tokens:', err);
      setError('Failed to purchase tokens. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="card p-6">
      <h3 className="text-xl font-bold mb-4">Purchase Tokens</h3>
      
      <form onSubmit={handleSubmit}>
        {/* Token Amount */}
        <div className="mb-4">
          <label htmlFor="tokenAmount" className="block text-gray-700 font-medium mb-2">
            Number of Tokens
          </label>
          <input
            type="number"
            id="tokenAmount"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(e.target.value)}
            placeholder="Enter number of tokens"
            className="input"
            min="1"
            max={property.totalTokenSupply}
          />
          {tokenAmount && (
            <p className="mt-1 text-sm text-gray-500">
              Cost per token: {formatCurrency(property.tokenPrice)}
            </p>
          )}
        </div>
        
        {/* ETH Amount */}
        <div className="mb-6">
          <label htmlFor="ethAmount" className="block text-gray-700 font-medium mb-2">
            Total Cost (ETH)
          </label>
          <input
            type="text"
            id="ethAmount"
            value={ethAmount}
            readOnly
            className="input bg-gray-50"
          />
          {ethAmount && (
            <p className="mt-1 text-sm text-gray-500">
              Approx. {formatCurrency(parseFloat(ethAmount) * 2000)} (assuming 1 ETH = $2,000)
            </p>
          )}
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={isLoading || !property.isActive}
        >
          {isLoading ? 'Processing...' : isConnected ? 'Purchase Tokens' : 'Connect Wallet to Purchase'}
        </button>
        
        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {/* Success Message */}
        {success && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            {success}
          </div>
        )}
        
        {/* Additional Information */}
        <div className="mt-6 text-sm text-gray-500">
          <p>By purchasing tokens, you agree to our terms and conditions. Each token represents partial ownership in this property.</p>
        </div>
      </form>
    </div>
  );
} 