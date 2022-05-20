const { ethers } = require("ethers");
const data = require("../data.json")

const INFURA_ID = data.INFURA_ID
const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${INFURA_ID}`)

const account1 = data.WALLET_ADDRESS // Your account address 1
const account2 = data.WALLET_ADDRESS_2 // Your account address 2

const privateKey1 = data.ADDRESS_PRIVATE_KEY // Private key of account 1
// https://docs.ethers.io/v5/api/signer/#Wallet
const wallet = new ethers.Wallet(privateKey1, provider)

const main = async () => {
    const senderBalanceBefore = await provider.getBalance(account1)
    const recieverBalanceBefore = await provider.getBalance(account2)

    console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)} (${account1})`)
    console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)} (${account2})\n`)

    // https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction
    const tx = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther("0.025")
    })

    // https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse
    await tx.wait()

    // hash - https://rinkeby.etherscan.io/tx/0x00da11390a78851bede91bac4105f5895b2e75ba5b2dcec3aecfd0a96734ded9
    console.log(tx)

    const senderBalanceAfter = await provider.getBalance(account1)
    const recieverBalanceAfter = await provider.getBalance(account2)

    console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
    console.log(`reciever balance after: ${ethers.utils.formatEther(recieverBalanceAfter)}\n`)
}

main()
