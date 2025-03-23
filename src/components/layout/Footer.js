import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-600 py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Sharmo Logo */}
          <div className="flex items-center mb-4 md:mb-0">
            <div className="h-5 w-5 bg-gray-800 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <div className="ml-2 border-l border-gray-200 pl-2">
              <span className="text-sm font-bold text-gray-800">SHARMO</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="/">
              <span className="text-sm hover:text-indigo-600 transition">Home</span>
            </Link>
            <Link href="/properties">
              <span className="text-sm hover:text-indigo-600 transition">Properties</span>
            </Link>
            <Link href="/wallet">
              <span className="text-sm hover:text-indigo-600 transition">Wallet</span>
            </Link>
          </div>
          
          {/* Copyright */}
          <div className="text-xs text-gray-500">
            <p className="m-0">&copy; {new Date().getFullYear()} Sharmo Real Estate</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 