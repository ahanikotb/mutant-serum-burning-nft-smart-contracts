const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MutantBurglarApeClub", function () {





  it("Deploys", async function () {
    const accounts = await hre.ethers.getSigners();

    const owner = accounts[0]
    const cust=accounts[1]
    const  communityWallet = accounts[3]
    
    const BAC = await ethers.getContractFactory("NormalNft");
    const burgularApeClub=await BAC.deploy("Burgular Ape Club","BAC","/");
    await burgularApeClub.deployed();
  
    const collectionAddress = await burgularApeClub.address
    
    const Serum = await ethers.getContractFactory("NormalNft");
    const SerumContract=await Serum.deploy("Burgular Ape Serum","Serum","/");
    await SerumContract.deployed()
  
    const serumAddress = await SerumContract.address
  
    const MutantBurgularApeClub = await ethers.getContractFactory("MutantBurgularApeClub");
    const mutantApeBC = await MutantBurgularApeClub.deploy("Mutant Burglar Ape Club","MBAC","/","/",collectionAddress,serumAddress,communityWallet.address);
    await mutantApeBC.deployed();
    console.log("ORIGINALCOL",collectionAddress)
    console.log("SERUM",serumAddress)
    console.log("MUTANT",await mutantApeBC.address)
  });



  it("mints", async function () {
    const accounts = await hre.ethers.getSigners();

    const owner = accounts[0]
    const cust=accounts[1]
    const  communityWallet = accounts[3]
    
    const BAC = await ethers.getContractFactory("NormalNft");
    const burgularApeClub=await BAC.deploy("Burgular Ape Club","BAC","/");
    await burgularApeClub.deployed();
  
    const collectionAddress = await burgularApeClub.address
    
    const Serum = await ethers.getContractFactory("NormalNft");
    const SerumContract=await Serum.deploy("Burgular Ape Serum","Serum","/");
    await SerumContract.deployed()
  
    const serumAddress = await SerumContract.address
  
    const MutantBurgularApeClub = await ethers.getContractFactory("MutantBurgularApeClub");
    const mutantApeBC = await MutantBurgularApeClub.deploy("Mutant Burglar Ape Club","MBAC","/","/",collectionAddress,serumAddress,communityWallet.address);
    await mutantApeBC.deployed();


    const approvenft= await burgularApeClub.approve( mutantApeBC.address,1);
    await approvenft.wait();
    const approveserum= await SerumContract.approve( mutantApeBC.address,1);
    await approveserum.wait()

    const tx= await mutantApeBC.mint(1,1);
    await tx.wait()
    
    expect((await mutantApeBC.walletOfOwner(accounts[0].address)).toString()).equals('1')

  });







});
