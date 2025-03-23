require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      chainId: 1337
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80" // Default hardhat account #0 private key
      ]
    },
    // For production, you'd add configurations for Ethereum, Polygon, etc.
  },
  paths: {
    artifacts: "./src/blockchain/artifacts",
    sources: "./src/contracts",
    cache: "./src/blockchain/cache",
    tests: "./src/blockchain/test"
  }
}; 