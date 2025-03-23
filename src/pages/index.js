import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/layout/Layout';
import { useWeb3 } from '../context/Web3Context';
import WalletInfo from '../components/wallet/WalletInfo';

export default function Home() {
  const { connectWallet, isConnected, account, balance } = useWeb3();
  const [showWalletInfo, setShowWalletInfo] = useState(false);
  
  // Format balance for display
  const formatBalance = (balance) => {
    if (!balance) return '0.00';
    return parseFloat(balance).toFixed(4);
  };
  
  // Property investment options with enhanced analytics
  const investmentOptions = [
    {
      id: 'zip-90272',
      title: 'Entire Palisades Zip Code (90272)',
      description: 'Invest in the entire Pacific Palisades area with a single token',
      value: '5,000,000,000',
      tokens: '5,000,000',
      tokenPrice: '1000.00',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716',
      stats: {
        properties: '2,450+',
        estROI: '9.1%',
        appreciation: '+12.4%/yr',
        marketCap: '$5.2B'
      }
    },
    {
      id: 'property-set-ocean',
      title: 'Ocean View Property Set',
      description: 'Collection of premium ocean-facing properties in Palisades',
      value: '100,000,000',
      tokens: '1,000,000',
      tokenPrice: '100.00',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
      stats: {
        properties: '16',
        estROI: '8.4%',
        appreciation: '+10.2%/yr',
        tokenSupply: '1M'
      }
    },
    {
      id: 'property-individual',
      title: 'Individual Properties',
      description: 'Browse and invest in specific properties in the Palisades area',
      action: 'Browse Properties',
      link: '/properties',
      image: 'https://images.unsplash.com/photo-1604014238170-4def1e4e6fcf',
      stats: {
        available: '20+',
        avgROI: '7.2%',
        minInvestment: '$50',
        liquidity: 'High'
      }
    }
  ];
  
  // Summary metrics for dashboard display
  const platformMetrics = [
    { label: 'Total Value Locked', value: '$5.76B', change: '+15.2%', isPositive: true },
    { label: 'Active Investors', value: '14,532', change: '+24.8%', isPositive: true },
    { label: 'Properties Tokenized', value: '2,781', change: '+12.3%', isPositive: true },
    { label: 'Avg. ROI (30d)', value: '8.7%', change: '+1.2%', isPositive: true },
  ];

  return (
    <Layout
      title="Palisades | Real Estate Investment Platform"
      description="Access your real estate investment dashboard with full analytics, property insights, and portfolio management."
    >
      {/* Hero Section */}
      with clear focal points and balanced negative space.      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
                Invest in Premium Real Estate with <span className="text-blue-600">Ease</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Tokenized real estate investments in the prestigious Pacific Palisades area.
              </p>
              {!isConnected ? (
                <div className="space-y-4">
                  <button 
                    onClick={connectWallet}
                    className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold py-4 px-10 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-blue-400/30 hover:shadow-xl group"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 7H5C3.89543 7 3 7.89543 3 9V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 15H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11 15H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Connect Wallet
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                  <p className="text-sm text-gray-500 flex items-center justify-center">
                    <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Secure connection via Web3
                  </p>
                </div>
              ) : (
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl relative">
                  <div className="absolute -top-2 -right-2">
                    <div className="h-4 w-4 bg-green-500 rounded-full ring-2 ring-white animate-pulse"></div>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-3 ring-4 ring-blue-100">
                      <span className="text-white text-xs font-bold">{account ? account.slice(0, 2) : ""}</span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <p className="text-gray-500 text-sm">Connected Wallet</p>
                        <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
                      </div>
                      <p className="text-gray-800 font-mono text-base truncate">
                        {account && `${account.slice(0, 6)}...${account.slice(-4)}`}
                      </p>
                    </div>
                    <button 
                      onClick={() => setShowWalletInfo(!showWalletInfo)}
                      className="ml-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition flex items-center"
                    >
                      {showWalletInfo ? (
                        <>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                          </svg>
                          Hide Details
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                          View Details
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-gray-500 text-sm">Balance</p>
                      <div className="flex items-center">
                        <span className="font-mono text-xl font-semibold text-gray-800">{formatBalance(balance)}</span>
                        <span className="ml-1 text-sm text-blue-600 font-medium flex items-center">
                          <svg className="w-4 h-4 mr-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M7.5 12L12 7.5L16.5 12M7.5 12H16.5M7.5 12L12 16.5L16.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          ETH
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Link href="/properties" className="bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg text-blue-700 font-medium transition flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        Properties
                      </Link>
                      <Link href="/wallet" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center shadow-md">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                        </svg>
                        Wallet
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 mt-10 md:mt-0">
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <Image 
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716"
                  alt="Pacific Palisades"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/50">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Pacific Palisades Market</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-500 text-sm">Average ROI</p>
                        <p className="text-blue-600 text-xl font-bold">9.1%</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Year Appreciation</p>
                        <p className="text-green-600 text-xl font-bold">+12.4%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {isConnected && showWalletInfo && (
        <div className="bg-white py-6 border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <WalletInfo />
            </div>
          </div>
        </div>
      )}
      
      {/* Key Metrics */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Market Overview</h2>
          <p className="text-gray-500 mb-8">Real-time metrics from the Palisades real estate market</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {platformMetrics.map((metric, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all hover:shadow-lg hover:border-blue-200">
                <p className="text-gray-500 text-base mb-2">{metric.label}</p>
                <div className="flex items-end">
                  <p className="text-3xl font-bold text-gray-800">{metric.value}</p>
                  <div className={`flex items-center text-sm ml-3 mb-1 ${metric.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                    {metric.isPositive ? (
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    )}
                    {metric.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Property */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-10">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">Featured</div>
              <h2 className="text-3xl font-bold mb-2 text-gray-800">Oceanfront Villa</h2>
              <h3 className="text-lg text-blue-600 mb-6">Premium Property - Palisades</h3>
              <p className="text-gray-600 mb-6">Experience luxury living with this exclusive oceanfront property featuring panoramic views and premium amenities.</p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-gray-500 text-sm">Property Value</p>
                  <p className="text-2xl font-bold text-gray-800">$12.5M</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-gray-500 text-sm">Annual ROI</p>
                  <p className="text-2xl font-bold text-green-600">11.2%</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-gray-500 text-sm">Token Price</p>
                  <p className="text-2xl font-bold text-gray-800">$250</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-gray-500 text-sm">Available Tokens</p>
                  <p className="text-2xl font-bold text-blue-600">12,500</p>
                </div>
              </div>
              <button 
                onClick={isConnected ? () => alert('Feature coming soon') : connectWallet}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition"
              >
                {isConnected ? "View Property Details" : "Connect Wallet to Invest"}
              </button>
            </div>
            <div className="w-full md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-48 rounded-xl overflow-hidden shadow-md border border-gray-100">
                  <Image 
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
                    alt="Property Exterior"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-xl overflow-hidden shadow-md border border-gray-100">
                  <Image 
                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
                    alt="Property Interior"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-xl overflow-hidden shadow-md border border-gray-100">
                  <Image 
                    src="https://images.unsplash.com/photo-1600607687644-c7f34b5e8d97"
                    alt="Property Pool"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-xl overflow-hidden shadow-md border border-gray-100">
                  <Image 
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d"
                    alt="Property View"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Investment Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Investment Opportunities</h2>
              <p className="text-gray-500">Diversify your portfolio with tokenized real estate</p>
            </div>
            <Link href="/properties" className="text-blue-600 hover:text-blue-800 text-lg font-medium flex items-center">
              View All
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {investmentOptions.map((option) => (
              <div 
                key={option.id} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200"
              >
                <div className="relative h-48">
                  <Image 
                    src={option.image} 
                    alt={option.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                  
                  {option.tokenPrice && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                      ${option.tokenPrice}
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    {option.stats && Object.entries(option.stats).map(([key, value], i) => (
                      <div key={i} className="bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                        <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim().split(' ')[0]}</span>:&nbsp;
                        <span className="text-blue-700 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                  
                  {option.link ? (
                    <Link 
                      href={option.link} 
                      className="w-full block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-center py-3 px-4 rounded-xl text-base font-medium transition shadow-md"
                    >
                      {option.action || "View Details"}
                    </Link>
                  ) : (
                    <button 
                      onClick={isConnected ? () => alert(`Investment functionality for ${option.title} will be implemented soon`) : connectWallet}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-center py-3 px-4 rounded-xl text-base font-medium transition shadow-md"
                    >
                      {isConnected ? "Invest Now" : "Connect Wallet"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Quick Access Tools */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Quick Access</h2>
          <p className="text-gray-500 mb-8">Tools and resources to manage your investments</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="flex items-center bg-white rounded-xl p-6 border border-gray-100 shadow-md transition-all hover:shadow-lg hover:border-blue-200">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 mr-6 shadow-md">
                <Image 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                  alt="Properties"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Property Portfolio</h3>
                <p className="text-gray-600 mb-4">Browse and manage your real estate investments in one place.</p>
                <Link href="/properties" className="text-blue-600 font-medium flex items-center">
                  View Portfolio
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="flex items-center bg-white rounded-xl p-6 border border-gray-100 shadow-md transition-all hover:shadow-lg hover:border-blue-200">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 mr-6 shadow-md">
                <Image 
                  src="https://images.unsplash.com/photo-1526948531399-320e7e40f0ca"
                  alt="Wallet"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Wallet & Transactions</h3>
                <p className="text-gray-600 mb-4">Manage your digital wallet and view transaction history.</p>
                <Link href="/wallet" className="text-blue-600 font-medium flex items-center">
                  Access Wallet
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link href="/properties" className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:border-blue-200 hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className="h-14 w-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-gray-800 text-lg font-medium">Properties</span>
            </Link>
            
            <Link href="/wallet" className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:border-blue-200 hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className="h-14 w-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <span className="text-gray-800 text-lg font-medium">Wallet</span>
            </Link>
            
            <Link href="#" className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:border-blue-200 hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className="h-14 w-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-gray-800 text-lg font-medium">Analytics</span>
            </Link>
            
            <Link href="#" className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:border-blue-200 hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className="h-14 w-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-gray-800 text-lg font-medium">Calendar</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
} 