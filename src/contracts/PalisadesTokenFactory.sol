// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./PalisadesRebuildToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PalisadesTokenFactory
 * @dev Factory contract for creating and tracking property tokens
 */
contract PalisadesTokenFactory is Ownable {
    // Array to keep track of all property tokens
    address[] public propertyTokens;
    
    // Mapping from property ID to token address
    mapping(string => address) public propertyIdToToken;
    
    // Event emitted when a new property token is created
    event PropertyTokenCreated(
        string propertyId,
        string propertyAddress,
        address tokenAddress,
        uint256 propertyValue,
        uint256 totalTokenSupply
    );
    
    /**
     * @dev Creates a new property token
     * @param _propertyId Unique identifier for the property
     * @param _propertyAddress Physical address of the property
     * @param _propertyValue Total valuation of the property
     * @param _totalTokenSupply Total number of tokens representing the property
     * @param _tokenName Name of the token
     * @param _tokenSymbol Symbol for the token
     * @return Address of the newly created property token
     */
    function createPropertyToken(
        string memory _propertyId,
        string memory _propertyAddress,
        uint256 _propertyValue,
        uint256 _totalTokenSupply,
        string memory _tokenName,
        string memory _tokenSymbol
    ) public onlyOwner returns (address) {
        // Check that property ID is not already used
        require(propertyIdToToken[_propertyId] == address(0), "Property ID already exists");
        
        // Create new property token
        PalisadesRebuildToken newToken = new PalisadesRebuildToken(
            _propertyId,
            _propertyAddress,
            _propertyValue,
            _totalTokenSupply,
            _tokenName,
            _tokenSymbol
        );
        
        // Transfer ownership to the factory owner
        newToken.transferOwnership(owner());
        
        // Record the new token
        address tokenAddress = address(newToken);
        propertyTokens.push(tokenAddress);
        propertyIdToToken[_propertyId] = tokenAddress;
        
        // Emit creation event
        emit PropertyTokenCreated(
            _propertyId,
            _propertyAddress,
            tokenAddress,
            _propertyValue,
            _totalTokenSupply
        );
        
        return tokenAddress;
    }
    
    /**
     * @dev Gets the total number of property tokens created
     * @return Total number of property tokens
     */
    function getPropertyTokenCount() public view returns (uint256) {
        return propertyTokens.length;
    }
    
    /**
     * @dev Gets property token by index
     * @param _index Index in the property tokens array
     * @return Address of the property token
     */
    function getPropertyTokenAtIndex(uint256 _index) public view returns (address) {
        require(_index < propertyTokens.length, "Index out of bounds");
        return propertyTokens[_index];
    }
    
    /**
     * @dev Gets property token by property ID
     * @param _propertyId Unique property identifier
     * @return Address of the property token
     */
    function getPropertyTokenByPropertyId(string memory _propertyId) public view returns (address) {
        address tokenAddress = propertyIdToToken[_propertyId];
        require(tokenAddress != address(0), "Property not found");
        return tokenAddress;
    }
} 