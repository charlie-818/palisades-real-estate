const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PalisadesTokenFactory", function () {
  let PalisadesTokenFactory;
  let factory;
  let owner;
  let nonOwner;
  
  beforeEach(async function () {
    // Get signers
    [owner, nonOwner] = await ethers.getSigners();
    
    // Deploy factory contract
    PalisadesTokenFactory = await ethers.getContractFactory("PalisadesTokenFactory");
    factory = await PalisadesTokenFactory.deploy();
    await factory.deployed();
  });
  
  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await factory.owner()).to.equal(owner.address);
    });
    
    it("Should start with no property tokens", async function () {
      expect(await factory.getPropertyTokenCount()).to.equal(0);
    });
  });
  
  describe("Token Creation", function () {
    const propertyId = "TEST-002";
    const propertyAddress = "456 Test Avenue, Palisades";
    const propertyValue = ethers.utils.parseEther("2000000"); // $2M
    const totalTokenSupply = 2000000; // 2 million tokens
    const tokenName = "Test Property Token 2";
    const tokenSymbol = "TPT2";
    
    it("Should create a new property token", async function () {
      await factory.createPropertyToken(
        propertyId,
        propertyAddress,
        propertyValue,
        totalTokenSupply,
        tokenName,
        tokenSymbol
      );
      
      expect(await factory.getPropertyTokenCount()).to.equal(1);
      
      const tokenAddress = await factory.getPropertyTokenByPropertyId(propertyId);
      expect(tokenAddress).to.not.equal(ethers.constants.AddressZero);
      
      // Verify the token at index 0 is the same address
      expect(await factory.getPropertyTokenAtIndex(0)).to.equal(tokenAddress);
      
      // Verify the token's properties
      const PalisadesRebuildToken = await ethers.getContractFactory("PalisadesRebuildToken");
      const token = PalisadesRebuildToken.attach(tokenAddress);
      
      expect(await token.propertyId()).to.equal(propertyId);
      expect(await token.propertyAddress()).to.equal(propertyAddress);
      expect(await token.propertyValue()).to.equal(propertyValue);
      expect(await token.totalTokenSupply()).to.equal(totalTokenSupply);
      expect(await token.name()).to.equal(tokenName);
      expect(await token.symbol()).to.equal(tokenSymbol);
      expect(await token.owner()).to.equal(owner.address);
    });
    
    it("Should not allow non-owners to create tokens", async function () {
      await expect(
        factory.connect(nonOwner).createPropertyToken(
          propertyId,
          propertyAddress,
          propertyValue,
          totalTokenSupply,
          tokenName,
          tokenSymbol
        )
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
    
    it("Should not allow duplicate property IDs", async function () {
      await factory.createPropertyToken(
        propertyId,
        propertyAddress,
        propertyValue,
        totalTokenSupply,
        tokenName,
        tokenSymbol
      );
      
      await expect(
        factory.createPropertyToken(
          propertyId, // Same property ID
          "Different Address",
          propertyValue,
          totalTokenSupply,
          "Different Name",
          "DIFF"
        )
      ).to.be.revertedWith("Property ID already exists");
    });
  });
  
  describe("Token Retrieval", function () {
    it("Should fail to get a token at an invalid index", async function () {
      await expect(
        factory.getPropertyTokenAtIndex(0)
      ).to.be.revertedWith("Index out of bounds");
    });
    
    it("Should fail to get a token with a non-existent property ID", async function () {
      await expect(
        factory.getPropertyTokenByPropertyId("NON-EXISTENT")
      ).to.be.revertedWith("Property not found");
    });
  });
}); 