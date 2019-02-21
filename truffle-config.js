const path = require("path");
const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*"
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider('mnemonic', 'https://rinkeby.infura.io/v3/KEY');
      },
      network_id: 4,
    }
  }
};
