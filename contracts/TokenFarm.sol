pragma solidity >=0.4.21 <0.7.0;

import './DappToken.sol';
import './DaiToken.sol';

contract TokenFarm {
    // pubic is a visibility that allow this value to be access from outside the contract
    string public name = "Dapp Token Farm";
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
    }

    // Stakes Tokens (Deposit)
    function stakeTokens(uint _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0);

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
    
}