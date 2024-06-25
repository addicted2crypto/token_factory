const { ethers } = require("hardhat");

require ("@nomicfoundation/hardhat-ethers");


async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
   
    const balance = await deployer.provider.getBalance(deployer.address);
    console.log("Account balance:", balance.toString());

    const TipsContract = await ethers.getContractFactory("TipsContract");
    const tipsContract = await TipsContract.deploy();
    console.log("Contract deployed to address:", tipsContract.address);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
