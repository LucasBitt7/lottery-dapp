require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("@openzeppelin/hardhat-upgrades");

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
    ],
  },
  defaultNetwork: "rinkeby",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    rinkeby: {
      url:`https://eth-rinkeby.alchemyapi.io/v2/xGtdt4Mu_Kib3_VzN0uoa8s3G57NWPNd`,
      accounts: [process.env.DEPLOY_ACCOUNT_PRIVATE_KEY],
    },
    //  ,
    //  mainnet: {
    //    url: process.env.MAINNET_ENDPOINT,
    //    accounts: [process.env.DEPLOY_ACCOUSNT_PRIVATE_KEY],
    //  }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },
};
