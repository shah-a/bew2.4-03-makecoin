// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SmashFighters is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("SSB Fighter", "SSB") {
        for (uint256 i = 1; i <= 12; i++) {
            _mint(msg.sender, i);
        }
    }

    // function awardItem(address player) public returns (uint256) {
    //     _tokenIds.increment();

    //     uint256 newItemId = _tokenIds.current();
    //     _mint(player, newItemId);

    //     return newItemId;
    // }
}
