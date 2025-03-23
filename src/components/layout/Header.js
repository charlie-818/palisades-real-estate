import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWeb3 } from '../../context/Web3Context';

export default function Header() {
  const { account, isConnected, connectWallet, disconnectWallet, balance } = useWeb3();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2.5' : 'bg-white py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="h-10 w-10 flex items-center justify-center">
              <Image 
                src="/images/logo.png" 
                alt="Sharmo Logo" 
                width={40} 
                height={40} 
                className="object-contain"
              />
            </div>
            <div className="flex flex-col ml-2 border-l border-gray-200 pl-2">
              <span className="text-lg font-bold tracking-tight text-gray-900 leading-none">SHARMO</span>
              <span className="text-xs text-gray-500 tracking-wider">REAL ESTATE</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex space-x-8 mr-8">
              <Link href="/">
                <span className="font-medium text-gray-700 hover:text-indigo-600 transition-colors">Home</span>
              </Link>
              <Link href="/properties">
                <span className="font-medium text-gray-700 hover:text-indigo-600 transition-colors">Properties</span>
              </Link>
              <Link href="/wallet">
                <span className="font-medium text-gray-700 hover:text-indigo-600 transition-colors">Wallet</span>
              </Link>
            </div>
            
            {/* Wallet Connection */}
            {isConnected ? (
              <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
                <div className="rounded-xl border border-gray-200">
                  <div className="flex items-center bg-white text-gray-800 rounded-xl px-3 py-1.5">
                    <span className="mr-2 text-sm font-medium text-indigo-600">{formatBalance(balance)} ETH</span>
                    <span className="text-sm text-gray-600">{formatAddress(account)}</span>
                  </div>
                </div>
                <button 
                  onClick={disconnectWallet} 
                  className="btn-outline text-sm px-3 py-1.5"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <div className="border-l border-gray-200 pl-6">
                <button 
                  onClick={connectWallet} 
                  className="btn-primary text-sm px-4 py-1.5"
                >
                  Connect Wallet
                </button>
              </div>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link href="/">
                <span className="font-medium text-gray-700 hover:text-indigo-600 transition-colors">Home</span>
              </Link>
              <Link href="/properties">
                <span className="font-medium text-gray-700 hover:text-indigo-600 transition-colors">Properties</span>
              </Link>
              <Link href="/wallet">
                <span className="font-medium text-gray-700 hover:text-indigo-600 transition-colors">Wallet</span>
              </Link>
              
              {/* Wallet Connection - Mobile */}
              {isConnected ? (
                <div className="flex flex-col space-y-2 pt-3 border-t border-gray-100">
                  <div className="inline-block border border-gray-200 rounded-xl">
                    <div className="bg-white text-gray-800 rounded-xl px-3 py-2 text-sm font-medium inline-block">
                      <div className="text-indigo-600">{formatBalance(balance)} ETH</div>
                      <div className="text-xs text-gray-600">{formatAddress(account)}</div>
                    </div>
                  </div>
                  <button 
                    onClick={disconnectWallet} 
                    className="btn-outline inline-block w-fit text-sm px-3 py-1.5"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <div className="pt-3 border-t border-gray-100">
                  <button 
                    onClick={connectWallet} 
                    className="btn-primary inline-block w-fit text-sm px-4 py-1.5"
                  >
                    Connect Wallet
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 