import { useState } from 'react';
import { useWeb3 } from '../../context/Web3Context';

export default function WalletInfo({ showDetails = false }) {
  const { 
    account, 
    isConnected, 
    network, 
    balance, 
    ens, 
    txCount, 
    gasPrices, 
    connectWallet,
    disconnectWallet
  } = useWeb3();
  
  const [detailsOpen, setDetailsOpen] = useState(showDetails);

  // Format address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Format balance for display
  const formatBalance = (balance) => {
    if (!balance) return '0.00';
    return parseFloat(balance).toFixed(4);
  };

  if (!isConnected) {
    return (
      <div className="border border-gray-200 rounded-xl">
        <div className="card p-6 w-full max-w-md mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
            </div>
            <div className="text-xl font-semibold mb-2">Connect Your Wallet</div>
            <p className="text-gray-600 mb-5 text-sm">Connect your MetaMask wallet to view your balance and transactions</p>
            <button
              onClick={connectWallet}
              className="btn-primary py-2 px-6 w-full"
            >
              Connect MetaMask
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-xl">
      <div className="card p-6 w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-semibold text-gray-900">Wallet Dashboard</h3>
          <button
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="text-xs bg-indigo-50 text-indigo-600 py-1 px-3 rounded-full hover:bg-indigo-100 transition-colors"
          >
            <span>{detailsOpen ? 'Hide Details' : 'Show Details'}</span>
            <svg className={`w-3 h-3 ml-1 inline ${detailsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>

        <div className="mb-5 pb-5 border-b border-gray-200">
          <div className="mb-4">
            <span className="text-sm text-gray-500">Your Wallet</span>
            <div className="mt-1 flex items-center">
              {ens ? (
                <span className="font-semibold text-lg text-indigo-600">{ens}</span>
              ) : (
                <span className="font-medium text-indigo-600">{formatAddress(account)}</span>
              )}
              <button 
                onClick={() => navigator.clipboard.writeText(account)}
                className="ml-2 text-gray-400 hover:text-gray-600" 
                title="Copy to clipboard"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
            {ens && (
              <div className="text-sm text-gray-500 mt-1">{formatAddress(account)}</div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Balance</div>
              <div className="font-medium text-indigo-600">{formatBalance(balance)} ETH</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Network</div>
              <div className="font-medium">{network?.name || 'Unknown'}</div>
            </div>
          </div>
        </div>

        {detailsOpen && (
          <div className="animate-fadeIn">
            <div className="mb-5 pb-5 border-b border-gray-200">
              <h4 className="text-md font-medium mb-3 text-gray-800">Network Information</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Chain ID</div>
                  <div className="font-medium">{network?.chainId || 'Unknown'}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Network</div>
                  <div className="font-medium">{network?.name || 'Unknown'}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Currency</div>
                  <div className="font-medium">{network?.nativeCurrency?.symbol || 'ETH'}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Transactions</div>
                  <div className="font-medium">{txCount || '0'}</div>
                </div>
              </div>
            </div>
            
            <div className="mb-5">
              <h4 className="text-md font-medium mb-3 text-gray-800">Gas Information</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Current Gas Prices (Gwei)</div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Slow</div>
                      <div className="font-medium">{gasPrices?.low || '??'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Average</div>
                      <div className="font-medium">{gasPrices?.medium || '??'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Fast</div>
                      <div className="font-medium">{gasPrices?.high || '??'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            {detailsOpen ? 'Hide Details' : 'Show Details'}
          </button>
          <button
            onClick={disconnectWallet}
            className="btn-outline text-sm px-4 py-2"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
} 