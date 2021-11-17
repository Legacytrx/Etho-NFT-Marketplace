// The following code is used as the main truffle config setup to make your dAPP work with etho on metamask.

const HDWalletProvider = require("@truffle/hdwallet-provider");

var privateKey = "INSERT ETHO PROTOCOL PRIVATE KEY TO DEPLOY CONTRACTS HERE";

module.exports = {
    networks: {
        dev: {
            provider: () => new HDWalletProvider(privateKey, "https://rpc.ether1.org"),
       networkCheckTimeout: 1000000000,
       timeoutBlocks: 200,
            network_id: 1313114
        },
    },
      contracts_directory: './src/contracts',
      contracts_build_directory: './src/abis',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      version: "^0.8.0" 
    }
  }
};
