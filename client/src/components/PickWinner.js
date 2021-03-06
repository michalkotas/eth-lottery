import React, { Component } from "react";
import { Message, Button } from "semantic-ui-react";

class PickWinner extends Component {
    state = {
        message: '',
        errorMessage: '',
        loading: false
    };

    onClick = async () => {
        const {contract, account} = this.props;

        this.setState({ loading: true, errorMessage: '', message: '' });

        try {
            await contract.methods.pickWinner().send({
                from: account,
            });
            this.props.onWinnerPicked();
            this.setState({ message: 'A winner has been picked!' });
        } catch (error) {
            this.setState({ errorMessage: error.message, message: '' });
        }

        this.setState({ loading: false });
    };

    render() {
        return (
            <div>
                <Button className="ui labeled icon button"
                        loading={this.state.loading}
                        onClick={this.onClick}>
                    <i className="share square icon"></i>
                    Pick winner!
                </Button>
                <Message hidden={this.state.message.length === 0} positive header="Yeah!" content={this.state.message} />
                <Message hidden={!this.state.errorMessage} error header="Oops!" content={this.state.errorMessage} />
            </div>
        );
    }
}

export default PickWinner;
