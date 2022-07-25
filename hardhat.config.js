require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const { API_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "mumbai",
    networks: {
      hardhat: {
      },
      mumbai : {
        url: API_URL, 
        accounts: [PRIVATE_KEY]
      }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};
