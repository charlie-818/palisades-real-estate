import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

const Web3Context = createContext();

export function useWeb3() {
  return useContext(Web3Context);
}

export function Web3Provider({ children }) {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState(null);
  const [ens, setEns] = useState(null);
  const [txCount, setTxCount] = useState(null);
  const [gasPrices, setGasPrices] = useState(null);

  // Initialize web3 connection
  async function connectWallet() {
    try {
      setLoading(true);
      setError(null);

      const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: {},
      });

      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const account = await signer.getAddress();
      const network = await provider.getNetwork();

      setProvider(provider);
      setSigner(signer);
      setAccount(account);
      setNetwork(network);
      setIsConnected(true);

      // Get additional account information
      await fetchAccountDetails(provider, account);

      // Handle account changes
      instance.on('accountsChanged', async (accounts) => {
        if (accounts.length === 0) {
          await disconnectWallet();
        } else {
          const signer = provider.getSigner();
          const account = await signer.getAddress();
          setSigner(signer);
          setAccount(account);
          await fetchAccountDetails(provider, account);
        }
      });

      // Handle chain changes
      instance.on('chainChanged', async () => {
        window.location.reload();
      });

      return { provider, signer, account, network };
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      setError('Failed to connect wallet. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  }

  // Fetch additional account details
  async function fetchAccountDetails(provider, account) {
    try {
      // Get account balance
      const balanceWei = await provider.getBalance(account);
      const balanceEth = ethers.utils.formatEther(balanceWei);
      setBalance(balanceEth);

      // Get transaction count
      const count = await provider.getTransactionCount(account);
      setTxCount(count);

      // Check for ENS name
      try {
        const ensName = await provider.lookupAddress(account);
        setEns(ensName);
      } catch (error) {
        setEns(null);
      }

      // Get gas prices
      try {
        const feeData = await provider.getFeeData();
        setGasPrices({
          gasPrice: feeData.gasPrice ? ethers.utils.formatUnits(feeData.gasPrice, 'gwei') : null,
          maxFeePerGas: feeData.maxFeePerGas ? ethers.utils.formatUnits(feeData.maxFeePerGas, 'gwei') : null,
          maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ? ethers.utils.formatUnits(feeData.maxPriorityFeePerGas, 'gwei') : null
        });
      } catch (error) {
        setGasPrices(null);
      }
    } catch (error) {
      console.error('Error fetching account details:', error);
    }
  }

  // Disconnect wallet
  async function disconnectWallet() {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: true,
      });
      await web3Modal.clearCachedProvider();
      
      setProvider(null);
      setSigner(null);
      setAccount(null);
      setNetwork(null);
      setIsConnected(false);
      setBalance(null);
      setEns(null);
      setTxCount(null);
      setGasPrices(null);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  }

  // Auto-connect if cached provider exists
  useEffect(() => {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    });

    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  // Refresh account data periodically
  useEffect(() => {
    let intervalId;
    
    if (isConnected && provider && account) {
      // Refresh every 30 seconds
      intervalId = setInterval(() => {
        fetchAccountDetails(provider, account);
      }, 30000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isConnected, provider, account]);

  // Context value
  const value = {
    provider,
    signer,
    account,
    network,
    isConnected,
    loading,
    error,
    balance,
    ens,
    txCount,
    gasPrices,
    connectWallet,
    disconnectWallet,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
} 