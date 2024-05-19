import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const { SEPOLIA_PRIVATE_KEY, API_URL} = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: API_URL,
      accounts: [`0x${SEPOLIA_PRIVATE_KEY}`],

    }
  },
};

export default config;
