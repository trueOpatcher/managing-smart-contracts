


const File = require('nft.storage').File;
const NFTStorage = require('nft.storage').NFTStorage;



const fs = require('fs');
const mime = require('mime');
const path = require('path');

const IPFSKey = process.env.IPFS_KEY;

async function getImage() {
    const filePath = './assets/Diversity-Avatars-Avatars-Dave-grohl.svg'
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath);
    return new File([content], path.basename(filePath), { type });
}

exports.store = async () => {

    const nftStorage = new NFTStorage({ token: IPFSKey});

    const image = await getImage();

    console.log(image);
    const meta = {
        image,
        name: 'NFT Asset',
        description: 'test asset'
    }
    
    const nft = await nftStorage.store(meta);

    return nft.ipnft;
}