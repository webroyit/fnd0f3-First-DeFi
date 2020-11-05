const { assert } = require('chai');

const DaiToken = artifacts.require('DaiToken');
const DappToken = artifacts.require('DappToken');
const TokenFarm = artifacts.require('TokenFarm');

require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('TokenFarm', ([owner, investor]) => {
  let daiToken;
  let dappToken;
  let tokenFarm;

  before(async () => {
    // Load Contracts
    daiToken = await DaiToken.new();
    dappToken = await DappToken.new();
    tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address);

    // Transfer all Dapp tokens to farm (1 million)
    await dappToken.transfer(tokenFarm.address, '1000000000000000000000000');

    // Transfer 100 Fake DAI Tokens to investor
    await daiToken.transfer(investor, '1000000000000000000000000', { from: owner });
  })

  describe('Fake Dai deployement', async () => {
    it('has a name', async () => {
      const name = await daiToken.name();
      assert.equal(name, 'Fake DAI Token');
    })
  })

  describe('Dapp Token deployement', async () => {
    it('has a name', async () => {
      const name = await dappToken.name();
      assert.equal(name, 'DApp Token');
    })
  })

  describe('Token Farm deployement', async () => {
    it('has a name', async () => {
      const name = await tokenFarm.name();
      assert.equal(name, 'Dapp Token Farm');
    })

    it('contract has token', async () => {
      let balance = await dappToken.balanceOf(tokenFarm.address);
      assert.equal(balance, '1000000000000000000000000');
    })
  })
});