import hardhat from "hardhat";


const { ethers } = hardhat;
async function main() {
    const TipsContract = await ethers.getContractFactory("Tips");
    const tipsContract = await TipsContract.deploy();
    
    const deploymentReceipt = await tipsContract.deploymentTransaction()?.wait();
    console.log("Tips deployed to:", tipsContract.address);
    console.log("Deployment transaction hash:", deploymentReceipt.transactionHash);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  