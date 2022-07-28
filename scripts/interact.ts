
const { PRIVATE_KEY, API_KEY, MFT_CONTRACT, ADDRESS } = process.env;

import { ethers } from "hardhat";
import contract from "../artifacts/contracts/MFT.sol/MFT.json";

console.log(JSON.stringify(contract.abi));

const provider = new ethers.providers.AlchemyProvider({ name: 'rinkeby', chainId: 4 }, API_KEY);

const signer = new ethers.Wallet(PRIVATE_KEY as string, provider);

const mftContract = new ethers.Contract(MFT_CONTRACT as string, contract.abi, signer);

console.log(mftContract.address);
console.log(mftContract.functions);

async function mintNFT() {
    const mintTx = await mftContract.safeMint(signer.address, "hello", "https://test.xyz");
    await mintTx.wait();
    console.log(`New NFT minted with hash ${mintTx.hash}`)
}

async function main() {
    const name = await mftContract.name();
    console.log(`name: ${name}`);
    const balance = await mftContract.balanceOf(ADDRESS);
    console.log(`balance: ${balance}`);

    const uri = await mftContract.tokenURI(0);
    console.log(`Token URI: ${uri}`);
    
    // await mintNFT();
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
})