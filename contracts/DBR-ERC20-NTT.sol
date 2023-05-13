// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "OpenZeppelin/openzeppelin-contracts@4.8.3/contracts/token/ERC20/ERC20.sol";
import "OpenZeppelin/openzeppelin-contracts@4.8.3/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "OpenZeppelin/openzeppelin-contracts@4.8.3/contracts/security/Pausable.sol";
import "OpenZeppelin/openzeppelin-contracts@4.8.3/contracts/access/Ownable.sol";
import "OpenZeppelin/openzeppelin-contracts@4.8.3/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "OpenZeppelin/openzeppelin-contracts@4.8.3/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract DBrainsToken is
    ERC20,
    ERC20Burnable,
    Pausable,
    Ownable,
    ERC20Permit,
    ERC20Votes
{
    constructor() ERC20("DBrains Token", "DBR") ERC20Permit("DBrains Token") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(
        address account,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }

    // Overriding the _transfer function to render the token non-transferable (NTToken)

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20) {
        revert("This token is non-transferable");
    }
}
