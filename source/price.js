let price_contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];



require('./source/price_jbc.js');
require('./source/price_op.js');
require('./source/price_bkc.js');
require('./source/price_bbq.js');


let taoToUsd;
let thbToUsd;
let kubToUsd;
let usdToWeth;
async function setFiatAndTaoPrice(){
    try {
        const exchangeRateResponse = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const exchangeRateData = await exchangeRateResponse.json();
        const thbToUsd = exchangeRateData.rates.THB;

        const poolsResponse = await fetch('https://api.geckoterminal.com/api/v2/networks/bitkub_chain/tokens/0x6527d3d38a7ff4e62f98fe27dd9242a36227fe23/pools?include=base_token_price_usd&page=1');
        const poolsData = await poolsResponse.json();
        const pools = poolsData.data;

        let taoToUsd;
        pools.forEach(pool => {
            if (pool.id === 'bitkub_chain_0x0969c9d1786c8e570f5955eed7acb4c6aebe2c08') {
                taoToUsd = parseFloat(pool.attributes.token_price_usd);
            }
        });
        const pools2Response = await fetch('https://api.geckoterminal.com/api/v2/networks/bitkub_chain/tokens/0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5/pools?include=base_token_price_usd&page=1');
        const pools2Data = await pools2Response.json();
        const pools2 = pools2Data.data;

        let kubToUsd;
        pools2.forEach(pool => {
            if (pool.id === 'bitkub_chain_0x286b67516b979a8271805660d3ac0c626f2d38e6') {
                kubToUsd = parseFloat(pool.attributes.token_price_usd);
            }
        });
        const pools3Response = await fetch('https://api.geckoterminal.com/api/v2/networks/optimism/tokens/0x4200000000000000000000000000000000000006/pools?include=base_token_price_usd&page=1');
        const pools3Data = await pools3Response.json();
        const pools3 = pools3Data.data;

        let usdToWeth;
        pools3.forEach(pool => {
            if (pool.id === 'optimism_0x1fb3cf6e48f1e7b10213e7b6d87d4c073c7fdb7b') {
                usdToWeth = parseFloat(pool.attributes.token_price_usd);
            }
        });
        console.log(thbToUsd," THB/USD")
        console.log(taoToUsd," USDT/TAO")
        console.log(kubToUsd," USDT/KKUB")
        console.log(usdToWeth," USDT/WETH")
        return [thbToUsd, taoToUsd,kubToUsd,usdToWeth]; // Return as an array
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function main() {
    showNotification("Loading Price Board........")

    showNotification("Updated Price");
}
  
main();
