let web3;
let currentProviderIndex = 0;

let jbcToUsd;
let jbcToCmj;
let taoToUsd;
let thbToUsd;


/**
 * Auto  RPC connecting
 */

setFiatAndTaoPrice(); // setting price of THB TO USD and TAO in BKC Chain

const PROVIDER_URLS = [
    'https://rpc-l1.jibchain.net',
    'http://49.13.16.167:8545',
    'https://rpc-l1.jibchain.net',
    'https://rpc-l1.jbc.aomwara.in.th',
    'https://rpc-l1.jbc.xpool.pw',
    'https://jib-rpc.inan.in.th'
];

async function checkConnection() {
    while (currentProviderIndex < PROVIDER_URLS.length) {
        const providerUrl = PROVIDER_URLS[currentProviderIndex];
        web3 = new Web3(providerUrl);

        try {
            const blockNumber = await web3.eth.getBlockNumber();
            console.log(`Connected to provider: ${providerUrl}. Latest block number: ${blockNumber}`);
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
                            console.log(thbToUsd,"\t",taoToUsd)
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

    erc20Data = [
        { Name: "JBC-CMJ", Contract: JBC_CMJ, main: JBC, mainN: "JBC", pair: CMJ, pairN: "CMJ", mainUSD: jbcToUSDT , location: "https://commudao.xyz/gameswap"},
        { Name: "JBC-JUSDT",Contract: JBC_JUSDT, main: JBC, mainN: "JBC", pair: Jusdt, pairN: "JUSDT", mainUSD: jbcToUSDT , location: "https://commudao.xyz/gameswap"},
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
        { Name: "WJBC-SWAR", Contract: WJBC_SWAR, main: WJBC, mainN: "WJBC", pair: Swar, pairN: "SWAR", mainUSD: jbcToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "WJBC-ANGB", Contract: WJBC_ANGB, main: WJBC, mainN: "WJBC", pair: Angb, pairN: "ANGB", mainUSD: jbcToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "JTAO-II", Contract: JTAO_II, main: Jtao, mainN: "JTAO", pair: II, pairN: "II", mainUSD: jtaoToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "JTAO-EE", Contract: JTAO_EE, main: Jtao, mainN: "JTAO", pair: EE, pairN: "EE", mainUSD: jtaoToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "JTAO-GEAR", Contract: JTAO_GEAR, main: Jtao, mainN: "JTAO", pair: Gear, pairN: "GEAR", mainUSD: jtaoToUSDT , location: "https://jibswap.com/#/swap?inputCurrency=0x0e2610730a3c42fd721b289bee092d9ad1c76890&outputCurrency=0xdbccc9f8920e7274eec62e695084d3bce443c3dd"},
        { Name: "CMJ-JTAO", Contract: JTAO_CMJ, main: CMJ, mainN: "CMJ", pair: Jtao, pairN: "JTAO", mainUSD: cmjToUSDT , location: "https://jibswap.com/#/swap?inputCurrency=0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b&outputCurrency=0xdbccc9f8920e7274eec62e695084d3bce443c3dd"},
    
    ]



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

        return {getMainToken,getPairToken,swap1,swap2}
    }

    async function setPrice(locationID,lpAddress,mainToken,pairToken){
        let getMainToken,getPairToken,swap1,swap2;
        ({getMainToken,getPairToken,swap1,swap2} = await getTokenData(lpAddress,mainToken,pairToken));

        const priceBoardBody = document.querySelector("#priceBoard");

    }

}



    



