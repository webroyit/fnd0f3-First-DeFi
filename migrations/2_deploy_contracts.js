// Put new contracts on the blockchain
// Blockchain is like a database

const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function (deployer, network, accounts) {
  // Deploy Fake DAI Token
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  // Deploy Dapp Token
  await deployer.deploy(DappToken);
  const dappToken = await DappToken.deployed();

  // Deploy Token Farm
  await deployer.deploy(TokenFarm, dappToken.address, daiToken.address);
  const tokenFarm = await TokenFarm.deployed();

  // Transfer all tokens to TokenFarm (1 millions)
  await dappToken.transfer(tokenFarm.address, '1000000000000000000000000');

  // Transfer 100 Fake DAI Tokens to investor
  await daiToken.transfer(accounts[1], '1000000000000000000000000');
};
