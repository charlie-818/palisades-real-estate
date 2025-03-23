// Deployment script for Palisades Rebuild Token platform
const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying Palisades Token Factory contract...");

  // Get the contract factory
  const PalisadesTokenFactory = await ethers.getContractFactory("PalisadesTokenFactory");
  
  // Deploy the factory
  const factory = await PalisadesTokenFactory.deploy();
  await factory.deployed();
  
  console.log(`PalisadesTokenFactory deployed to: ${factory.address}`);

  // For demo purposes, create a sample property token
  console.log("Creating a sample property token...");
  
  const tx = await factory.createPropertyToken(
    "PALISADES-001", // Property ID
    "123 Ocean View Drive, Palisades", // Property Address
    ethers.utils.parseEther("1000000"), // $1M property value
    1000000, // 1 million tokens
    "Palisades Ocean View Property", // Token name
    "POVP" // Token symbol
  );
  
  // Wait for the transaction to be mined
  const receipt = await tx.wait();
  
  // Find the PropertyTokenCreated event in the receipt
  const event = receipt.events.find(e => e.event === "PropertyTokenCreated");
  
  if (event) {
    const tokenAddress = event.args.tokenAddress;
    console.log(`Sample property token created at: ${tokenAddress}`);
  }
  
  console.log("Deployment completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 