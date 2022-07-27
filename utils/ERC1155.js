require("dotenv").config();

const API_URL = process.env.API_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const PUBLIC_KEY = process.env.PUBLIC_KEY
const contractAddress = '0x2ed437BECc3EAEC833deA9fBe546aC1C03fc913d';

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/FactoryERC1155.sol/FactoryERC1155.json")
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)


exports.mint = async (name) => {


    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce + 1,
        gas: 4000000,
        data: nftContract.methods.mintERC1155(name, 1).encodeABI(),
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
  
    // const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)

    // return new Promise((resolve, reject) => {

    //     web3.eth.sendSignedTransaction(signedTx.rawTransaction,
    //         function (err, hash) {
    //             if (!err) {
    //                 console.log(
    //                     "The hash of your transaction is: ",
    //                     hash,
    //                     "\nCheck Alchemy's Mempool to view the status of your transaction!"
    //                 )
    //                 resolve(`Success ${hash}`);
    //             } else {
    //                 console.log(
    //                     "Something went wrong when submitting your transaction:",
    //                     err
    //                 )
    //                 reject(`Error ${err}`);
    //             }
    //         }
    //     )

    // }).catch(err => {
    //     console.log(err);
    // })
}

exports.deployContract = async (metaData, names, ids) => {

    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

    // nftContract.events.ERC1155Created({}, (err, event) => {
    //     if (event) {
    //         isDeployed(event);
    //     }
    //     if (err) { console.log('error deploying: ', err) }
    // })

    //the transaction
    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 4000000,
        data: nftContract.methods.deployERC1155('NFT', metaData, ids, names).encodeABI(),
    }


    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)

    return new Promise((resolve, reject) => {

        web3.eth.sendSignedTransaction(signedTx.rawTransaction,
            function (err, hash) {
                if (!err) {
                    console.log(
                        "The hash of your transaction is: ",
                        hash,
                        "\nCheck Alchemy's Mempool to view the status of your transaction!"
                    )
                    resolve(`Success ${hash}`);
                } else {
                    console.log(
                        "Something went wrong when submitting your transaction:",
                        err
                    )
                    reject(`Error ${err}`);
                }
            }
        )

    })
}