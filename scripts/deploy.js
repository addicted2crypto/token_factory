import hardhat from "hardhat";
const { ethers } = hardhat;
// async function main() {
//     const TipsContract = await ethers.getContractFactory("refactoredTipsContract");
//     const tipsContract = await TipsContract.deploy();
//     const refactoredTipsContract = await refactoredTipsContract.deploy();
//     await tipsContract.deploymentTransaction()?.wait();
//     await tipsContract.waitForDeployment();
//     console.log("Tips deployed to:", tipsContract.getAddress);
// }
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const balance = await deployer.getBalance();
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
