
const contractAddress = '0x137307cc671DbDaD3C8c50F492Fa921998B9b45D';
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"addAllowToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"allowToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"allowTokenByIndex","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allowedTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allowedTokensCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approveToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address[]","name":"recipients","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"batchTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address[]","name":"recipients","type":"address[]"},{"internalType":"uint256","name":"amountPerRecipient","type":"uint256"}],"name":"batchTransferWithFixAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"consumeContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"isAllowToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isDestroyed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pauseContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"removeAllowToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"resumeContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setFeeAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"setFeeToken","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let web3;
let daoBuddyService;
let accounts;
let feeTokenAddress = '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b';
let feeAmount = 0.2;

let TunaField
let MiceField
let FieldTHL
let MHZField
let VbagField

async function loadContract(provider, contractAddress) {
    const response = await fetch(`https://exp-l1-ng.jibchain.net/api?module=contract&action=getabi&address=${contractAddress}`);
    const jsonResult = await response.json();
    if (jsonResult.status === '1') {
    const jsonABI = JSON.parse(jsonResult.result);
    return new provider.eth.Contract(jsonABI, contractAddress);
    } else {
    throw new Error('Failed to load contract ABI');
    }
}



async function connectMetamask() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            daoBuddyService = new web3.eth.Contract(contractABI, contractAddress);
            console.log('Connected to MetaMask ',accounts[0]);
        } catch (error) {
            console.error('User denied account access', error);
        }
    } else {
        console.error('MetaMask not detected');
    }
}


async function ensureAllowance(tokenAddress, requiredAmount, feeTokenAddress, feeAmount) {
const tokenContract = await loadContract(web3, tokenAddress);
const allowance = await tokenContract.methods.allowance(accounts[0], contractAddress).call();
if (parseInt(allowance) < requiredAmount) {
const approveAmount = web3.utils.toWei(requiredAmount, 'ether');
await tokenContract.methods.approve(contractAddress, approveAmount).send({ from: accounts[0] });
}

const feeTokenContract = await loadContract(web3, feeTokenAddress);
const feeAllowance = await feeTokenContract.methods.allowance(accounts[0], contractAddress).call();
if (parseInt(feeAllowance) < feeAmount) {
const approveFeeAmount = web3.utils.toWei(feeAmount.toString(), 'ether');
await feeTokenContract.methods.approve(contractAddress, approveFeeAmount).send({ from: accounts[0] });
}
}

async function batchTransfer() {
const token = document.getElementById('batchTransferToken').value;
const data = document.getElementById('batchTransferData').value;
const rows = data.trim().split('\n'); // แยกแต่ละแถวด้วย "\n"

const addresses = [];
const amounts = [];

for (const row of rows) {
    const [address, amount] = row.split(','); // แยก address และ amount ด้วย ","
    addresses.push(address.trim()); // เพิ่ม address เข้าไปในอาร์เรย์ addresses
    amounts.push(amount.trim()); // เพิ่ม amount เข้าไปในอาร์เรย์ amounts
}

    try {
        await ensureAllowance(feeTokenAddress, feeAmount * addresses.length, feeTokenAddress, feeAmount);
        const totalAmount = amounts.reduce((acc, amount) => acc + parseInt(amount), 0);
        await ensureAllowance(token, totalAmount, feeTokenAddress, feeAmount);

        await daoBuddyService.methods.batchTransfer(token, addresses, amounts).send({ from: accounts[0] });
        console.log('Transaction successful');
    } catch (error) {
    console.error('Transaction failed', error);
    }
}


async function batchTransferWithFixAmount() {
    const token = document.getElementById('batchTransferWithFixAmountToken').value;
    const addressesInput = document.getElementById('batchTransferWithFixAmountAddresses').value;
    
    // แยกที่อยู่ Ethereum จากสตริงโดยใช้ขึ้นบรรทัดใหม่เป็นตัวแยกและลบช่องว่างทั้งหมดที่อาจเกิดขึ้น
    const addresses = addressesInput.split(/\n|,/).map(address => address.trim());

    // ตรวจสอบความถูกต้องของที่อยู่ Ethereum
    const validAddresses = addresses.filter(address => /^0x[a-fA-F0-9]{40}$/.test(address));

    const amountPerRecipient = web3.utils.toWei(document.getElementById('batchTransferWithFixAmount').value, 'ether');
    const totalAmount = amountPerRecipient * validAddresses.length;
    
    console.log(validAddresses);

    try {
        await ensureAllowance(feeTokenAddress, feeAmount * validAddresses.length, feeTokenAddress, feeAmount);
        await ensureAllowance(token, totalAmount, feeTokenAddress, feeAmount);
        await daoBuddyService.methods.batchTransferWithFixAmount(token, validAddresses, amountPerRecipient).send({ from: accounts[0] });
        console.log('Transaction successful');
    } catch (error) {
        console.error('Transaction failed', error);
    }
}



function showSection(sectionId) {
const sections = document.querySelectorAll('.container');
sections.forEach(section => {
if (section.id === sectionId) {
    section.style.display = 'block';
} else {
    section.style.display = 'none';
}
});
}

window.onload = function() {
connectMetamask(); // Call connectMetamask when the page loads
field();
showSection('fieldtool'); // Show the default section
}



async function field() {
    TunaField = await loadContract(web3, '0x09676315DC0c85F6bd5e866C5f1363A00Eec4381'); // Tuna field
    MiceField = await loadContract(web3, '0x09DE640ecd50e1c81bCB266279e3ffC2719873df'); // Old warehouse field
    FieldTHL = await loadContract(web3, '0xdBC6e0928e49f22Ca448fEF2fEb9de526d6A65B9'); // The Heaven Land
    MHZField = await loadContract(web3, '0x0E2610730A3c42fd721B289BEe092D9AD1C76890'); // Mech Harvest Zone
    VbagField = await loadContract(web3, '0x495d66c9Fd7c63807114d06802A48BdAA60a0426'); // Eastern (Vabag)
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // ขอสิทธิ์เข้าถึง MetaMask

        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
            console.error('No accounts found!');
            return;
        }
        const walletAddress = accounts[0].toLowerCase();
        
        const fieldInfo = [
            { fieldName: "Tuna Lake", contract: TunaField, fieldAddress: "0x09676315DC0c85F6bd5e866C5f1363A00Eec4381", nftAddress: "0x09676315DC0c85F6bd5e866C5f1363A00Eec4381", tokenReward: "TUNA", isMechHarvestZone: false },
            { fieldName: "Old Ware House", contract: MiceField, fieldAddress: "0x09DE640ecd50e1c81bCB266279e3ffC2719873df", nftAddress: "0xd492e20ecf3ae85fe3e3159bb064442b86d6dc02", tokenReward: "MICE", isMechHarvestZone: false },
            { fieldName: "Eastern Front", contract: VbagField, fieldAddress: "0x495d66c9Fd7c63807114d06802A48BdAA60a0426", nftAddress: "0x526A70be985EB234c3f2c4933aCB59F6EB595Ed7", tokenReward: "VABAG", isMechHarvestZone: false },
            { fieldName: "Mech Harvest Zone", contract: MHZField, fieldAddress: "0x0E2610730A3c42fd721B289BEe092D9AD1C76890", nftAddress: "0x2036186F6d5287FcB05C56C38374AC5236d8A61d", tokenReward: "GEAR", isMechHarvestZone: true },
            { fieldName: "The Heaven Land", contract: FieldTHL, fieldAddress: "0xdBC6e0928e49f22Ca448fEF2fEb9de526d6A65B9", nftAddress: "0xA6f8cE1425E0fC4b74f3b1c2f9804e9968f90e17", tokenReward: "GOLD", isMechHarvestZone: false }
        ];
        // ["0x09676315DC0c85F6bd5e866C5f1363A00Eec4381","0x09DE640ecd50e1c81bCB266279e3ffC2719873df","0x495d66c9Fd7c63807114d06802A48BdAA60a0426","0x0E2610730A3c42fd721B289BEe092D9AD1C76890","0xdBC6e0928e49f22Ca448fEF2fEb9de526d6A65B9"]
        

        for (const field of fieldInfo) {
            console.log("Call ", field.fieldName);
             await dungeon(field.fieldName, field.contract, field.fieldAddress, field.nftAddress, field.tokenReward, walletAddress);
        }
    } else {
        console.error('No Web3 provider found!');
    }
}

async function getNftTransfer(walletAddress, fieldAddress, nftAddress) {
    const event_filter = {
        fromBlock: 'earliest',
        toBlock: 'latest',
        address: nftAddress,
        topics: [
            web3.utils.keccak256('Transfer(address,address,uint256)'),
            '0x000000000000000000000000' + walletAddress.slice(2),
            '0x000000000000000000000000' + fieldAddress.slice(2)
        ]
    };

    return await web3.eth.getPastLogs(event_filter);
}

async function dungeon(fieldName, contract, fieldAddress, nftAddress, tokenReward, walletAddress) {
    let fee = 0.5;
    let totalReward = 0;
    let ownedNFTID = [];
    try {
        const transfer_tx = await getNftTransfer(walletAddress, fieldAddress, nftAddress); 
        console.log(`${fieldName} - Number of Transfers:`, transfer_tx.length);

        for (const log of transfer_tx) {
            const tokenId = web3.utils.hexToNumber(log.topics[3]);
            const checkOwner = await contract.methods.nftStake(tokenId).call(); 
            if (checkOwner[0].toLowerCase() === walletAddress) {
                ownedNFTID.push(tokenId); 
            }
        }
        console.table(ownedNFTID);
        addFieldInfoToTable(fieldName, ownedNFTID.length, (ownedNFTID.length * fee), ownedNFTID, field.isMechHarvestZone,contract);
    } catch (error) {
        console.error('Error:', error);
    }
}


// Function to add field information to the table
function addFieldInfoToTable(fieldName, numberOfNFTs, jbcValue, ownedNFTID, isMechHarvestZone,contract) {
    const tableBody = document.getElementById('fieldInfo');

    const row = document.createElement('div');
    row.style.display = 'table-row';

    const fieldCell = document.createElement('div');
    fieldCell.style.display = 'table-cell';
    fieldCell.style.padding = '5px';
    fieldCell.style.border = '1px solid black';
    fieldCell.textContent = fieldName;

    const nftCell = document.createElement('div');
    nftCell.style.display = 'table-cell';
    nftCell.style.padding = '5px';
    nftCell.style.border = '1px solid black';
    nftCell.textContent = numberOfNFTs + ' NFT(s)';

    const jbcCell = document.createElement('div');
    jbcCell.style.display = 'table-cell';
    jbcCell.style.padding = '5px';
    jbcCell.style.border = '1px solid black';
    jbcCell.textContent = jbcValue + ' JBC';

    const actionsCell = document.createElement('div');
    actionsCell.style.display = 'table-cell';
    actionsCell.style.padding = '5px';
    actionsCell.style.border = '1px solid black';

    const claimAllButton = document.createElement('button');
    claimAllButton.textContent = 'Claim All';
    claimAllButton.style.backgroundColor = 'green';
    claimAllButton.style.color = 'white';
    claimAllButton.onclick = function() {
        ClaimAll(fieldName, ownedNFTID, field.isMechHarvestZone, contract , accounts); 
    };
    
    const unstakeAllButton = document.createElement('button');
    unstakeAllButton.textContent = 'Unstake All';
    unstakeAllButton.style.backgroundColor = 'red';
    unstakeAllButton.style.color = 'white';
    unstakeAllButton.onclick = function() {
        UnstakingAll(fieldName, ownedNFTID, field.isMechHarvestZone, contract , accounts); 
    };
    
    

    actionsCell.appendChild(claimAllButton);
    actionsCell.appendChild(unstakeAllButton);

    row.appendChild(fieldCell);
    row.appendChild(nftCell);
    row.appendChild(jbcCell);
    row.appendChild(actionsCell);

    tableBody.appendChild(row);
}


// Function to handle Claim All button click event
async function ClaimAll(fieldName, ownedNFTID, isMechHarvestZone, contract, accounts) {
    try {
        if (Array.isArray(ownedNFTID)) {
            const batchSize = ownedNFTID.length; // กำหนด batchSize เท่ากับความยาวของ ownedNFTID

            for (let i = 0; i < ownedNFTID.length; i += batchSize) {
                const batchTokenIDs = ownedNFTID.slice(i, i + batchSize);
                await batchClaim(batchTokenIDs, isMechHarvestZone, contract, accounts);
            }

            console.log(`Batch Claim All NFTs in ${fieldName} successfully.`);
        } else {
            console.error(`Error claiming NFTs in ${fieldName}: ownedNFTID is not an array`);
        }
    } catch (error) {
        console.error(`Error claiming NFTs in ${fieldName}:`, error);
    }
}

async function UnstakingAll(fieldName, ownedNFTID, isMechHarvestZone, contract, accounts) {
    try {
        if (Array.isArray(ownedNFTID)) {
            const batchSize = ownedNFTID.length; // กำหนด batchSize เท่ากับความยาวของ ownedNFTID

            for (let i = 0; i < ownedNFTID.length; i += batchSize) {
                const batchTokenIDs = ownedNFTID.slice(i, i + batchSize);
                await batchUnstaking(batchTokenIDs, isMechHarvestZone, contract, accounts);
            }

            console.log(`Batch Unstaking All NFTs in ${fieldName} successfully.`);
        } else {
            console.error(`Error unstaking NFTs in ${fieldName}: ownedNFTID is not an array`);
        }
    } catch (error) {
        console.error(`Error unstaking NFTs in ${fieldName}:`, error);
    }
}

async function batchClaim(tokenIDs, isMechHarvestZone, contract, accounts) {
    try {
        const batchTransactions = [];

        for (const tokenID of tokenIDs) {
            const tx = isMechHarvestZone ?
                contract.methods.unstake(tokenID, true, false).send({ from: accounts[0] }) :
                contract.methods.unstake(tokenID, false).send({ from: accounts[0] });
            batchTransactions.push(tx);
        }

        await Promise.all(batchTransactions);
    } catch (error) {
        console.error(`Error in batch claiming:`, error);
    }
}

async function batchUnstaking(tokenIDs, isMechHarvestZone, contract, accounts) {
    try {
        const batchTransactions = [];

        for (const tokenID of tokenIDs) {
            const tx = isMechHarvestZone ?
                contract.methods.unstake(tokenID, true, true).send({ from: accounts[0] }) :
                contract.methods.unstake(tokenID, true).send({ from: accounts[0] });
            batchTransactions.push(tx);
        }

        await Promise.all(batchTransactions);
    } catch (error) {
        console.error(`Error in batch unstaking:`, error);
    }
}
