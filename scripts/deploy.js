import hardhat from "hardhat";
const { ethers } = hardhat;
import { parseEther} from ethers;

// async function main() {
//     const TipsContract = await ethers.getContractFactory("refactoredTipsContract");
//     const tipsContract = await TipsContract.deploy();
//     const refactoredTipsContract = await refactoredTipsContract.deploy();
//     await tipsContract.deploymentTransaction()?.wait();
//     await tipsContract.waitForDeployment();
//     console.log("Tips deployed to:", tipsContract.getAddress);
// }
const eth = parseEther("1.0");

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
