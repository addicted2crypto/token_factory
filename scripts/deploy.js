import hardhat from "hardhat";
const { ethers } = hardhat;
async function main() {
    const TipsContract = await ethers.getContractFactory("Tips");
    const tipsContract = await TipsContract.deploy();
    await tipsContract.deploymentTransaction()?.wait();
    await tipsContract.waitForDeployment();
    console.log("Tips deployed to:", tipsContract.getAddress);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
