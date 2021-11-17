// SPDX-License-Identifier: GPL-3.0
// change public functions to external??
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// import "./treasury.sol"; // make this dynamic for fs.readfile?

contract SpaceCoin is ERC20 {

    constructor() ERC20("SpaceCoin", "Space") {
        _mint(msg.sender, 500000 ether);
    }
}

interface ISpaceCoin is IERC20 {

}