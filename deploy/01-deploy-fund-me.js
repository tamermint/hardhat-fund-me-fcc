/* //Traditionally:
//import
//main
//call main

//But w/ Hardhat deploy, no need of main or calling main. HHD executes your scripts for ya
*/
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const chainId = network.config.chainId
/* const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"] */

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    let ethUsdPriceFeedAddress

    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    //what if we want to change chains
    //when going for local host or hardhat network we want to use a mock
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], //pricefeed address here
        log: true,
    })
    log("---------------------------------")
}

module.exports.tags = ["all", "fundme"]
