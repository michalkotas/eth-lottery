import React, { Component } from "react";
import { Form, Input, Message, Button } from 'semantic-ui-react';

class EnterLotteryForm extends Component {
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

    onSubmit = async event => {
        const {web3, contract, account} = this.props;
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        try {
            await contract.methods.enter().send({
                from: account,
                value: web3.utils.toWei(this.state.value, 'ether')
            });
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }

        this.setState({ loading: false, value: '' });
    };


    render() {
      return (
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Form.Field>
                  <Input
                      action={{loading: this.state.loading, content: 'Enter!', icon: 'ethereum', onClick: this.enterLottery}}
                      onChange={event => this.setState({ value: event.target.value })}
                      labelPosition='right'
                      type='text'
                      placeholder='Amount to Enter'
                  >
                  </Input>
              </Form.Field>
              <Message error header="Oops!" content={this.state.errorMessage} />
          </Form>
      );
  }
}

export default EnterLotteryForm;
