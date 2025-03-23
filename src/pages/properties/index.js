import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { useWeb3 } from '../../context/Web3Context';
import Image from 'next/image';
import { ethers } from 'ethers';
import WalletInfo from '../../components/wallet/WalletInfo';

export default function Properties() {
  const { provider, signer, isConnected, connectWallet, account, balance } = useWeb3();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchaseAmount, setPurchaseAmount] = useState({});
  const [purchaseStatus, setPurchaseStatus] = useState({});
  const [showWalletInfo, setShowWalletInfo] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Format balance for display
  const formatBalance = (balance) => {
    if (!balance) return '0.00';
    return parseFloat(balance).toFixed(4);
  };

  // Load mock properties data
  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true);
        // In a real application, we would fetch this from the blockchain
        // For demo, using static data
        const mockProperties = [
          {
            id: 'palisades-001',
            address: '123 Ocean View Drive, Pacific Palisades, CA 90272',
            description: 'Luxury oceanfront property with panoramic views, 5 bedrooms, 6 bathrooms, and a private pool.',
            value: '5000000', // $5M
            totalTokens: '5000000',
            availableTokens: '4750000',
              tokenPrice: '1',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
            features: {
              bedrooms: 5,
              bathrooms: 6,
              area: 5200, // sq ft
              lotSize: 0.42, // acres
              yearBuilt: 2015,
              type: 'Single Family',
              view: 'Ocean'
            },
            roi: {
              estimated: '8.4%',
              rental: '$25,000/month'
            }
          },
          {
            id: 'palisades-002',
            address: '456 Hillside Avenue, Pacific Palisades, CA 90272',
            description: 'Modern hillside estate with city and ocean views, 6 bedrooms, 8 bathrooms, and home theater.',
            value: '7500000', // $7.5M
            totalTokens: '7500000',
            availableTokens: '7200000',
              tokenPrice: '1',
            image: 'https://images.unsplash.com/photo-1604014238170-4def1e4e6fcf',
            features: {
              bedrooms: 6,
              bathrooms: 8,
              area: 7800, // sq ft
              lotSize: 0.75, // acres
              yearBuilt: 2018,
              type: 'Estate',
              view: 'Ocean & City'
            },
            roi: {
              estimated: '7.2%',
              rental: '$32,000/month'
            }
          },
          {
            id: 'palisades-003',
            address: '789 Sunset Boulevard, Pacific Palisades, CA 90272',
            description: 'Classic Mediterranean villa with lush gardens, 4 bedrooms, 5 bathrooms, and a guest house.',
            value: '4200000', // $4.2M
            totalTokens: '4200000',
            availableTokens: '3800000',
              tokenPrice: '1',
            image: 'https://images.unsplash.com/photo-1592595896616-c37162298647',
            features: {
              bedrooms: 4,
              bathrooms: 5,
              area: 4300, // sq ft
              lotSize: 0.38, // acres
              yearBuilt: 2008,
              type: 'Mediterranean',
              view: 'Garden'
            },
            roi: {
              estimated: '6.8%',
              rental: '$18,000/month'
            }
          },
          {
            id: 'palisades-004',
            address: '321 Coastal Road, Pacific Palisades, CA 90272',
            description: 'Contemporary beachfront property with private beach access, 4 bedrooms, and panoramic ocean views.',
            value: '6800000', // $6.8M
            totalTokens: '6800000',
            availableTokens: '6500000',
              tokenPrice: '1',
            image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
            features: {
              bedrooms: 4,
              bathrooms: 4.5,
              area: 3900, // sq ft
              lotSize: 0.25, // acres
              yearBuilt: 2020,
              type: 'Contemporary',
              view: 'Beachfront'
            },
            roi: {
              estimated: '9.1%',
              rental: '$28,000/month'
            }
          },
          {
            id: 'palisades-005',
            address: '555 Canyon View Lane, Pacific Palisades, CA 90272',
            description: 'Stunning architectural home nestled in the canyon with floor-to-ceiling windows and outdoor living spaces.',
            value: '3900000', // $3.9M
            totalTokens: '3900000',
            availableTokens: '3900000',
              tokenPrice: '1',
            image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',
            features: {
              bedrooms: 4,
              bathrooms: 4,
              area: 3600, // sq ft
              lotSize: 0.31, // acres
              yearBuilt: 2017,
              type: 'Architectural',
              view: 'Canyon'
            },
            roi: {
              estimated: '6.5%',
              rental: '$16,500/month'
            }
          },
          {
            id: 'palisades-006',
            address: '888 Palisades Drive, Pacific Palisades, CA 90272',
            description: 'Gated estate with mountain views, tennis court, swimming pool, and expansive entertainment areas.',
            value: '8500000', // $8.5M
            totalTokens: '8500000',
            availableTokens: '8200000',
              tokenPrice: '1',
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
            features: {
              bedrooms: 6,
              bathrooms: 7.5,
              area: 8200, // sq ft
              lotSize: 1.2, // acres
              yearBuilt: 2012,
              type: 'Gated Estate',
              view: 'Mountain'
            },
            roi: {
              estimated: '7.8%',
              rental: '$35,000/month'
            }
          }
        ];
        
        setProperties(mockProperties);
        
        // Initialize purchase amounts
        const initialPurchaseAmounts = {};
        mockProperties.forEach(property => {
          initialPurchaseAmounts[property.id] = "";
        });
        setPurchaseAmount(initialPurchaseAmounts);
        
        // Initialize purchase statuses
        const initialPurchaseStatus = {};
        mockProperties.forEach(property => {
          initialPurchaseStatus[property.id] = "";
        });
        setPurchaseStatus(initialPurchaseStatus);
      } catch (err) {
        console.error("Error loading properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, []);

  // Handle token purchase
  async function handlePurchase(propertyId) {
    if (!isConnected) {
      await connectWallet();
      return;
    }
    
    const property = properties.find(p => p.id === propertyId);
    const amount = purchaseAmount[propertyId];
    
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setPurchaseStatus({
        ...purchaseStatus,
        [propertyId]: "Please enter a valid amount"
      });
      return;
    }

    // Check if user has enough balance
    if (balance && parseFloat(amount) * parseFloat(property.tokenPrice) > parseFloat(balance)) {
      setPurchaseStatus({
        ...purchaseStatus,
        [propertyId]: "Insufficient funds in wallet"
      });
      return;
    }
    
    setShowConfirmation(property);
  }

  // Execute purchase after confirmation
  async function confirmPurchase() {
    if (!showConfirmation) return;
    
    const property = showConfirmation;
    const amount = purchaseAmount[property.id];
    
    try {
      setProcessingPayment(true);
      setPurchaseStatus({
        ...purchaseStatus,
        [property.id]: "Processing transaction..."
      });
      
      // In a real application, we would call the smart contract here
      // Simulate a blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update available tokens (simulation)
      setProperties(prevProperties => 
        prevProperties.map(p => 
          p.id === property.id 
            ? {...p, availableTokens: (parseFloat(p.availableTokens) - parseFloat(amount)).toString()} 
            : p
        )
      );
      
      setPurchaseStatus({
        ...purchaseStatus,
        [property.id]: "Purchase successful!"
      });
      
      // Reset purchase amount
      setPurchaseAmount({
        ...purchaseAmount,
        [property.id]: ""
      });
      
      // Clear confirmation modal
      setShowConfirmation(null);
      setProcessingPayment(false);
      
      // Clear success message after a few seconds
      setTimeout(() => {
        setPurchaseStatus({
          ...purchaseStatus,
          [property.id]: ""
        });
      }, 5000);
      
    } catch (err) {
      console.error("Error during purchase:", err);
      setPurchaseStatus({
        ...purchaseStatus,
        [property.id]: "Transaction failed. Please try again."
      });
      setProcessingPayment(false);
      setShowConfirmation(null);
    }
  }

  // Handle slider change for purchase amount
  function handleSliderChange(propertyId, event) {
    const value = event.target.value;
    setPurchaseAmount({
      ...purchaseAmount,
      [propertyId]: value
    });
    
    // Clear any error messages
    if (purchaseStatus[propertyId]) {
      setPurchaseStatus({
        ...purchaseStatus,
        [propertyId]: ""
      });
    }
  }

  // Function to toggle property detail view
  const togglePropertyDetail = (propertyId) => {
    if (selectedProperty === propertyId) {
      setSelectedProperty(null);
    } else {
      setSelectedProperty(propertyId);
    }
  };

  // Calculate ownership percentage
  const calculateOwnership = (amount, totalTokens) => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return 0;
    return ((parseFloat(amount) / parseFloat(totalTokens)) * 100).toFixed(4);
  };

  // Calculate estimated monthly returns
  const calculateMonthlyReturn = (property, amount) => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return 0;
    
    // Extract ROI percentage (removing the % sign)
    const roiPercentage = parseFloat(property.roi.estimated.replace('%', ''));
    const annualReturn = (parseFloat(amount) * parseFloat(property.tokenPrice) * roiPercentage) / 100;
    return (annualReturn / 12).toFixed(2);
  };

  return (
    <Layout
      title="Sharmo | Tokenized Real Estate Investment"
      description="Browse and invest in tokenized properties in Pacific Palisades, CA."
    >
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Pacific Palisades Properties</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Purchase tokens to own a share of these exclusive properties in the Pacific Palisades area
          </p>
          
          {!isConnected && (
                <button
              onClick={connectWallet}
              className="mt-6 bg-white text-indigo-800 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105"
            >
              Connect MetaMask to Invest
                </button>
          )}
          
          {isConnected && (
            <div className="mt-4 flex flex-col items-center">
              <div className="bg-white/20 rounded-lg p-3 inline-block">
                <p className="text-sm">Connected: {account && `${account.slice(0, 6)}...${account.slice(-4)}`} | {formatBalance(balance)} ETH</p>
              </div>
              <button 
                onClick={() => setShowWalletInfo(!showWalletInfo)}
                className="mt-2 text-xs text-white/80 hover:text-white underline"
              >
                {showWalletInfo ? 'Hide wallet details' : 'Show wallet details'}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {isConnected && showWalletInfo && (
        <div className="container mx-auto px-4 -mt-6 mb-8 flex justify-center">
          <div className="max-w-lg w-full">
            <WalletInfo />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-16">
          {loading ? (
            <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-lg">Loading properties...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">
              <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700"
            >
              Retry
            </button>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {properties.map((property) => (
              <div 
                key={property.id} 
                className={`bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl ${
                  selectedProperty === property.id ? 'scale-105 ring-2 ring-indigo-500' : 'hover:scale-[1.03]'
                }`}
              >
                <div className="relative">
                  <div className="h-72 relative">
                    <Image 
                      src={property.image} 
                      alt={property.address}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  
                  {/* Property value badge */}
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full font-semibold text-sm">
                    ${Number(property.value).toLocaleString()}
                  </div>
                  
                  {/* ROI badge */}
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full font-semibold text-sm">
                    ROI: {property.roi.estimated}
                  </div>
                  
                  {/* Property quick info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1 line-clamp-1">{property.address.split(',')[0]}</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-white/90">{property.features.type} | {property.features.view}</p>
                      </div>
                      <div className="flex space-x-3 text-sm">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                          </svg>
                          <span>{property.features.bedrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.5 17a2.5 2.5 0 01-2.5-2.5V5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0117 5v9.5a2.5 2.5 0 01-2.5 2.5h-9zM5 5v9.5c0 .28.22.5.5.5h9a.5.5 0 00.5-.5V5a.5.5 0 00-.5-.5h-9a.5.5 0 00-.5.5z" clipRule="evenodd"></path>
                          </svg>
                          <span>{property.features.area.toLocaleString()} sqft</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-gray-600 line-clamp-2">{property.description}</p>
                    
                    <div className="flex justify-between mt-4 mb-3 text-sm">
                      <button 
                        onClick={() => togglePropertyDetail(property.id)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        {selectedProperty === property.id ? 'Hide details' : 'View details'}
                      </button>
                      <span className="text-gray-500">Token price: <span className="font-semibold">${property.tokenPrice}</span></span>
                    </div>
                    
                    {selectedProperty === property.id && (
                      <div className="bg-gray-50 -mx-6 px-6 py-4 border-t border-b border-gray-100">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                          <div>
                            <span className="text-xs text-gray-500">Bedrooms</span>
                            <p className="font-medium">{property.features.bedrooms}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Bathrooms</span>
                            <p className="font-medium">{property.features.bathrooms}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Living Area</span>
                            <p className="font-medium">{property.features.area.toLocaleString()} sq ft</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Lot Size</span>
                            <p className="font-medium">{property.features.lotSize} acres</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Year Built</span>
                            <p className="font-medium">{property.features.yearBuilt}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Property Type</span>
                            <p className="font-medium">{property.features.type}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between py-3 border-t border-gray-100">
                          <div>
                            <span className="text-xs text-gray-500">Est. Monthly Rental</span>
                            <p className="font-medium text-green-600">{property.roi.rental}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-gray-500">Est. Annual ROI</span>
                            <p className="font-medium text-green-600">{property.roi.estimated}</p>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>Tokens Available:</span>
                            <span>{Number(property.availableTokens).toLocaleString()} / {Number(property.totalTokens).toLocaleString()}</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                            <div 
                              className="h-full bg-indigo-600 rounded-full" 
                              style={{ width: `${(parseInt(property.availableTokens) / parseInt(property.totalTokens)) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex flex-col space-y-4">
                      {/* Premium Token Slider */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center mb-1">
                          <label htmlFor={`token-slider-${property.id}`} className="text-sm font-medium text-gray-700">
                            Token Amount
                          </label>
                          <div className="text-right">
                            <span className="text-xs text-gray-500">Max: {Number(property.availableTokens).toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            id={`token-slider-${property.id}`}
                            min="0"
                            max={property.availableTokens}
                            value={purchaseAmount[property.id] || 0}
                            onChange={(e) => handleSliderChange(property.id, e)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          />
                          <input
                            type="number"
                            value={purchaseAmount[property.id] || ""}
                            onChange={(e) => handleSliderChange(property.id, { target: { value: e.target.value } })}
                            placeholder="0"
                            min="0"
                            max={property.availableTokens}
                            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center"
                          />
                        </div>
                        
                        {/* Token Statistics */}
                        {purchaseAmount[property.id] && !isNaN(purchaseAmount[property.id]) && parseFloat(purchaseAmount[property.id]) > 0 && (
                          <div className="bg-gray-50 p-3 rounded-lg mt-2 border border-gray-100">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-xs text-gray-500">Ownership</p>
                                <p className="font-medium text-indigo-700">{calculateOwnership(purchaseAmount[property.id], property.totalTokens)}%</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Investment</p>
                                <p className="font-medium text-indigo-700">${(Number(purchaseAmount[property.id]) * Number(property.tokenPrice)).toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Est. Monthly Return</p>
                                <p className="font-medium text-green-600">${calculateMonthlyReturn(property, purchaseAmount[property.id])}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Wallet Status</p>
                                <p className={`font-medium ${parseFloat(balance) >= parseFloat(purchaseAmount[property.id]) * parseFloat(property.tokenPrice) ? 'text-green-600' : 'text-red-600'}`}>
                                  {parseFloat(balance) >= parseFloat(purchaseAmount[property.id]) * parseFloat(property.tokenPrice) 
                                    ? 'Sufficient'
                                    : 'Insufficient'
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {purchaseStatus[property.id] && (
                          <div className={`text-sm mt-1 ${purchaseStatus[property.id].includes('successful') ? 'text-green-600' : purchaseStatus[property.id].includes('Processing') ? 'text-blue-600' : 'text-red-600'}`}>
                            {purchaseStatus[property.id]}
                          </div>
                        )}
                      </div>
                      
                      {/* Premium Buy Button */}
                      <button
                        onClick={() => handlePurchase(property.id)}
                        disabled={!purchaseAmount[property.id] || isNaN(purchaseAmount[property.id]) || parseFloat(purchaseAmount[property.id]) <= 0 || loading}
                        className={`relative group overflow-hidden py-3 px-5 rounded-lg font-medium text-center transition-all duration-300 
                          ${(!purchaseAmount[property.id] || isNaN(purchaseAmount[property.id]) || parseFloat(purchaseAmount[property.id]) <= 0)
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:shadow-lg hover:shadow-indigo-500/30'
                          }`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="w-5 h-5"
                          >
                            <path d="M21 9c0-.55-.45-1-1-1h-3.5V4.5c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1V8H9c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h3.5v3.5c0 .55.45 1 1 1h2c.55 0 1-.45 1-1V12H20c.55 0 1-.45 1-1V9z"/>
                          </svg>
                          Purchase Tokens
                        </span>
                        <span className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-indigo-700 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      
      {/* Purchase Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all animate-fadeIn">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">Confirm Purchase</h3>
                <button 
                  onClick={() => setShowConfirmation(null)} 
                  className="text-gray-400 hover:text-gray-600"
                  disabled={processingPayment}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
              
              <div className="mt-3">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={showConfirmation.image}
                      alt={showConfirmation.address}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 line-clamp-1">{showConfirmation.address.split(',')[0]}</h4>
                    <p className="text-sm text-gray-600">Investing in a {showConfirmation.features.type}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Token Amount</p>
                      <p className="font-semibold text-gray-900">{Number(purchaseAmount[showConfirmation.id]).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Token Price</p>
                      <p className="font-semibold text-gray-900">${showConfirmation.tokenPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Ownership</p>
                      <p className="font-semibold text-gray-900">{calculateOwnership(purchaseAmount[showConfirmation.id], showConfirmation.totalTokens)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Est. Monthly Return</p>
                      <p className="font-semibold text-green-600">${calculateMonthlyReturn(showConfirmation, purchaseAmount[showConfirmation.id])}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-900 font-medium">Total Investment</p>
                      <p className="text-lg font-bold text-indigo-700">${(Number(purchaseAmount[showConfirmation.id]) * Number(showConfirmation.tokenPrice)).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowConfirmation(null)}
                    disabled={processingPayment}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmPurchase}
                    disabled={processingPayment}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg hover:shadow-lg transition-shadow font-medium disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {processingPayment ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Confirm Purchase'
                    )}
              </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        /* Custom slider styling */
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          background: #4F46E5;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        input[type=range]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: #4F46E5;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
      `}</style>
    </Layout>
  );
} 