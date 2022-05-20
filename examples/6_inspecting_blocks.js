const { ethers } = require("ethers");
const data = require("../data.json")

const INFURA_ID = data.INFURA_ID
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const main = async () => {
    const block = await provider.getBlockNumber()

    console.log(`\nBlock Number: ${block}\n`)

    // https://docs.ethers.io/v5/api/providers/provider/#Provider-getBlock
    const blockInfo = await provider.getBlock(block)

    console.log(blockInfo)

    // https://docs.ethers.io/v5/api/providers/provider/#Provider-getBlockWithTransactions
    const { transactions } = await provider.getBlockWithTransactions(block)

    console.log(`\nLogging first transaction in block:\n`)
    console.log(transactions[0])
}

main()