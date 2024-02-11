//Traditionally:
//import
//main
//call main

//But w/ Hardhat deploy, no need of main or calling main. HHD executes your scripts for ya

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = getNamedAccounts()
    const chainId = network.config.chainId

    //what if we want to change chains
    //when going for local host or hardhat network we want to use a mock
}
