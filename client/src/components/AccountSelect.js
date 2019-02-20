import React, { Component } from "react";

class AccountSelect extends Component {

    onChange = event => {
        this.props.onChange(event.target.value);
    };

    render() {
      return (
          <div>
              <select className="ui dropdown" onChange={this.onChange} value={this.props.account}>
                  {this.props.accounts.map((e, key) => {
                      return <option key={key} value={e}>{key+1}: {e}</option>;
                  })}
              </select>
          </div>
      );
  }
}

export default AccountSelect;
