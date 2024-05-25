import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const { PRIVATE_KEY, API_URL } = process.env;


if (!PRIVATE_KEY || !API_URL) {
  throw new Error("Please set your PRIVATE_KEY and SEPOLIA_URL in a .env file");
}
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: API_URL,
      accounts: [PRIVATE_KEY],

    },
  },
};

export default config;
