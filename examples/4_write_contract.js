const { ethers } = require("ethers");
const data = require("../data.json")

const INFURA_ID = data.INFURA_ID
const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${INFURA_ID}`)

const account1 = data.WALLET_ADDRESS // Your account address 1
const account2 = data.WALLET_ADDRESS_2 // Your account address 2

const privateKey1 = data.ADDRESS_PRIVATE_KEY // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider)

const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
];

// Use LINK token as sample - https://rinkeby.etherscan.io/tx/0xaeb134f8f4d850ecc77eed06f59975993b6ea7f7867ede90806f1834f87be3b1
// You can import tokens from Metamask
const linkContractAddress = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709'
const contract = new ethers.Contract(linkContractAddress, ERC20_ABI, provider)

const main = async () => {
    const balance = await contract.balanceOf(account1)
    const tokenAmount = ethers.utils.parseUnits('1');

    console.log(`\nReading from LINK contract ${linkContractAddress}\n`)
    console.log(`Balance of sender: ${balance} (${account1})\n`)
    console.log(`Transfer amount of tokens: ${tokenAmount}\n`)

    // https://docs.ethers.io/v5/api/contract/contract/#Contract-connect
    const contractWithWallet = contract.connect(wallet)

    // transfer half balance
    const tx = await contractWithWallet.transfer(account2, tokenAmount)
    await tx.wait()

    console.log(tx)

    const balanceOfSender = await contract.balanceOf(account1)
    const balanceOfReciever = await contract.balanceOf(account2)

    console.log(`\nBalance of sender: ${balanceOfSender} (${account1})`)
    console.log(`Balance of reciever: ${balanceOfReciever} (${account2})\n`)
}

main()