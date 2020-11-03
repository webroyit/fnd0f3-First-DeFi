// Put new contracts on the blockchain
// Blockchain is like a database

const TokenFarm = artifacts.require("TokenFarm");

module.exports = function (deployer) {
  deployer.deploy(TokenFarm);
};
