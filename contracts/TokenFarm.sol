pragma solidity >=0.4.21 <0.7.0;

import './DappToken.sol';
import './DaiToken.sol';

contract TokenFarm {
    // pubic is a visibility that allow this value to be access from outside the contract
    string public name = "Dapp Token Farm";
    DappToken public dappToken;
    DaiToken public daiToken;

    // Access these contracts
    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
    }
}