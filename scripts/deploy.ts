export {};

import { ethers } from "hardhat";

async function main() {
    const TipsContractFactory = await ethers.getContractFactory("TipsContract");
    const tipsContract = await TipsContractFactory.deploy();
    await tipsContract.deploymentTransaction.wait();
    console.log("Tips deployed to:", tipsContract.target);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  