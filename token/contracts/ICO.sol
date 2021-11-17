// SPDX-License-Identifier: GPL-3.0
// change public functions to external??
pragma solidity ^0.8.9;

import "./SpaceCoin.sol";
import "./Treasury.sol";
import "hardhat/console.sol";

contract ICO {
    address public creator;
    bool public enableTax;
    uint public goal = 30000 * 1 ether;
    uint public seedRaised;
    uint public generalRaised;
    uint public openRaised;
    uint public totalRaised;
    bool public isPaused;
    mapping (address => uint) public seedContributions;
    mapping (address => uint) public generalContributions;
    mapping (address => bool) public whitelisted;
    Treasury public treasury;
    SpaceCoin public token;
    Phases public phase;
    
    enum Phases {
        NOTSTARTED,
        SEED,
        GENERAL,
        OPEN,
        CLOSED
    }

    // our max supply should be 500,000 total. Just have the creator mint all 500,000 at the start
    constructor() {
        creator = msg.sender;
        token = new SpaceCoin();
        treasury = new Treasury();
        phase = Phases.NOTSTARTED;
        enableTax = true;
    }

    modifier onlyOwner() {
        require(msg.sender == creator);
        _;
    }

    modifier notPaused() {
        require(!isPaused);
        _;
    }

    function getToken() public view returns(SpaceCoin) {
        return token;
    }

    function getTreasury() public view returns(Treasury) {
        return treasury;
    }

    function pause() public onlyOwner {
        isPaused = true;
    }

    function resume() public onlyOwner {
        isPaused = false;
    }

    function nextPhase() public onlyOwner{
        phase = Phases(uint(phase) + 1);
    }

    function currentPhase() public view returns (Phases) {
        return phase;
    }

    function deactivateTax() public onlyOwner {
        enableTax = false;
    }

    function activateTax() public onlyOwner {
        enableTax = true;
    }

    function whitelist(address _person) public onlyOwner {
        whitelisted[_person] = true;
    }

    function removeWhitelist(address _person) public onlyOwner {
        delete whitelisted[_person];
    }


    // ------------------------------------------------------------------------
    // 1,000 FWD Tokens per 1 ETH
    // ------------------------------------------------------------------------
    function contribute() public payable notPaused {
        uint tokens;
        // 5 to 1 split
        tokens = msg.value * 5;
        // require SpaceCoin has enough left 
        //require(token.balanceOf(address(this)) >= tokens);
        
        if (phase == Phases.SEED) {
            checkSeed(msg.sender, tokens);
        }
        else if (phase == Phases.GENERAL) {
            checkGeneral(msg.sender, tokens);

        }
        else if (phase == Phases.OPEN) {
        }

        token.transfer(msg.sender, tokens);
    }

    receive() external payable {

    }


    function checkSeed(address _contributor, uint _tokens) private view notPaused{
        //require(seedContributions[_contributor] + _tokens <= 1.5 ether);
        //require(totalRaised + _tokens <= 15000 ether);
    }

    function checkGeneral(address _contributor, uint _tokens) private view notPaused{
        require(generalContributions[_contributor] + _tokens <= 1.5 ether);
        require(totalRaised + _tokens <= 30000 ether);  
    }

    function checkOpen(address _contributor) private notPaused{
        
    }




    // ------------------------------------------------------------------------
    // Owner can transfer out any accidentally sent ERC20 tokens
    // ------------------------------------------------------------------------
    // function transferAnyERC20Token(address tokenAddress, uint tokens) public onlyOwner returns (bool success) {
    //     return ERC20Interface(tokenAddress).transfer(owner, tokens);
    // }

    function sendTax(uint _totalAmount) private {
        require(enableTax);
        uint taxAmount =  (_totalAmount * 2) / 100;
        (bool success) = token.transfer(address(treasury), taxAmount);
        require(success);
    }
    
}

