import Image from 'next/image';
import Link from 'next/link';

export default function PropertyCard({ property }) {
  const {
    propertyId,
    propertyAddress,
    propertyValue,
    tokenPrice,
    totalTokenSupply,
    totalInvestment,
    isActive,
    imageUrl = 'https://images.unsplash.com/photo-1494526585095-c41cadba3fa2'
  } = property;
  
  // Calculate investment progress
  const investmentProgress = totalInvestment && propertyValue 
    ? (parseFloat(totalInvestment) / parseFloat(propertyValue) * 100).toFixed(2)
    : 0;
    
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="card flex flex-col h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Property Image */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={propertyAddress || 'Property'}
          fill
          className="object-cover rounded-t-lg"
        />
        
        {/* Active/Inactive Status */}
        {isActive !== undefined && (
          <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded ${
            isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isActive ? 'Active' : 'Inactive'}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{propertyAddress}</h3>
        
        <div className="mb-4 flex flex-col space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Property Value:</span>
            <span className="font-medium">{formatCurrency(propertyValue)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Token Price:</span>
            <span className="font-medium">{formatCurrency(tokenPrice)}</span>
          </div>
          
          {totalTokenSupply && (
            <div className="flex justify-between">
              <span className="text-gray-600">Total Tokens:</span>
              <span className="font-medium">{parseInt(totalTokenSupply).toLocaleString()}</span>
            </div>
          )}
        </div>
        
        {/* Investment Progress */}
        {investmentProgress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Investment Progress</span>
              <span className="text-sm font-medium">{investmentProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary-600 h-2.5 rounded-full"
                style={{ width: `${Math.min(100, investmentProgress)}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Action Button */}
        <div className="mt-auto pt-4">
          <Link href={`/properties/${propertyId}`}>
            <button className="btn-primary w-full">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
} 