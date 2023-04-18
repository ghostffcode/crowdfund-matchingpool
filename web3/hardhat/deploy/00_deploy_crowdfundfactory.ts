// deploy/00_deploy_your_contract.js

import { ethers } from 'hardhat'
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const localChainId = '31337'

const contractDeploy: DeployFunction = async ({ getNamedAccounts, deployments, getChainId }: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()

  await deploy('CrowdfundImplementation', {
    from: deployer,
    log: true,
    autoMine: true,
    waitConfirmations: chainId === localChainId ? 1 : 5,
  })

  const CrowdfundImplementation = await ethers.getContract('CrowdfundImplementation', deployer)

  await deploy('CrowdfundFactory', {
    from: deployer,
    log: true,
    autoMine: true,
    args: [CrowdfundImplementation.address],
    waitConfirmations: chainId === localChainId ? 1 : 5,
  })

  // Getting a previously deployed contract
  // const CrowdfundFactory = await ethers.getContract('CrowdfundFactory', deployer)

  // test things out
  /**
   * 
  await CrowdfundFactory.createCrowdfund(ethers.utils.defaultAbiCoder.encode(
    ["address", "address", "uint256", "uint256", "uint256", "bytes"],
    ["0x2A5B1B6188669da07947403Da21F1CAB501374e6", "0x0000000000000000000000000000000000000000", Date.now() + 10*30000, Date.now() + 10*300000, ethers.utils.parseUnits('10'), ethers.utils.toUtf8Bytes("Sample description text")]
  ));

  const sampleApp = await ethers.getContractAt('CrowdfundImplementation', sampleImplentationAddress);

  const startDate = await sampleApp.startsAt();

  console.log({ startDate })
   */

  /*  await YourContract.setPurpose("Hello");
  
    To take ownership of yourContract using the ownable library uncomment next line and add the 
    address you want to be the owner. 
    // await yourContract.transferOwnership(YOUR_ADDRESS_HERE);

    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify from the command line by running `yarn verify`

  // You can also Verify your contracts with Etherscan here...
  // You don't want to verify on localhost
  // try {
  //   if (chainId !== localChainId) {
  //     await run('verify:verify', {
  //       address: YourContract.address,
  //       contract: 'contracts/YourContract.sol:YourContract',
  //       constructorArguments: [],
  //     })
  //   }
  // } catch (error) {
  //   console.error(error)
  // }
}

export default contractDeploy;
contractDeploy.tags = ['CrowdfundFactory', 'CrowdfundImplementation']
