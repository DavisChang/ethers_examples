const { ethers } = require("ethers");
const data = require("../data.json");

// https://docs.ethers.io/v5/api/providers/other/#UrlJsonRpcProvider
const rinkebyProvider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${data.INFURA_ID}`)

const walletAddress = data.WALLET_ADDRESS;

const main = async () => {
    // https://docs.ethers.io/v5/api/providers/provider/#Provider-getBalance
    const balance = await rinkebyProvider.getBalance(walletAddress)
    // https://docs.ethers.io/v5/api/utils/display-logic/#utils-formatEther
    console.log(`\nETH Balance of ${walletAddress} --> ${ethers.utils.formatEther(balance)} ETH\n`)
}

main()

