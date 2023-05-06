// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NTT.sol";
import "./NTTBurnable.sol";
import "./Pausable.sol";
import "./Ownable.sol";

contract DBRAINSNTT is NTT, NTTBurnable, Pausable, Ownable {
    constructor() NTT("DBRAINS NTT", "DBR") {}

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
}
