const { ethers } = require("ethers");
const data = require("../data.json")

const INFURA_ID = data.INFURA_ID
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",

    "event Transfer(address indexed from, address indexed to, uint amount)" // smart contract event logs
];

// DAI contract - https://etherscan.io/address/0x6B175474E89094C44Da98b954EedeAC495271d0F
const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    // https://docs.ethers.io/v5/api/providers/provider/#Provider-getBlockNumber
    const block = await provider.getBlockNumber()

    // sample - https://etherscan.io/tx/0xbe724df4867c1f91016018a0bce0b918d068f870168db7b276be0bfb2d60e735#eventlog
    // https://docs.ethers.io/v5/api/contract/contract/#Contract-queryFilter
    const fromBlock = block - 1;
    const toBlock = block;
    console.log(`\nBlock number: from ${fromBlock} to ${toBlock}\n`)
    const transferEvents = await contract.queryFilter('Transfer', fromBlock, toBlock)
    console.log(transferEvents)
}

main()