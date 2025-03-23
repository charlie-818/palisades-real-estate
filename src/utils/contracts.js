import { ethers } from 'ethers';

// Contract addresses (would be updated after deployment)
export const FACTORY_ADDRESS = "0x..."; // Replace with actual address after deployment

// Import ABI definitions
// In production, these would be imported from the build artifacts
export const FACTORY_ABI = [
  "function createPropertyToken(string propertyId, string propertyAddress, uint256 propertyValue, uint256 totalTokenSupply, string tokenName, string tokenSymbol) external returns (address)",
  "function getPropertyTokenCount() external view returns (uint256)",
  "function getPropertyTokenAtIndex(uint256 index) external view returns (address)",
  "function getPropertyTokenByPropertyId(string propertyId) external view returns (address)",
  "function propertyTokens(uint256) external view returns (address)",
  "function propertyIdToToken(string) external view returns (address)",
  "event PropertyTokenCreated(string propertyId, string propertyAddress, address tokenAddress, uint256 propertyValue, uint256 totalTokenSupply)"
];

export const TOKEN_ABI = [
  "function propertyId() external view returns (string)",
  "function propertyAddress() external view returns (string)",
  "function propertyValue() external view returns (uint256)",
  "function totalTokenSupply() external view returns (uint256)",
  "function tokenPrice() external view returns (uint256)",
  "function investments(address) external view returns (uint256)",
  "function totalInvestment() external view returns (uint256)",
  "function isActive() external view returns (bool)",
  "function totalRevenueGenerated() external view returns (uint256)",
  "function totalRevenueDistributed() external view returns (uint256)",
  "function balanceOf(address) external view returns (uint256)",
  "function purchaseTokens(uint256 tokenAmount) external payable",
  "function depositRevenue() external payable",
  "function distributeRevenue() external",
  "function setPropertyStatus(bool isActive) external",
  "function updatePropertyValue(uint256 newValue) external",
  "event TokensPurchased(address indexed buyer, uint256 amount, uint256 tokenCount)",
  "event RevenueDeposited(uint256 amount)",
  "event RevenueDistributed(uint256 amount)",
  "event PropertyStatusChanged(bool isActive)"
];

// Factory contract instance
export function getFactoryContract(signerOrProvider) {
  return new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signerOrProvider);
}

// Token contract instance
export function getTokenContract(tokenAddress, signerOrProvider) {
  return new ethers.Contract(tokenAddress, TOKEN_ABI, signerOrProvider);
}

// Create a new property token
export async function createPropertyToken(
  signer,
  propertyId,
  propertyAddress,
  propertyValue,
  totalTokenSupply,
  tokenName,
  tokenSymbol
) {
  try {
    const factory = getFactoryContract(signer);
    const tx = await factory.createPropertyToken(
      propertyId,
      propertyAddress,
      propertyValue,
      totalTokenSupply,
      tokenName,
      tokenSymbol
    );
    
    const receipt = await tx.wait();
    const event = receipt.events.find(e => e.event === "PropertyTokenCreated");
    
    if (event) {
      return {
        success: true,
        tokenAddress: event.args.tokenAddress,
        txHash: receipt.transactionHash
      };
    }
    
    return {
      success: false,
      error: "Property token created but event not found"
    };
  } catch (error) {
    console.error("Error creating property token:", error);
    return {
      success: false,
      error: error.message || "Unknown error"
    };
  }
}

// Get all property tokens
export async function getAllPropertyTokens(provider) {
  try {
    const factory = getFactoryContract(provider);
    const count = await factory.getPropertyTokenCount();
    
    const tokens = [];
    for (let i = 0; i < count; i++) {
      const tokenAddress = await factory.getPropertyTokenAtIndex(i);
      const token = getTokenContract(tokenAddress, provider);
      
      // Get token details
      const [
        propertyId,
        propertyAddress,
        propertyValue,
        totalTokenSupply,
        tokenPrice,
        totalInvestment,
        isActive
      ] = await Promise.all([
        token.propertyId(),
        token.propertyAddress(),
        token.propertyValue(),
        token.totalTokenSupply(),
        token.tokenPrice(),
        token.totalInvestment(),
        token.isActive()
      ]);
      
      tokens.push({
        address: tokenAddress,
        propertyId,
        propertyAddress,
        propertyValue: ethers.utils.formatEther(propertyValue),
        totalTokenSupply: totalTokenSupply.toString(),
        tokenPrice: ethers.utils.formatEther(tokenPrice),
        totalInvestment: ethers.utils.formatEther(totalInvestment),
        isActive
      });
    }
    
    return tokens;
  } catch (error) {
    console.error("Error getting property tokens:", error);
    return [];
  }
}

// Get property token by ID
export async function getPropertyTokenById(provider, propertyId) {
  try {
    const factory = getFactoryContract(provider);
    const tokenAddress = await factory.getPropertyTokenByPropertyId(propertyId);
    
    if (tokenAddress === ethers.constants.AddressZero) {
      return null;
    }
    
    const token = getTokenContract(tokenAddress, provider);
    
    // Get token details
    const [
      propertyAddress,
      propertyValue,
      totalTokenSupply,
      tokenPrice,
      totalInvestment,
      isActive,
      totalRevenueGenerated,
      totalRevenueDistributed
    ] = await Promise.all([
      token.propertyAddress(),
      token.propertyValue(),
      token.totalTokenSupply(),
      token.tokenPrice(),
      token.totalInvestment(),
      token.isActive(),
      token.totalRevenueGenerated(),
      token.totalRevenueDistributed()
    ]);
    
    return {
      address: tokenAddress,
      propertyId,
      propertyAddress,
      propertyValue: ethers.utils.formatEther(propertyValue),
      totalTokenSupply: totalTokenSupply.toString(),
      tokenPrice: ethers.utils.formatEther(tokenPrice),
      totalInvestment: ethers.utils.formatEther(totalInvestment),
      isActive,
      totalRevenueGenerated: ethers.utils.formatEther(totalRevenueGenerated),
      totalRevenueDistributed: ethers.utils.formatEther(totalRevenueDistributed)
    };
  } catch (error) {
    console.error("Error getting property token:", error);
    return null;
  }
}

// Purchase tokens for a property
export async function purchasePropertyTokens(signer, tokenAddress, tokenAmount, ethAmount) {
  try {
    const token = getTokenContract(tokenAddress, signer);
    
    const tx = await token.purchaseTokens(tokenAmount, {
      value: ethers.utils.parseEther(ethAmount)
    });
    
    const receipt = await tx.wait();
    
    return {
      success: true,
      txHash: receipt.transactionHash
    };
  } catch (error) {
    console.error("Error purchasing property tokens:", error);
    return {
      success: false,
      error: error.message || "Unknown error"
    };
  }
}

// Get investor's token balance
export async function getInvestorTokenBalance(provider, tokenAddress, investorAddress) {
  try {
    const token = getTokenContract(tokenAddress, provider);
    const balance = await token.balanceOf(investorAddress);
    
    return {
      balance: balance.toString(),
      investment: ethers.utils.formatEther(await token.investments(investorAddress))
    };
  } catch (error) {
    console.error("Error getting investor token balance:", error);
    return {
      balance: "0",
      investment: "0"
    };
  }
} 