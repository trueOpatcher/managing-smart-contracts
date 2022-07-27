
const multer = require('multer');
const saveToIPFS = require('../utils/store-nft').store;
const deployContract = require('../utils/ERC1155').deployContract;
const mintNft = require('../utils/ERC1155').mint;

exports.generate = (req, res) => {

    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    // Handle multipart formdata
    upload.single('meta')
    (req, res, (err) => {

        const meta = JSON.parse(req.body.meta);
        if(!meta) {
            return;
        }

        // Save assets to IPFS storage
        saveToIPFS().then(CID => {
            
            // Link to NFT metadata
            const link = 'https://ipfs.io/ipfs/' + CID + '/metadata.json';
            const names = ['Test NFT'];
            const ids = [0];

            // Deploy ERC1155 contract
            deployContract(link, names, ids).then(res => {
                
                // Mint NFT
                mintNft('Test NFT').then(res => {
                    console.log('is Minted: ', res);
                })

            }).catch(err => {
                console.log(err);
            })
        });
        

    })
    
}

exports.fetch = (req, res) => {

    console.log('fetching');

    res.end();
    // if(req.body.wallet) {
    //     res.status(400).send({ message: "Wallet is not provided" });
    // }
    // const wallet = req.body.wallet;
}