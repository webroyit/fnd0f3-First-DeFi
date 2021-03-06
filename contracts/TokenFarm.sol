pragma solidity >=0.4.21 <0.7.0;

import './DappToken.sol';
import './DaiToken.sol';

contract TokenFarm {
    // pubic is a visibility that allow this value to be access from outside the contract
    string public name = "Dapp Token Farm";
    address public owner;
    DappToken public dappToken;
    DaiToken public daiToken;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    // Access these contracts
    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    // Stakes Tokens (Deposit)
    function stakeTokens(uint _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Transfer Fake Dai Tokens to this contract for staking
        // Move the funds on the behalf of the investor
        // address(this) is the address of this contract
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Add user to stakers array only if they have not staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        hasStaked[msg.sender] = true;
        isStaking[msg.sender] = true;
    }

    // Issuing Tokens
    function issueTokens() public {
        // Only the owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Issue tokens to all stakers
        for(uint i = 0; i < stakers.length; i++) {
            // Investor's address
            address recipient = stakers[i];

            // Investor's balance
            uint balance = stakingBalance[recipient];

            if(balance > 0) {
                dappToken.transfer(recipient, balance);
            }  
        }
    }

    // Unstaking Token (Withdraw)
    function unstakeTokens() public {
        // Fetch staking balance
        uint balance = stakingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");

        // Transfer Fake Dai tokens to this contract for staking
        daiToken.transfer(msg.sender, balance);

        // Reset staking balance
        stakingBalance[msg.sender] = 0;

        // Update staking status
        isStaking[msg.sender] = false;
    }
}