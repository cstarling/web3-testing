// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Doodles = await hre.ethers.getContractFactory("Doodles");
  const doodles = await Doodles.deploy();

  await doodles.deployed();

  console.log("doodles deployed to:", doodles.address);

  await doodles.setBaseURI("ipfs://blahblahblah/");
  await doodles.setSaleState(true);

  await doodles.mint(2, {
    value: hre.ethers.utils.parseEther('0.02'),
  });

  let uri = await doodles.tokenURI(1);
  
  console.log("uri deployed to:", uri);

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
