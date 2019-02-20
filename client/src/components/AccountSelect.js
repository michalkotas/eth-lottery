import React, { Component } from "react";
import { Label, Input, Message, Button } from 'semantic-ui-react';

class AccountSelect extends Component {
  state = {
      value: '',
      errorMessage: '',
      loading: false
  };

  componentDidMount = async () => {
    try {

    } catch (error) {
      console.error(error);
    }
  };

    // onSubmit = async event => {
        // const {web3, contract, accounts} = this.props;
        // event.preventDefault();
        //
        // this.setState({ loading: true, errorMessage: '' });
        //
        // try {
        //     await contract.methods.enter().send({
        //         from: accounts[0],
        //         value: web3.utils.toWei(this.state.value, 'ether')
        //     });
        // } catch (error) {
        //     this.setState({ errorMessage: error.message });
        // }
        //
        // this.setState({ loading: false, value: '' });
    // };

    onChange = event => {
        console.log(event.target.value);
        this.setState({value: event.target.value});
    }


    render() {
        const accounts = this.props.accounts;
        console.log(accounts);
      return (
          <div>
              <Label>Select account</Label>
              <select className="ui dropdown" onChange={this.onChange} value={this.state.value}>
                  {/*<option value="">Gender</option>*/}
                  {/*<option value="1">Male</option>*/}
                  {/*<option value="0">Female</option>*/}
                  {accounts.map((e, key) => {
                      return <option key={key} value={e}>{e}</option>;
                  })}
              </select>
          </div>
      );
  }
}

export default AccountSelect;
