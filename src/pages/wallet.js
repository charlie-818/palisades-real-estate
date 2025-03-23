import { useState } from 'react';
import Image from 'next/image';
import Layout from '../components/layout/Layout';
import WalletInfo from '../components/wallet/WalletInfo';
import { useWeb3 } from '../context/Web3Context';
import Link from 'next/link';

export default function Wallet() {
  const { isConnected, account, balance } = useWeb3();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Format balance for display
  const formatBalance = (balance) => {
    if (!balance) return '0.00';
    return parseFloat(balance).toFixed(4);
  };

  const renderContent = () => {
    if (!isConnected) {
      return (
        <div className="text-center py-12 max-w-3xl mx-auto">
          <div className="mb-6 flex justify-center">
            <Image 
              src="/images/logo.png"
              alt="Sharmo Real Estate Logo"
              width={100}
              height={100}
              className="object-contain mb-6"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Connect your wallet</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Please connect your wallet to view your investment details and manage your portfolio
          </p>
          <WalletInfo />
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-xl h-full">
            <div className="card p-6 h-full">
              <div className="flex flex-col h-full">
                <div className="mb-6 flex justify-center">
                  <Image 
                    src="/images/logo.png"
                    alt="Sharmo Real Estate Logo"
                    width={80}
                    height={80}
                    className="object-contain mb-4"
                  />
                </div>
                
                <ul className="space-y-2 mb-6">
                  <li>
                    <button 
                      onClick={() => setActiveTab('overview')} 
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                        </svg>
                        Account Overview
                      </div>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('investments')} 
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'investments' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        My Investments
                      </div>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('transactions')} 
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'transactions' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Transaction History
                      </div>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('settings')} 
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Settings
                      </div>
                    </button>
                  </li>
                </ul>
                
                <div className="mt-auto">
                  <Link 
                    href="/properties" 
                    className="btn-primary text-sm w-full text-center"
                  >
                    Browse Properties
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Overview</h2>
              <div className="mb-6 max-w-full">
                <WalletInfo showDetails={true} />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="border border-gray-200 rounded-xl">
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Investment Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Investments</span>
                        <span className="font-medium text-indigo-600">0 Properties</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Value</span>
                        <span className="font-medium text-indigo-600">0.00 ETH</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Unrealized Gains</span>
                        <span className="font-medium text-green-600">0.00 ETH (0%)</span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>Updated every 24 hours</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-xl">
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Network Info</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Recommended Networks</span>
                        <div className="flex items-center">
                          <span className="inline-flex items-center mr-2 py-1 px-2 bg-blue-50 text-blue-700 text-xs rounded-full">Ethereum</span>
                          <span className="inline-flex items-center py-1 px-2 bg-purple-50 text-purple-700 text-xs rounded-full">Sepolia</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Smart Contract Platform</span>
                        <span className="font-medium text-indigo-600">ERC-20 Tokens</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center mb-2">
                          <svg className="w-4 h-4 mr-1 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                          </svg>
                          <span>Secure & verified contracts</span>
                        </div>
                        <p>Use Ethereum Mainnet for production or Hardhat Local/Sepolia Testnet for testing.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-xl">
                <div className="card p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center py-2 border-b border-gray-100">
                      <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                        </svg>
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-medium">Wallet connected</p>
                        <p className="text-xs text-gray-500">Just now</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center py-4">
                      <p className="text-sm text-gray-500">No other recent activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'investments' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">My Investments</h2>
              <div className="border border-gray-200 rounded-xl">
                <div className="card p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <svg className="w-16 h-16 text-indigo-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No Active Investments</h3>
                  <p className="text-gray-600 mb-6">You don't have any property investments yet. Browse available properties to start investing.</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                      href="/properties" 
                      className="btn-primary inline-block"
                    >
                      Browse Properties
                    </Link>
                    <Link
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800 transition text-sm"
                    >
                      Learn more about investing
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl">
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Recommended for You</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-lg p-3 hover:bg-indigo-50 transition-colors">
                        <div className="flex items-center">
                          <div className="h-12 w-12 relative rounded-lg overflow-hidden mr-3">
                            <Image 
                              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
                              alt="Ocean View Property"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <p className="text-sm font-medium">Ocean View Properties</p>
                            <p className="text-xs text-gray-500">16 available units</p>
                          </div>
                          <div className="ml-2">
                            <span className="bg-green-100 text-green-800 text-xs rounded-full px-2 py-1">8.4% ROI</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 hover:bg-indigo-50 transition-colors">
                        <div className="flex items-center">
                          <div className="h-12 w-12 relative rounded-lg overflow-hidden mr-3">
                            <Image 
                              src="https://images.unsplash.com/photo-1582407947304-fd86f028f716"
                              alt="Palisades Zip Code"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <p className="text-sm font-medium">Palisades Zip Code (90272)</p>
                            <p className="text-xs text-gray-500">2,450+ properties</p>
                          </div>
                          <div className="ml-2">
                            <span className="bg-green-100 text-green-800 text-xs rounded-full px-2 py-1">9.1% ROI</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-xl">
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Investment Tips</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <svg className="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">Diversify your portfolio across multiple properties</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <svg className="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">Start with smaller investments to learn the platform</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <svg className="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">Check property details carefully before investing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'transactions' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Transaction History</h2>
              <div className="border border-gray-200 rounded-xl">
                <div className="card p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <svg className="w-16 h-16 text-indigo-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No Recent Transactions</h3>
                  <p className="text-gray-600 mb-2">You don't have any property transactions yet.</p>
                  <p className="text-gray-500 text-sm">Your transaction history will appear here once you make your first investment.</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">What to Expect</h3>
                <div className="border border-gray-200 rounded-xl">
                  <div className="card p-6">
                    <div className="space-y-6">
                      <div className="flex">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-indigo-600 font-medium">1</span>
                        </div>
                        <div>
                          <h4 className="text-base font-medium text-gray-900">Purchase Confirmation</h4>
                          <p className="text-sm text-gray-600 mt-1">When you purchase tokens, the transaction will be recorded here with a pending status.</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-indigo-600 font-medium">2</span>
                        </div>
                        <div>
                          <h4 className="text-base font-medium text-gray-900">Transaction Processing</h4>
                          <p className="text-sm text-gray-600 mt-1">The transaction will be processed on the Ethereum blockchain, which may take a few minutes.</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-indigo-600 font-medium">3</span>
                        </div>
                        <div>
                          <h4 className="text-base font-medium text-gray-900">Completion & Records</h4>
                          <p className="text-sm text-gray-600 mt-1">Once verified, the transaction will show as complete and your tokens will appear in your wallet.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
              <div className="border border-gray-200 rounded-xl">
                <div className="card p-6">
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Wallet Connection</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600">Connected Address</p>
                        <p className="font-medium text-sm">{account}</p>
                      </div>
                      <button className="btn-outline text-sm px-3 py-1.5">
                        Change Wallet
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-gray-600">Email Notifications</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-gray-600">Transaction Alerts</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-gray-600">Investment Updates</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800">Two-Factor Authentication</span>
                          <span className="bg-gray-200 text-gray-800 text-xs py-1 px-2 rounded-full">Coming Soon</span>
                        </div>
                        <p className="text-sm text-gray-600">Enhance your account security with 2FA.</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800">Transaction Limits</span>
                          <button className="text-indigo-600 text-sm hover:text-indigo-800">Configure</button>
                        </div>
                        <p className="text-sm text-gray-600">Set daily and per-transaction limits to control your spending.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <button className="btn-primary text-sm px-6 py-2">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout
      title="Wallet Dashboard | Sharmo Real Estate"
      description="Manage your digital wallet, view your property investments, and track transaction history."
    >
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Wallet Dashboard</h1>
        {renderContent()}
      </div>
    </Layout>
  );
} 