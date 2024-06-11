let web3;
let currentProviderIndex = 0;

let jbcToUsd,cmjToUSDT,jtaoToUSDT;
let jbcToCmj;
let taoToUsd;
let thbToUsd;


let priceData = [];
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];


const PROVIDER_URLS = [
    'https://rpc.bitkubchain.io',
];

/**
 * Auto  RPC connecting
 */

setFiatAndTaoPrice(); // setting price of THB TO USD and TAO in BKC Chain
checkConnection();



async function checkConnection() {
    while (currentProviderIndex < PROVIDER_URLS.length) {
        const providerUrl = PROVIDER_URLS[currentProviderIndex];
        web3 = new Web3(providerUrl);

        try {
            const blockNumber = await web3.eth.getBlockNumber();
            console.log(`Connected to provider: ${providerUrl}. Latest block number: ${blockNumber}`);
            main();
            return; 
        } catch (error) {
            console.error(`RPC ERROR with provider: ${providerUrl}`, error);
            currentProviderIndex++;
        }
    }

    console.error("All provider URLs failed.");
    alert("All provider URLs failed.");
}

function setContract(web3, ABI, address) {
    return new web3.eth.Contract(ABI, address);
}

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
        return { thbToUsd, taoToUsd };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

function main(){

    // Declare ERC 20 
    const CMJ = new web3.eth.Contract(contractABI, '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b');
    const WJBC = new web3.eth.Contract(contractABI, '0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747');
    const Jib_WJBC = new web3.eth.Contract(contractABI, '0x99999999990FC47611b74827486218f3398A4abD');
    const Meow = new web3.eth.Contract(contractABI, '0x04052384166fC30D03929eE328805eC084776843');
    const Wood = new web3.eth.Contract(contractABI, '0xc2744Ff255518a736505cF9aC1996D9adDec69Bd');
    const Tuna = new web3.eth.Contract(contractABI, '0x09676315DC0c85F6bd5e866C5f1363A00Eec4381');
    const Mice = new web3.eth.Contract(contractABI, '0x09DE640ecd50e1c81bCB266279e3ffC2719873df');
    const Cu = new web3.eth.Contract(contractABI, '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841');
    const Jasp = new web3.eth.Contract(contractABI, '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860');
    const Os = new web3.eth.Contract(contractABI, '0xAc5299D92373E9352636559cca497d7683A47655');
    const Jdao = new web3.eth.Contract(contractABI, '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88');
    const Mt = new web3.eth.Contract(contractABI, '0x169816800f1eA9C5735937388aeb9C2A3bAca11F');
    const Vabag = new web3.eth.Contract(contractABI, '0x495d66c9Fd7c63807114d06802A48BdAA60a0426');
    const Bbq = new web3.eth.Contract(contractABI, '0x7004757e595409568Bd728736e1b0c79FDc94e1c');
    const Pza = new web3.eth.Contract(contractABI, '0x09DcdCFc6C48803681a3422997c679E773656763');
    const Ctuna = new web3.eth.Contract(contractABI, '0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0');
    const Sx31 = new web3.eth.Contract(contractABI, '0xd431d826d7a4380b9259612176f00528b88840a7');
    const Sil = new web3.eth.Contract(contractABI, '0x2a081667587c35956d34A4cC3bf92b9CA0ef2C6f');
    const Gold = new web3.eth.Contract(contractABI, '0x7d5346E33889580528e6F79f48BdEE94D8A9E144');
    const Plat = new web3.eth.Contract(contractABI, '0x3Bd00B6cd18281E3Ef13Ba348ad2783794dcb2bD');
    const Swar = new web3.eth.Contract(contractABI, '0x5e18a8B78d5395371308C54719fead810Ce2aCd2');
    const Jusdt = new web3.eth.Contract(contractABI, '0x24599b658b57f91E7643f4F154B16bcd2884f9ac');
    const stOPT = new web3.eth.Contract(contractABI, '0x435BeAF4B83A6dc57927E9dB194a3Ccf54100F7a');
    const Jtao = new web3.eth.Contract(contractABI, '0xdbCCc9F8920e7274eeC62e695084D3bCe443c3dd');
    const Angb = new web3.eth.Contract(contractABI, '0x59c1C2f5FA76DB933B97b7c54223129e2A398534');
    const EE = new web3.eth.Contract(contractABI, '0xF663c756b6D57724C3B41c8839aB9c7Af83c9751');
    const II = new web3.eth.Contract(contractABI, '0x523AA3aB2371A6360BeC4fEea7bE1293adb32241');
    const Gear = new web3.eth.Contract(contractABI,'0x0e2610730a3c42fd721b289bee092d9ad1c76890');

        // LP Address
    const JBC = setContract(web3, contractABI, '0x0000000000000000000000000000000000000000');
    const JBC_CMJ = setContract(web3, contractABI, '0x472d0e2E9839c140786D38110b3251d5ED08DF41');
    const JBC_JUSDT = setContract(web3, contractABI, '0x280608DD7712a5675041b95d0000B9089903B569');
    const CMJ_JDAO = setContract(web3, contractABI, '0x3C061eEce15C539CaE99FbE75B3044236Fa2eff0');
    const CMJ_OS = setContract(web3, contractABI, '0x329889325A555b217C41A4c2EADD529a0CfA4231');
    const CMJ_CU = setContract(web3, contractABI, '0x1b70c95fD4EbF8920A624bd2ce22b6905eFBdF60');
    const CMJ_MEOW = setContract(web3, contractABI, '0xdB16eCc5d2c27F67B4a4dc1e25f1e6e20BAcAFD0');
    const CMJ_GOLD = setContract(web3, contractABI, '0x7086EC7ED5D94ef503bE324B0aE8A3748A15fAE5');
    const CMJ_SIL = setContract(web3, contractABI, '0xf189c5B03694b70e5DFD8e8CAE84118Ed7616F19');
    const CMJ_PLAT = setContract(web3, contractABI, '0x78Ff63F4f91Ce56f72882ef9dbE3Be79fBF15044');
    const CMJ_JASP = setContract(web3, contractABI, '0xc19DE37d5e14b387BCda8e62aB4934591315901D');
    const CMJ_CTUNA = setContract(web3, contractABI, '0x7801F8cdBABE6999331d1Bf37d74aAf713C3722F');
    const CMJ_SX31 = setContract(web3, contractABI, '0xda558EE93B466aEb4F59fBf95D25d410318be43A');
    const CMJ_WOOD = setContract(web3, contractABI, '0x466C3b32538eB0DB9f6c88ee2Fa9c72C495cE08F');
    const CMJ_BBQ = setContract(web3, contractABI, '0x6F93F16cF86205C5BB9145078d584c354758D6DB');
    const CMJ_PZA = setContract(web3, contractABI, '0x3161EE630bF36d2AB6333a9CfD22ebaa3e2D7C70');
    const WJBC_SWAR = setContract(web3, contractABI, '0x5a9E35fC4Afc21B9Fc74bE18015D4D3B002A83A3');
    const WJBC_ANGB = setContract(web3, contractABI, '0xDd35db1a731CD86C01d74A8a4bA4354ca1CDE24d');
    const JTAO_II = setContract(web3, contractABI, '0xbD5bFF1fBbD83FECD749a328D98F860f7F343c10');
    const JTAO_EE = setContract(web3, contractABI, '0x3822b065E9980F6cd62Fd8Fa60b3fFB36866CA60');
    const JTAO_GEAR = setContract(web3,contractABI,'0x08Fb0772F805970354B5532039Ef5D6704A470F2');
    const JTAO_CMJ = setContract(web3,contractABI,'0xC8A44E0f07294aEa05269b9FE86678adD5791988');

    erc20Data = [
        { Name: "JBC-CMJ", Contract: JBC_CMJ, main: JBC, mainN: "JBC", pair: CMJ, pairN: "CMJ", mainUSD: jbcToUsd , location: "https://commudao.xyz/gameswap"},
        { Name: "JBC-JUSDT",Contract: JBC_JUSDT, main: JBC, mainN: "JBC", pair: Jusdt, pairN: "JUSDT", mainUSD: jbcToUsd , location: "https://commudao.xyz/gameswap"},
        { Name: "CMJ-OS", Contract: CMJ_OS, main: CMJ, mainN: "CMJ", pair: Os, pairN: "OS", mainUSD: cmjToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "CMJ-CU", Contract: CMJ_CU, main: CMJ, mainN: "CMJ", pair: Cu, pairN: "CU", mainUSD: cmjToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "CMJ-JDAO", Contract: CMJ_JDAO, main: CMJ, mainN: "CMJ", pair: Jdao, pairN: "JDAO", mainUSD: cmjToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "CMJ-MEOW", Contract: CMJ_MEOW, main: CMJ, mainN: "CMJ", pair: Meow, pairN: "MEOW", mainUSD: cmjToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "CMJ-JASP", Contract: CMJ_JASP, main: CMJ, mainN: "CMJ", pair: Jasp, pairN: "JASP", mainUSD: cmjToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "CMJ-CTUNA", Contract: CMJ_CTUNA, main: CMJ, mainN: "CMJ", pair: Ctuna, pairN: "CTUNA", mainUSD: cmjToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "CMJ-GOLD", Contract: CMJ_GOLD, main: CMJ, mainN: "CMJ", pair: Gold, pairN: "GOLD", mainUSD: cmjToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "CMJ-SIL", Contract: CMJ_SIL, main: CMJ, mainN: "CMJ", pair: Sil, pairN: "SIL", mainUSD: cmjToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "CMJ-PLAT", Contract: CMJ_PLAT, main: CMJ, mainN: "CMJ", pair: Plat, pairN: "PLAT", mainUSD: cmjToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "CMJ-SX31", Contract: CMJ_SX31, main: CMJ, mainN: "CMJ", pair: Sx31, pairN: "SX31", mainUSD: cmjToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "CMJ-WOOD", Contract: CMJ_WOOD, main: CMJ, mainN: "CMJ", pair: Wood, pairN: "WOOD", mainUSD: cmjToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "CMJ-BBQ", Contract: CMJ_BBQ, main: CMJ, mainN: "CMJ", pair: Bbq, pairN: "BBQ", mainUSD: cmjToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "CMJ-PZA", Contract: CMJ_PZA, main: CMJ, mainN: "CMJ", pair: Pza, pairN: "PZA", mainUSD: cmjToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "WJBC-SWAR", Contract: WJBC_SWAR, main: WJBC, mainN: "WJBC", pair: Swar, pairN: "SWAR", mainUSD: jbcToUsd , location: "https://commudao.xyz/mall"},
        { Name: "WJBC-ANGB", Contract: WJBC_ANGB, main: WJBC, mainN: "WJBC", pair: Angb, pairN: "ANGB", mainUSD: jbcToUsd , location: "https://commudao.xyz/mall"},
        { Name: "JTAO-II", Contract: JTAO_II, main: Jtao, mainN: "JTAO", pair: II, pairN: "II", mainUSD: jtaoToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "JTAO-EE", Contract: JTAO_EE, main: Jtao, mainN: "JTAO", pair: EE, pairN: "EE", mainUSD: jtaoToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "JTAO-GEAR", Contract: JTAO_GEAR, main: Jtao, mainN: "JTAO", pair: Gear, pairN: "GEAR", mainUSD: jtaoToUSDT , location: "https://jibswap.com/#/swap?inputCurrency=0x0e2610730a3c42fd721b289bee092d9ad1c76890&outputCurrency=0xdbccc9f8920e7274eec62e695084d3bce443c3dd"},
        { Name: "CMJ-JTAO", Contract: JTAO_CMJ, main: CMJ, mainN: "CMJ", pair: Jtao, pairN: "JTAO", mainUSD: cmjToUSDT , location: "https://jibswap.com/#/swap?inputCurrency=0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b&outputCurrency=0xdbccc9f8920e7274eec62e695084d3bce443c3dd"},
    
    ]

    start()

    async function getTokenData(lpAddress,mainToken,pairToken){
        getMainToken = await mainToken.methods.balanceOf(lpAddress).call();
        getPairToken = await pairToken.methods.balanceOf(lpAddress).call();
        
        if(getPairToken != Jasp){
            getMainToken = web3.utils.fromWei(getMainToken,'gwei');
            getPairToken = web3.utils.fromWei(getMainToken,'ether');
        }else{
            getMainToken = web3.utils.fromWei(getMainToken,'gwei');
            getPairToken = web3.utils.fromWei(getMainToken,'gwei'); 
        }

        swap1 = getMainToken / getPairToken;
        swap2 = getPairToken / getMainToken;
        priceData.push([mainTokenAmount, pairTokenAmount, swap1, swap2]);

        return {getMainToken,getPairToken,swap1,swap2}
    }

    async function start(){
        for(var pool of erc20Data){
            await getTokenData(Contract.address,main,pair);
        }
        console.table(priceData);
    }

    

}



    



