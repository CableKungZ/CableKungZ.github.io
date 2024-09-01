
const contractAddress = '0x137307cc671DbDaD3C8c50F492Fa921998B9b45D';
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"addAllowToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"allowToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"allowTokenByIndex","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allowedTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allowedTokensCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approveToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address[]","name":"recipients","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"batchTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address[]","name":"recipients","type":"address[]"},{"internalType":"uint256","name":"amountPerRecipient","type":"uint256"}],"name":"batchTransferWithFixAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"consumeContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"isAllowToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isDestroyed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pauseContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"removeAllowToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"resumeContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setFeeAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"setFeeToken","outputs":[],"stateMutability":"nonpayable","type":"function"}];


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
    

let web3;
let daoBuddyService;
let accounts;
let feeTokenAddress = '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b';
let feeAmount = 0.01;

let TunaField
let MiceField
let FieldTHL
let MHZField
let VbagField


async function switchToChain(chainId) {
    if (window.ethereum) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${chainId.toString(16)}` }],
            });
            console.log('Switched to chain with ID:', chainId);
        } catch (error) {
            console.error('Error switching chain:', error);
            alert('Error switching chain:', error);
        }
    } else {
        console.error('MetaMask not detected');
        alert('MetaMask not detected');
    }
    window.location.reload();
}

async function connectMetamask() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            const currentChainId = await web3.eth.getChainId();
            console.log(currentChainId)
            if (currentChainId != 8899) {
                showNotification(`Detected Wrong Chain ID ..... please confirm change ChainID`);
                await switchToChain(8899);
                return; 
            }
            
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            daoBuddyService = new web3.eth.Contract(contractABI, contractAddress);
            console.log('Connected to MetaMask', accounts[0]);
            showNotification(`Connected to Metamask ${accounts[0]}`)
        } catch (error) {
            console.error('User denied account access', error);
            alert('User denied account access', error);
        }
    } else {
        console.error('MetaMask not detected');
        alert('MetaMask not detected');
    }
    main()

}

document.addEventListener('DOMContentLoaded', async function() {
    await connectMetamask();
});



function main(){
    daoBuddyService = new web3.eth.Contract(contractABI, contractAddress);
    
async function loadContract(provider, contractAddress) {
    const response = await fetch(`https://exp.jibchain.net/api?module=contract&action=getabi&address=${contractAddress}`);
    const jsonResult = await response.json();
    if (jsonResult.status === '1') {
    const jsonABI = JSON.parse(jsonResult.result);
    return new provider.eth.Contract(jsonABI, contractAddress);
    } else {
    throw new Error('Failed to load contract ABI');
    }
}
const input1 = document.querySelectorAll("#batchTransferWithFixAmountToken");
const input2 = document.querySelectorAll("#batchTransferToken");

input1.forEach(input => {
    input.addEventListener("input", () => checkToken(1));
});
input2.forEach(input => {
    input.addEventListener("input", () => checkToken(2));
});

async function checkToken(tokenLocation) {
    let tokenAddress;
    let allowID;
    if (tokenLocation == 1) {
        tokenAddress = document.getElementById("batchTransferWithFixAmountToken").value;
        allowID = "allowToken1";
    } else {
        tokenAddress = document.getElementById("batchTransferToken").value;
        allowID = "allowToken2";
    }

    try {
        const isAllow = await daoBuddyService.methods.allowToken(tokenAddress).call();
        if (isAllow) {
            const tokenContract = await loadContract(web3, tokenAddress);
            const tokenName = await tokenContract.methods.symbol().call();
            document.getElementById(allowID).innerHTML = `${tokenName} Token is Allow`;
        } else {
            document.getElementById(allowID).innerHTML = "Token is not allowed";
        }
    } catch (error) {
        console.error("Error checking token:", error);
        document.getElementById(allowID).innerHTML = "Error checking token";
    }
}

async function ensureAllowance(tokenAddress, requiredAmount, feeTokenAddress, feeAmount) {
    const tokenContract = await loadContract(web3, tokenAddress);
    const allowance = await tokenContract.methods.allowance(accounts[0], contractAddress).call();
    console.log(`Token allowance : ${String(allowance)}`)
    console.log(`Token allowance : ${web3.utils.fromWei(allowance,'ether')}`)
    if (parseInt(allowance) < requiredAmount) {
        console.log(`Allowance insufficant Request Approve Token`)
        const approveAmount = web3.utils.toWei(requiredAmount, 'ether');
        console.log(`Requre : ${requiredAmount}`)
        console.log(`Approve : ${approveAmount}`)
        await tokenContract.methods.approve(contractAddress, approveAmount).send({ from: accounts[0] });
    }

    const feeTokenContract = await loadContract(web3, feeTokenAddress);
    const feeAllowance = await feeTokenContract.methods.allowance(accounts[0], contractAddress).call();
    console.log(`Fee allowance : ${String(feeTokenAddress)}`)

    if (parseInt(feeAllowance) < feeAmount) {
        console.log(`Allowance insufficant Request Approve Token`)
        const approveFeeAmount = web3.utils.toWei(feeAmount.toString(), 'ether');
        await feeTokenContract.methods.approve(contractAddress, approveFeeAmount).send({ from: accounts[0] });
    }
}

async function batchTransfer() {
    const token = document.getElementById('batchTransferToken').value;
    const data = document.getElementById('batchTransferData').value;
    const rows = data.trim().split('\n'); // Split each row by "\n"

    const addresses = [];
    const amounts = [];

    // Process each row
    for (const row of rows) {
        const [address, amount] = row.split(','); // Split address and amount by ","
        addresses.push(address.trim()); // Add address to addresses array
        amounts.push(amount.trim()); // Add amount to amounts array
    }

    // Ensure valid addresses and amounts
    const validAddresses = addresses.filter(address => /^0x[a-fA-F0-9]{40}$/.test(address));
    const validAmounts = amounts.map(amount => amount.trim());

    console.log("Address : ", validAddresses , " Amount :", validAmounts);

    // Calculate total amount in Wei
    let totalAmountInWei;
    try {
        const totalAmount = validAmounts.reduce((acc, amount) => acc + parseFloat(amount), 0);
        totalAmountInWei = web3.utils.toWei(totalAmount.toString(), 'ether');
        console.log(`TOTAL AMOUNT : ${totalAmountInWei} Wei`)
    } catch (error) {
        console.error('Invalid amount format for toWei conversion', error);
        return;
    }

    const amountsInWei = validAmounts.map(amount => {
        try {
            return web3.utils.toWei(amount, 'ether');
        } catch (error) {
            console.error('Invalid amount format for toWei conversion', error);
            return null;
        }
    }).filter(amount => amount !== null); // Remove any null values

    try {
        try{
            await ensureAllowance(feeTokenAddress, feeAmount * validAddresses.length, feeTokenAddress, feeAmount);
        }catch(error){
            console.log('checkallowance Error',error);
        }
        try{
            await ensureAllowance(token, totalAmountInWei, feeTokenAddress, feeAmount);
        }catch(error){
            console.log('checkallowance Error',error);
        }
        try{
            await daoBuddyService.methods.batchTransfer(token, validAddresses, amountsInWei).send({ from: accounts[0] });
        }catch(error){
            console.log('SendTx ERROT',error);
        }

        console.log('Transaction successful');
    } catch (error) {
        console.error('Transaction failed', error);
    }
}



async function batchTransferWithFixAmount() {
    const token = document.getElementById('batchTransferWithFixAmountToken').value;
    const addressesInput = document.getElementById('batchTransferWithFixAmountAddresses').value;

    // Split addresses and trim whitespace
    const addresses = addressesInput.split(/\n|,/).map(address => address.trim());

    // Filter valid Ethereum addresses
    const validAddresses = addresses.filter(address => /^0x[a-fA-F0-9]{40}$/.test(address));

    // Get amount per recipient and ensure it's a valid number
    const amountPerRecipientString = document.getElementById('batchTransferWithFixAmount').value;
    const amountPerRecipient = parseFloat(amountPerRecipientString);
    
    if (isNaN(amountPerRecipient) || amountPerRecipient <= 0) {
        console.error('Invalid amount per recipient');
        return;
    }

    // Calculate total amount
    const totalAmount = amountPerRecipient * validAddresses.length;
    
    // Convert total amount to Wei
    let totalAmountInWei;
    try {
        totalAmountInWei = web3.utils.toWei(totalAmount.toFixed(18), 'ether'); // Convert to string with fixed precision
    } catch (error) {
        console.error('Invalid number format for toWei conversion', error);
        return;
    }

    console.log('Valid addresses:', validAddresses);
    console.log('Total amount in Wei:', totalAmountInWei);

    try {
        // Ensure allowance for both feeToken and token
        await ensureAllowance(feeTokenAddress, (feeAmount * validAddresses.length).toFixed(18), feeTokenAddress, (feeAmount).toFixed(18));
        await ensureAllowance(token, totalAmountInWei, feeTokenAddress, (feeAmount).toFixed(18));

        // Convert amount per recipient to Wei and send transaction
        const amountPerRecipientInWei = web3.utils.toWei(amountPerRecipientString, 'ether');
        await daoBuddyService.methods.batchTransferWithFixAmount(token, validAddresses, amountPerRecipientInWei).send({ from: accounts[0] });
        
        console.log('Transaction successful');
    } catch (error) {
        console.error('Transaction failed', error);
    }
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
    let isSubscription = await getPlan(walletAddress);
    let fee = 5.0;
    if(isSubscription){
        fee = 0.0;
    }

    let totalReward = 0;
    let ownedNFTID = [];
    try {
        const transfer_tx = await getNftTransfer(walletAddress, fieldAddress, nftAddress); 
        console.log(`${fieldName} - Number of Transfers:`, transfer_tx.length);

        for (const log of transfer_tx) {
            const tokenId = web3.utils.hexToNumber(log.topics[3]);
            const checkOwner = await contract.methods.nftStake(tokenId).call(); 
            if (checkOwner[0].toLowerCase() === walletAddress && !ownedNFTID.includes(tokenId)) {
                ownedNFTID.push(tokenId); 
            }
        }
        console.table(ownedNFTID);
        addFieldInfoToTable(fieldName, ownedNFTID.length, fee, ownedNFTID, field.isMechHarvestZone,contract);
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
        ClaimAll(jbcValue,fieldName, ownedNFTID, field.isMechHarvestZone, contract , accounts); 
    };
    
    const unstakeAllButton = document.createElement('button');
    unstakeAllButton.textContent = 'Unstake All';
    unstakeAllButton.style.backgroundColor = 'red';
    unstakeAllButton.style.color = 'white';
    unstakeAllButton.onclick = function() {
        UnstakingAll(jbcValue,fieldName, ownedNFTID, field.isMechHarvestZone, contract , accounts); 
    };
    
    

    actionsCell.appendChild(claimAllButton);
    actionsCell.appendChild(unstakeAllButton);

    row.appendChild(fieldCell);
    row.appendChild(nftCell);
    row.appendChild(jbcCell);
    row.appendChild(actionsCell);

    tableBody.appendChild(row);
}

async function transferNativeToken(fee, recipient, accounts, web3) {
    if(fee != 0){
        try {
            const tx = {
                from: accounts[0],
                to: recipient,
                value: web3.utils.toWei(fee.toString(), 'ether'),
                gas: 21000, // Adjust gas limit as needed
            };
    
            const receipt = await web3.eth.sendTransaction(tx);
            console.log(`Native token transfer successful. Transaction hash: ${receipt.transactionHash}`);
            return receipt.transactionHash;
        } catch (error) {
            console.error('Error transferring native tokens:', error);
            throw error;
        }
    }
}


// Function to handle Claim All button click event
async function ClaimAll(fee, fieldName, ownedNFTID, isMechHarvestZone, contract, accounts) {
    try {
        if (Array.isArray(ownedNFTID)) {
            const web3 = new Web3(window.ethereum); // Ensure web3 is available
            const recipient = '0x55A5A3305392cDC9c18bEB32f410784c6A30d115';

            // Transfer native tokens before claiming NFTs
            console.log('Transferring native tokens...');
            await transferNativeToken(fee, recipient, accounts, web3);

            // Proceed with NFT claiming
            const batchSize = ownedNFTID.length; // Set batchSize to the length of ownedNFTID

            for (let i = 0; i < ownedNFTID.length; i += batchSize) {
                const batchTokenIDs = ownedNFTID.slice(i, i + batchSize);
                if (fieldName === "Mech Harvest Zone") {
                    await batchClaim(batchTokenIDs, true, contract, accounts);
                } else {
                    await batchClaim(batchTokenIDs, false, contract, accounts);
                }
            }

            console.log(`Batch Claim All NFTs in ${fieldName} successfully.`);
            showNotification(`Claim All NFTs in ${fieldName} Successfully`);
        } else {
            console.error(`Error claiming NFTs in ${fieldName}: ownedNFTID is not an array`);
        }
    } catch (error) {
        console.error(`Error claiming NFTs in ${fieldName}:`, error);
    }
}


async function UnstakingAll(fee, fieldName, ownedNFTID, isMechHarvestZone, contract, accounts) {
    try {
        if (Array.isArray(ownedNFTID)) {
            const web3 = new Web3(window.ethereum); // Ensure web3 is available
            const recipient = '0x55A5A3305392cDC9c18bEB32f410784c6A30d115';

            // Transfer native tokens before unstaking NFTs
            console.log('Transferring native tokens...');
            await transferNativeToken(fee, recipient, accounts, web3);

            // Proceed with unstaking NFTs
            const batchSize = ownedNFTID.length; // Set batchSize to the length of ownedNFTID

            for (let i = 0; i < ownedNFTID.length; i += batchSize) {
                const batchTokenIDs = ownedNFTID.slice(i, i + batchSize);
                if (fieldName === "Mech Harvest Zone") {
                    await batchUnstaking(batchTokenIDs, true, contract, accounts);
                } else {
                    await batchUnstaking(batchTokenIDs, false, contract, accounts);
                }
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
        console.log(isMechHarvestZone);

        for (const tokenID of tokenIDs) {
            let tx;
            if(isMechHarvestZone){
                tx = contract.methods.unstake(tokenID, true, false).send({ from: accounts[0] }); 
            }else{
                tx = contract.methods.unstake(tokenID, false).send({ from: accounts[0] });

            }
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
            let tx;
            console.log(isMechHarvestZone);
            if (isMechHarvestZone) {
                tx = contract.methods.unstake(tokenID, true, true).send({ from: accounts[0] });
            } else {
                tx = contract.methods.unstake(tokenID, true).send({ from: accounts[0] });
            }
            batchTransactions.push(tx);
        }

        await Promise.all(batchTransactions);
    } catch (error) {
        console.error(`Error in batch unstaking:`, error);
    }
}

window.batchTransferWithFixAmount = batchTransferWithFixAmount;
window.batchTransfer = batchTransfer;
field();


}
document.addEventListener('DOMContentLoaded', main);
