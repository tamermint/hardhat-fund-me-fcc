//using this file helps us to deploy a contract that doesn't have its own contract address
//in Sepolia or polygon, the pricefeed will have its own address
//deploying mocks is like deploying a bare minimum of the original contract

const { network } = require("hardhat")

const DECIMALS = "8" //arguments for the mockV3aggregator contractor
const INITIAL_PRICE = "200000000000"

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    if (chainId == 31337) {
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_PRICE],
        })
        log("Mocks Deployed!")
        log("---------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
