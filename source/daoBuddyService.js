const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = [
    // Place the ABI of your contract here
];
const feeTokenAddress = '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b';
const feeAmount = web3.utils.toWei('0.1', 'ether');

let web3;
let daoBuddyService;
let accounts;

async function connectMetamask() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            daoBuddyService = new web3.eth.Contract(contractABI, contractAddress);
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

window.onload = connectMetamask;
