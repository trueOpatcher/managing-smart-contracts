
const { ethers } = require("hardhat");

// async function deployContract() {
//     const MyNFT = await ethers.getContractFactory("FactoryERC1155")
//     const exampleNFT = await MyNFT.deploy()
//     await exampleNFT.deployed()
//     // This solves the bug in Mumbai network where the contract address is not the real one
//     const txHash = exampleNFT.deployTransaction.hash
//     const txReceipt = await ethers.provider.waitForTransaction(txHash)
//     const contractAddress = txReceipt.contractAddress
//     console.log("Contract deployed to address:", contractAddress)
//    }


deployContract = (metaData, names, ids, isDeployed) => {

    const nonce = web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

    nftContract.events.ERC1155Created({}, (err, event) => {
        if (event) {
            isDeployed(event);
        }
        if (err) { console.log('error deploying: ', err) }
    })

    //the transaction
    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 4000000,
        data: nftContract.methods.deployERC1155('NFT', metaData, ids, names).encodeABI(),
    }

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
        .then((signedTx) => {

            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {

                        console.log(

                            "The hash of your transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of your transaction!"
                        )
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        )
                    }
                }
            )
        })
        .catch((err) => {
            console.log(" Promise failed:", err)
        })
}


deployContract()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
