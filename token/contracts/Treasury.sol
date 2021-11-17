// SPDX-License-Identifier: GPL-3.0
// change public functions to external??
pragma solidity ^0.8.9;

import "./ICO.sol";

contract Treasury {
    uint public balance;

    constructor() {
    }

    receive() external payable {
        balance += msg.value;
    }
}