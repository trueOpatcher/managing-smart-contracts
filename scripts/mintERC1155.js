
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY



const { ethers } = require("hardhat");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contractAddress = '0x62C42CAe84Adc4d340DDFF1bECA89e1dEF04A1B7';
const contract = require("../artifacts/contracts/FactoryERC1155.sol/FactoryERC1155.json")


const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

exports.deploy = (metaData, names, ids, isDeployed) => {

 

  const nonce = web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  nftContract.events.ERC1155Created({}, (err, event) => {
    if(event) { 
      isDeployed(event);
    }
    if(err) { console.log('error deploying: ', err) }
  })

  

    
    // //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      gas: 4000000,
      data: nftContract.methods.deployERC1155( 'NFT', metaData, ids, names).encodeABI(),
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


  exports.mint = (name, isMinted) => {


    const nonce = web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

    nftContract.events.ERC1155Minted({}, (err, event) => {

      if(event) { isMinted('ERC1155 minted: ', event)}
      if(err) { console.log(' error minting: ', err)}
  
    })
  

    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
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
  }