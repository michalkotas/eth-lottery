import React, {Component} from "react";
import Lottery from "./contracts/Lottery.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";
import EnterLotteryForm from "./components/EnterLotteryForm";
import AccountSelect from "./components/AccountSelect";
import PickWinner from "./components/PickWinner";

class App extends Component {
    state = {
        lotteryBalance: 0,
        players: [],
        web3: null,
        accounts: null,
        owner: null,
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
            this.setState({web3, accounts, selectedAccount: accounts[0], contract: instance}, this.initialLoad);

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    loadBalance = async () => {
        const {web3, contract} = this.state;

        // Get the value from the contract to prove it worked.
        const balance = await contract.methods.getBalance().call();

        // Update state with the result.
        this.setState({lotteryBalance: web3.utils.fromWei(balance, 'ether')});
    };

    loadPlayers = async () => {
        const {contract} = this.state;
        const players = await contract.methods.getPlayers().call();
        this.setState({players});
    };

    loadContractOwner = async () => {
        const {contract} = this.state;
        const owner = await contract.methods.owner().call();
        this.setState({owner});
    };

    initialLoad = async () => {
        await this.loadBalance();
        await this.loadPlayers();
        await this.loadContractOwner();
    };


    onAccountChange = (account) => {
        this.setState({selectedAccount: account});
    };

    onEntered = async () => {
        await this.loadBalance();
        await this.loadPlayers();
    };

    onWinnerPicked = async () => {
        await this.loadBalance();
        await this.loadPlayers();
    };

    render() {
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }

        return (
            <div className="App">
                <AccountSelect
                    account={this.state.selectedAccount}
                    accounts={this.state.accounts}
                    onChange={this.onAccountChange}>
                </AccountSelect>
                {this.state.owner === this.state.selectedAccount &&
                <PickWinner
                    contract={this.state.contract}
                    account={this.state.selectedAccount}
                    onWinnerPicked={this.onWinnerPicked}>>
                </PickWinner>
                }
                <h1>Win some real money!</h1>
                <p>
                    Contract owner is {this.state.owner}
                </p>
                <p>
                    There are {this.state.players.length} players
                </p>
                <div>Lottery balance is: {this.state.lotteryBalance} ether</div>
                <div>
                    <EnterLotteryForm
                        web3={this.state.web3}
                        contract={this.state.contract}
                        account={this.state.selectedAccount}
                        onEntered={this.onEntered}>
                    </EnterLotteryForm>
                </div>
            </div>
        );
    }
}

export default App;
