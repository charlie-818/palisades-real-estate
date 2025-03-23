// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title PalisadesRebuildToken
 * @dev Contract for tokenizing real estate properties in the Palisades rebuilding project
 */
contract PalisadesRebuildToken is ERC20, Ownable, ReentrancyGuard {
    // Property Information
    string public propertyId;
    string public propertyAddress;
    uint256 public propertyValue;
    uint256 public totalTokenSupply;
    uint256 public tokenPrice;
    
    // Investment tracking
    mapping(address => uint256) public investments;
    uint256 public totalInvestment;
    
    // Property status
    bool public isActive = true;
    
    // Revenue tracking
    uint256 public totalRevenueGenerated;
    uint256 public totalRevenueDistributed;
    
    // Events
    event TokensPurchased(address indexed buyer, uint256 amount, uint256 tokenCount);
    event RevenueDeposited(uint256 amount);
    event RevenueDistributed(uint256 amount);
    event PropertyStatusChanged(bool isActive);
    
    /**
     * @dev Constructor creates a new property token
     * @param _propertyId Unique identifier for the property
     * @param _propertyAddress Physical address of the property
     * @param _propertyValue Total valuation of the property
     * @param _totalTokenSupply Total number of tokens representing the property
     * @param _tokenName Name of the token
     * @param _tokenSymbol Symbol for the token
     */
    constructor(
        string memory _propertyId,
        string memory _propertyAddress,
        uint256 _propertyValue,
        uint256 _totalTokenSupply,
        string memory _tokenName,
        string memory _tokenSymbol
    ) ERC20(_tokenName, _tokenSymbol) {
        propertyId = _propertyId;
        propertyAddress = _propertyAddress;
        propertyValue = _propertyValue;
        totalTokenSupply = _totalTokenSupply;
        tokenPrice = _propertyValue / _totalTokenSupply;
    }
    
    /**
     * @dev Allows investors to purchase tokens for a property
     * @param tokenAmount Number of tokens to purchase
     */
    function purchaseTokens(uint256 tokenAmount) public payable nonReentrant {
        require(isActive, "Property is not active for investment");
        require(tokenAmount > 0, "Token amount must be greater than 0");
        require(totalSupply() + tokenAmount <= totalTokenSupply, "Exceeds available tokens");
        
        uint256 cost = tokenAmount * tokenPrice;
        require(msg.value >= cost, "Insufficient funds sent");
        
        // Mint tokens to buyer
        _mint(msg.sender, tokenAmount);
        
        // Track investment
        investments[msg.sender] += cost;
        totalInvestment += cost;
        
        // Refund excess payment
        uint256 excess = msg.value - cost;
        if (excess > 0) {
            payable(msg.sender).transfer(excess);
        }
        
        emit TokensPurchased(msg.sender, cost, tokenAmount);
    }
    
    /**
     * @dev Allows property manager to deposit revenue (e.g., rental income)
     */
    function depositRevenue() public payable onlyOwner {
        require(msg.value > 0, "Must deposit some revenue");
        
        totalRevenueGenerated += msg.value;
        
        emit RevenueDeposited(msg.value);
    }
    
    /**
     * @dev Distributes available revenue to token holders
     */
    function distributeRevenue() public onlyOwner nonReentrant {
        uint256 availableRevenue = totalRevenueGenerated - totalRevenueDistributed;
        require(availableRevenue > 0, "No revenue to distribute");
        
        totalRevenueDistributed += availableRevenue;
        
        emit RevenueDistributed(availableRevenue);
        
        // Calculate distribution per token
        uint256 revenuePerToken = availableRevenue / totalSupply();
        
        // Distribute to each token holder based on their balance
        for (uint i = 0; i < _getHolderCount(); i++) {
            address holder = _getHolder(i);
            uint256 holderBalance = balanceOf(holder);
            if (holderBalance > 0) {
                uint256 holderRevenue = holderBalance * revenuePerToken;
                payable(holder).transfer(holderRevenue);
            }
        }
    }
    
    /**
     * @dev Changes property active status
     * @param _isActive New active status
     */
    function setPropertyStatus(bool _isActive) public onlyOwner {
        isActive = _isActive;
        emit PropertyStatusChanged(_isActive);
    }
    
    /**
     * @dev Updates property valuation
     * @param _newValue New property valuation
     */
    function updatePropertyValue(uint256 _newValue) public onlyOwner {
        propertyValue = _newValue;
        tokenPrice = _newValue / totalTokenSupply;
    }
    
    // NOTE: The following functions are placeholders that would need to be implemented
    // with a data structure to track token holders
    function _getHolderCount() internal view returns (uint256) {
        // In production, implement a mechanism to track all token holders
        return 1;
    }
    
    function _getHolder(uint256 index) internal view returns (address) {
        // In production, implement a mechanism to retrieve token holders by index
        return owner();
    }
} 