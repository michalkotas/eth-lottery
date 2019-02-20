import React, { Component } from "react";
import Lottery from "./contracts/Lottery.json";
import { Input, Label } from 'semantic-ui-react'
import getWeb3 from "./utils/getWeb3";

import "./App.css";
import EnterLotteryForm from "./components/EnterLotteryForm";
import AccountSelect from "./components/AccountSelect";

class App extends Component {
  state = {
      lotteryBalance: 0,
      web3: null,
      accounts: null,
      selectedAccount: '',
      contract: null
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Lottery.networks[networkId];
      const instance = new web3.eth.Contract(
          Lottery.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.loadContractDetails);

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  loadContractDetails = async () => {
    const { web3, accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const balance = await contract.methods.getBalance().call();

    // Update state with the result.
    this.setState({ lotteryBalance: web3.utils.fromWei(balance, 'ether')});
  };

  enterLottery = (event) => {
    console.log('enterLottery', event)
  };

  onAccountChange = (account) => {
      this.setState({selectedAccount: account});
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
          <AccountSelect account={this.state.selectedAccount} accounts={this.state.accounts} onChange={this.onAccountChange}></AccountSelect>
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Selected account is {this.state.selectedAccount}
        </p>
        <div>Lottery balance is: {this.state.lotteryBalance}</div>
        <div>
            <EnterLotteryForm web3={this.state.web3} contract={this.state.contract} account={this.state.selectedAccount} ></EnterLotteryForm>
        </div>
      </div>
    );
  }
}

export default App;
