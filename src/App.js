import React, { Component } from 'react';
import Web3 from 'web3';
import DaiToken from './abis/DaiToken.json';
import DappToken from './abis/DappToken.json';
import TokenFarm from './abis/TokenFarm.json';
import './App.css';
import Navbar from './components/Navbar';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      account: '',
      daiToken: {},
      dappToken: {},
      tokenFarm: {},
      daiTokenBalance: '0',
      dappTokenBalance: '0',
      stakingBalance: '0',
      loading: true
    }
  }

  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  // Connect the app to the blockchain
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData(){
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();

    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId];
    if(daiTokenData){
      // Create a JS version of the smart contract
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address);
      this.setState({ daiToken });

      // Get the balance
      // call() to execute the function
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call();
      this.setState({ daiTokenBalance: daiTokenBalance.toString() });
    }
    else{
      window.alert('DaiToken contract not deployed to detected network');
    }

    // Load DappToken
    const dappTokenData = DappToken.networks[networkId]
    if(dappTokenData) {
      const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address)
      this.setState({ dappToken });

      let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call()
      this.setState({ dappTokenBalance: dappTokenBalance.toString() });
    } else {
      window.alert('DappToken contract not deployed to detected network.')
    }

    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId]
    if(tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      this.setState({ tokenFarm });

      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() });
    } else {
      window.alert('TokenFarm contract not deployed to detected network.')
    }

    this.setState({ loading: false });
  }

  render(){
    return (
      <div className="App">
        <Navbar account={this.state.account}/>
        <div className="container-fluid mt-5">
          <h1>First DeFi</h1>
        </div>
      </div>
    );
  }
}

export default App;
