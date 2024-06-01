const contractAddress = '0x137307cc671DbDaD3C8c50F492Fa921998B9b45D';
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"addAllowToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"allowToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"allowTokenByIndex","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allowedTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allowedTokensCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approveToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address[]","name":"recipients","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"batchTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address[]","name":"recipients","type":"address[]"},{"internalType":"uint256","name":"amountPerRecipient","type":"uint256"}],"name":"batchTransferWithFixAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"consumeContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"isAllowToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isDestroyed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pauseContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"removeAllowToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"resumeContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setFeeAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"setFeeToken","outputs":[],"stateMutability":"nonpayable","type":"function"}];

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

            // Call other functions here that rely on web3, e.g., batchTransfer
        } catch (error) {
            console.error('User denied account access', error);
        }
    } else {
        console.error('MetaMask not detected');
    }
}

// Call connectMetamask when the window loads
window.onload = connectMetamask;

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
    const approveAmount = web3.utils.toWei(approveAmount, 'ether');
    await tokenContract.methods.approve(contractAddress, approveAmount).send({ from: accounts[0] });

}

async function batchTransfer() {
        if (!web3 || !accounts || !daoBuddyService) {
        console.error('Please connect MetaMask first');
        return;
    }
    const token = document.getElementById('batchTransferToken').value;
    const addresses = document.getElementById('batchTransferAddresses').value.split(',');
    const amounts = document.getElementById('batchTransferAmounts').value.split(',').map(amount => web3.utils.toWei(amount, 'ether'));

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
        if (!web3 || !accounts || !daoBuddyService) {
        console.error('Please connect MetaMask first');
        return;
    }
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
