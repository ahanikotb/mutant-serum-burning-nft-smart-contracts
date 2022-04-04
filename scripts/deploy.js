// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  const accounts = await hre.ethers.getSigners();
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
//    string memory _name,  string memory _symbol,string memory _initBaseURI
  const owner = accounts[0]
  const cust=accounts[1]
  const  communityWallet = accounts[3]
  
  const BAC = await ethers.getContractFactory("NormalNft");
  const burgularApeClub=await BAC.deploy("Mutant Burglar Ape Club","MBAC","/");
  await burgularApeClub.deployed();

  const collectionAddress = await burgularApeClub.address
  
  const Serum = await ethers.getContractFactory("NormalNft");
  const SerumContract=await Serum.deploy("Mutant Burglar Ape Club","MBAC","/");
  await SerumContract.deployed()

  const serumAddress = await SerumContract.address

//    string memory _name,string memory _symbol,string memory _initBaseURI,string memory notRevealedUri,,address _nftContract,address _serum,address _communityWallet
  
  const MutantBurgularApeClub = await ethers.getContractFactory("MutantBurgularApeClub");
  const mutantApeBC = await MutantBurgularApeClub.deploy("Mutant Burglar Ape Club","MBAC","/","/",collectionAddress,serumAddress,communityWallet.address);
  await mutantApeBC.deployed();
  //console.log(communityWallet.address)
  console.log("ORIGINALCOL",collectionAddress)
  console.log("SERUM",serumAddress)
  console.log("MUTANT",await mutantApeBC.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
