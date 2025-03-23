import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  const [fadeOut, setFadeOut] = useState(false);
  
  useEffect(() => {
    // Start fade out animation after 1.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1500);
    
    return () => clearTimeout(fadeTimer);
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-50
                  ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                  transition-opacity duration-500`}
    >      
      <div className="relative flex flex-col items-center">
        {/* Logo container */}
        <div className="relative mb-8 bg-white rounded-full p-4 shadow-sm">
          <Image 
            src="/images/logo.png" 
            alt="Sharmo Logo" 
            width={80} 
            height={80}
            className="object-contain"
          />
        </div>
        
        {/* Loading text */}
        <h2 className="text-xl font-poppins font-semibold text-indigo-600 mb-4">
          Loading Sharmo
        </h2>
        
        {/* Loading spinner - simplified */}
        <div className="h-1.5 w-36 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-600 rounded-full animate-pulse" style={{ width: '70%' }}></div>
        </div>
      </div>
    </div>
  );
} 