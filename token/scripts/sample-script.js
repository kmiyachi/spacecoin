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

  // We get the contract to deploy'
  const SpaceCoin = await hre.ethers.getContractFactory("SpaceCoin");
  const Treasury = await hre.ethers.getContractFactory("Treasury");
  const ICO = await hre.ethers.getContractFactory("ICO");
  //const greeter = await Greeter.deploy("Hello, Hardhat!");
  const ico = await ICO.deploy();

  // await SpaceCoin.deployed();
  // await Treasury.deployed();
  await ico.deployed();
  const tokenAddress = await ico.getToken();
  const token = SpaceCoin.attach(tokenAddress);
  const treasuryAddress = await ico.getTreasury();
  const treasury = Treasury.attach(treasuryAddress);

  console.log("ICO deployed to: ", ico.address);
  console.log("SpaceCoin deployed to: ", token.address);
  console.log("Treasury deployed to: ", treasury.address);

  var pause = await ico.isPaused();
  console.log("Is Paused: ", pause);
  const accounts = await hre.ethers.getSigners();
  console.log(accounts);

  // const blah = await ico.whitelist("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  // console.log("WHITELIST: ", blah);

  // await ico.send({ value: 10});
  const phase = await ico.nextPhase();
  console.log(phase)
  const blah = await ico.whitelist("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  console.log("WHITELIST: ", blah);

  let overrides = {
    // To convert Ether to Wei:
    value: hre.ethers.utils.parseEther("0.00000001")     // ether in this case MUST be a string

    // Or you can use Wei directly if you have that:
    // value: someBigNumber
    // value: 1234   // Note that using JavaScript numbers requires they are less than Number.MAX_SAFE_INTEGER
    // value: "1234567890"
    // value: "0x1234"

    // Or, promises are also supported:
    // value: provider.getBalance(addr)
  };

  const balance = await token.balanceOf(ico.address);
  const bal = hre.ethers.utils.formatEther( balance );
  console.log("Balance of ICO Contract: ", bal);
  const tx = await ico.contribute(overrides);
  console.log("Contribute TX: ", tx);
  const cBalance = await token.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  const cBal = hre.ethers.utils.formatEther(cBalance);
  console.log("Balance of Contributor Contract: ", cBal);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



///0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
// 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
// 0x90F79bf6EB2c4f870365E785982E1f101E93b906
// 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
// 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc
// 0x976EA74026E726554dB657fA54763abd0C3a0aa9
// 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955
// 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f
// 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720
// 0xBcd4042DE499D14e55001CcbB24a551F3b954096
// 0x71bE63f3384f5fb98995898A86B02Fb2426c5788
// 0xFABB0ac9d68B0B445fB7357272Ff202C5651694a
// 0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec
// 0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097
// 0xcd3B766CCDd6AE721141F452C550Ca635964ce71
// 0x2546BcD3c84621e976D8185a91A922aE77ECEc30
// 0xbDA5747bFD65F08deb54cb465eB87D40e51B197E
// 0xdD2FD4581271e230360230F9337D5c0430Bf44C0
// 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199