let price_contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

showNotification("Loading Price Board........")


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


async function price_jbc(){
    let jbcToUsd,cmjToUSDT,jtaoToUSDT;
    let jbcToCmj;


    const PROVIDER_URLS = [
        'https://rpc-l1.jibchain.net',
        'http://49.13.16.167:8545',
        'https://rpc-l1.jibchain.net',
        'https://rpc-l1.jbc.aomwara.in.th',
        'https://rpc-l1.jbc.xpool.pw',
        'https://jib-rpc.inan.in.th'
    ];
    web3_jbc = new Web3("https://rpc-l1.jibchain.net");

    async function checkConnection() {
        while (currentProviderIndex < PROVIDER_URLS.length) {
            const providerUrl = PROVIDER_URLS[currentProviderIndex];
            var web3_jbc = new Web3(providerUrl);
    
            try {
                const blockNumber = await web3_jbc.eth.getBlockNumber();
                console.log(`Connected to provider: ${providerUrl}. Latest block number: ${blockNumber}`);
                return; 
            } catch (error) {
                console.error(`RPC ERROR with provider: ${providerUrl}`, error);
                currentProviderIndex++;
            }
        }
    
        console.error("All provider URLs failed.");
    }
    function setContract(web3_jbc,ABI, address) {
        return new web3_jbc.eth.Contract(ABI, address);
    }
    // Declare ERC 20 
    const CMJ = setContract(web3_jbc,price_contractABI, '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b');
    const WJBC = setContract(web3_jbc,price_contractABI, '0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747');
    const Jib_WJBC = setContract(web3_jbc,price_contractABI, '0x99999999990FC47611b74827486218f3398A4abD');
    const Meow = setContract(web3_jbc,price_contractABI, '0x04052384166fC30D03929eE328805eC084776843');
    const Wood = setContract(web3_jbc,price_contractABI, '0xc2744Ff255518a736505cF9aC1996D9adDec69Bd');
    const Tuna = setContract(web3_jbc,price_contractABI, '0x09676315DC0c85F6bd5e866C5f1363A00Eec4381');
    const Mice = setContract(web3_jbc,price_contractABI, '0x09DE640ecd50e1c81bCB266279e3ffC2719873df');
    const Cu = setContract(web3_jbc,price_contractABI, '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841');
    const Jasp = setContract(web3_jbc,price_contractABI, '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860');
    const Os = setContract(web3_jbc,price_contractABI, '0xAc5299D92373E9352636559cca497d7683A47655');
    const Jdao = setContract(web3_jbc,price_contractABI, '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88');
    const Mt = setContract(web3_jbc,price_contractABI, '0x169816800f1eA9C5735937388aeb9C2A3bAca11F');
    const Vabag = setContract(web3_jbc,price_contractABI, '0x495d66c9Fd7c63807114d06802A48BdAA60a0426');
    const Bbq = setContract(web3_jbc,price_contractABI, '0x7004757e595409568Bd728736e1b0c79FDc94e1c');
    const Pza = setContract(web3_jbc,price_contractABI, '0x09DcdCFc6C48803681a3422997c679E773656763');
    const Ctuna = setContract(web3_jbc,price_contractABI, '0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0');
    const Sx31 = setContract(web3_jbc,price_contractABI, '0xd431d826d7a4380b9259612176f00528b88840a7');
    const Sil = setContract(web3_jbc,price_contractABI, '0x2a081667587c35956d34A4cC3bf92b9CA0ef2C6f');
    const Gold = setContract(web3_jbc,price_contractABI, '0x7d5346E33889580528e6F79f48BdEE94D8A9E144');
    const Plat = setContract(web3_jbc,price_contractABI, '0x3Bd00B6cd18281E3Ef13Ba348ad2783794dcb2bD');
    const Swar = setContract(web3_jbc,price_contractABI, '0x5e18a8B78d5395371308C54719fead810Ce2aCd2');
    const Jusdt = setContract(web3_jbc,price_contractABI, '0x24599b658b57f91E7643f4F154B16bcd2884f9ac');
    const stOPT = setContract(web3_jbc,price_contractABI, '0x435BeAF4B83A6dc57927E9dB194a3Ccf54100F7a');
    const Jtao = setContract(web3_jbc,price_contractABI, '0xdbCCc9F8920e7274eeC62e695084D3bCe443c3dd');
    const Angb = setContract(web3_jbc,price_contractABI, '0x59c1C2f5FA76DB933B97b7c54223129e2A398534');
    const EE = setContract(web3_jbc,price_contractABI, '0xF663c756b6D57724C3B41c8839aB9c7Af83c9751');
    const II = setContract(web3_jbc,price_contractABI, '0x523AA3aB2371A6360BeC4fEea7bE1293adb32241');
    const Gear = setContract(web3_jbc,price_contractABI,'0x0e2610730a3c42fd721b289bee092d9ad1c76890');
    const Doijib = setContract(web3_jbc,price_contractABI,'0x7414e2D8Fb8466AfA4F85A240c57CB8615901FFB')
    const Ambassador_V03_ABI = [{"inputs":[{"internalType":"address","name":"_kyc","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"frenCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"kyc","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"referalData","outputs":[{"internalType":"address","name":"fren","type":"address"},{"internalType":"address","name":"ambassador","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_ambassador","type":"address"}],"name":"regist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"registCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"registIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

        // LP Address
    const JBC_CMJ = setContract(web3_jbc,price_contractABI, '0x472d0e2E9839c140786D38110b3251d5ED08DF41');
    const JBC_JUSDT = setContract(web3_jbc,price_contractABI, '0x280608DD7712a5675041b95d0000B9089903B569');
    const CMJ_JDAO = setContract(web3_jbc,price_contractABI, '0x3C061eEce15C539CaE99FbE75B3044236Fa2eff0');
    const CMJ_OS = setContract(web3_jbc,price_contractABI, '0x329889325A555b217C41A4c2EADD529a0CfA4231');
    const CMJ_CU = setContract(web3_jbc,price_contractABI, '0x1b70c95fD4EbF8920A624bd2ce22b6905eFBdF60');
    const CMJ_MEOW = setContract(web3_jbc,price_contractABI, '0xdB16eCc5d2c27F67B4a4dc1e25f1e6e20BAcAFD0');
    const CMJ_GOLD = setContract(web3_jbc,price_contractABI, '0x7086EC7ED5D94ef503bE324B0aE8A3748A15fAE5');
    const CMJ_SIL = setContract(web3_jbc,price_contractABI, '0xf189c5B03694b70e5DFD8e8CAE84118Ed7616F19');
    const CMJ_PLAT = setContract(web3_jbc,price_contractABI, '0x78Ff63F4f91Ce56f72882ef9dbE3Be79fBF15044');
    const CMJ_JASP = setContract(web3_jbc,price_contractABI, '0xc19DE37d5e14b387BCda8e62aB4934591315901D');
    const CMJ_CTUNA = setContract(web3_jbc,price_contractABI, '0x7801F8cdBABE6999331d1Bf37d74aAf713C3722F');
    const CMJ_SX31 = setContract(web3_jbc,price_contractABI, '0xda558EE93B466aEb4F59fBf95D25d410318be43A');
    const CMJ_WOOD = setContract(web3_jbc,price_contractABI, '0x466C3b32538eB0DB9f6c88ee2Fa9c72C495cE08F');
    const CMJ_BBQ = setContract(web3_jbc,price_contractABI, '0x6F93F16cF86205C5BB9145078d584c354758D6DB');
    const CMJ_PZA = setContract(web3_jbc,price_contractABI, '0x3161EE630bF36d2AB6333a9CfD22ebaa3e2D7C70');
    const WJBC_SWAR = setContract(web3_jbc,price_contractABI, '0x5a9E35fC4Afc21B9Fc74bE18015D4D3B002A83A3');
    const WJBC_ANGB = setContract(web3_jbc,price_contractABI, '0xDd35db1a731CD86C01d74A8a4bA4354ca1CDE24d');
    const JTAO_II = setContract(web3_jbc,price_contractABI, '0xbD5bFF1fBbD83FECD749a328D98F860f7F343c10');
    const JTAO_EE = setContract(web3_jbc,price_contractABI, '0x3822b065E9980F6cd62Fd8Fa60b3fFB36866CA60');
    const JTAO_GEAR = setContract(web3_jbc,price_contractABI,'0x08Fb0772F805970354B5532039Ef5D6704A470F2');
    const JTAO_CMJ = setContract(web3_jbc,price_contractABI,'0xC8A44E0f07294aEa05269b9FE86678adD5791988');
    const MEOW_TUNA = setContract(web3_jbc,price_contractABI,'0xA86c548E4eB41c4b7752213c8f8dCf94c50354B0');
    const MEOW_MICE = setContract(web3_jbc,price_contractABI,'0xcc59B348085384C1B8e4D310e53a4823aCd38653');
    const MEOW_MT = setContract(web3_jbc,price_contractABI,'0xb882C5Ec427De3085127C89De4fe3ceE12b345bb');
    const Ambassador_V03 = setContract(web3_jbc,Ambassador_V03_ABI, '0x467eF538C90434D4F69cF8A8F40cd71a96e8424e');
    const WJBC_DOI = setContract(web3_jbc,price_contractABI,'0xF2c2A60F3Fcf8017fED0655F694B91a785fc170b');

    const JBC = '0x';

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
        { Name: "MEOW-TUNA",Contract: MEOW_TUNA, main:Meow , mainN: "MEOW" , pair: Tuna , pairN:"Tuna", mainUSD: 0, location:""},
        { Name: "MEOW-MICE",Contract: MEOW_MICE,main:Meow,mainN:"MEOW",pair:Mice,pairN:"Mice",mainUSD:0,location:""},
        { Name: "MEOW-MT",Contract: MEOW_MT,main:Meow,mainN:"MEOW",pair:Mt,pairN:"MT",mainUSD:0,location:""},
        { Name: "WJBC-DoiJIB", Contract: WJBC_DOI, main: WJBC, mainN: "WJBC", pair: Doijib, pairN: "DOIJIB", mainUSD: jbcToUsd , location: "https://commudao.xyz/mall"},

    ]


    const priceData = [];

    async function getTokenData(name,lpAddress, mainToken,mainN, pairToken,pairN) {
        let mainTokenBalance, pairTokenBalance;
    
        if (mainToken !== null && mainToken !== '') {
            if (typeof mainToken.methods !== 'undefined') {
                mainTokenBalance = await mainToken.methods.balanceOf(lpAddress).call();
            } else {
                mainTokenBalance = await web3_jbc.eth.getBalance(lpAddress);
            }
        } else {
            mainTokenBalance = await web3_jbc.eth.getBalance(lpAddress);
        }
    
        if (pairToken !== null && pairToken !== '') {
            if (typeof pairToken.methods !== 'undefined') {
                pairTokenBalance = await pairToken.methods.balanceOf(lpAddress).call();
            } else {
                pairTokenBalance = await web3_jbc.eth.getBalance(lpAddress);
            }
        } else {
            pairTokenBalance = await web3_jbc.eth.getBalance(lpAddress);
        }
    
        mainTokenBalance = parseFloat(web3_jbc.utils.fromWei(mainTokenBalance, 'ether'));

        if(pairN != "JASP"){
            pairTokenBalance = parseFloat(web3_jbc.utils.fromWei(pairTokenBalance, 'ether')); 
        }else
            pairTokenBalance = parseFloat(web3_jbc.utils.fromWei(pairTokenBalance, 'gwei')); 
    
        const swap1 = mainTokenBalance / pairTokenBalance;
        const swap2 = pairTokenBalance / mainTokenBalance;

        text1 = `${mainN} / ${pairN}`;
        text2 = `${pairN} / ${mainN}`;
    
        priceData.push({
            name,
            lpAddress,
            mainTokenBalance,
            mainN,
            pairTokenBalance,
            pairN,
            swap1,
            text1, // Symbolize swap1
            swap2,
            text2, // Symbolize swap2
        });
        
    
        return { mainTokenBalance, pairTokenBalance, swap1, swap2 };
    }
    
    
    function setPrice(id,value){
        if(value < 0.0000000000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 14 });
        }else if(value < 0.00000000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 12 });
        }else if(value < 0.000000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 10 });
        }else if(value < 0.00000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 9 });
        }else if(value < 0.000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 7 });
        }else if(value < 0.0099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 5 });
        }else if(value < 0.99){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 3 });
        }else 
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 2 });

    }

    async function start() {
        for (const pool of erc20Data) {
            if (pool.Contract) {
                await getTokenData(pool.Name,pool.Contract.options.address, pool.main,pool.mainN, pool.pair,pool.pairN);
            } else {
                await getTokenData(pool.Name,pool.main, null, null);
            }
        }
        console.table(priceData);

        const [thbToUsd, taoToUsd,usdTokkub] = await setFiatAndTaoPrice(); // เรียกใช้ setFiatAndTaoPrice() ด้วย await
        console.log(thbToUsd, "THB/USD");
        console.log(taoToUsd, "USDT/TAO");

        jbcToCmj = priceData[0].swap1; // Value of CMJ in JBC
        usdToCmj = priceData[0].swap1*priceData[1].swap2; // Value of CMJ in Usd
        jTaoToCmj = priceData[20].swap1; // Value if CMJ in JTAO
        thbToCmj = usdToCmj * thbToUsd;
        console.log(jTaoToCmj,"JTAO TO CMJ")
        usdToJbc = priceData[1].swap2; // Value of Jbc in USD
        cmjToJbc = priceData[0].swap2; // Value of Jbc in CMJ
        thbToJbc = usdToJbc * thbToUsd;
        

            /// JBC
        setPrice("B-cmjToJbc",cmjToJbc*1.012);
        setPrice("B-usdToJbc",usdToJbc*1.012);
        setPrice("B-thbToJbc",thbToJbc*1.012);
        setPrice("S-cmjToJbc",cmjToJbc*0.998);
        setPrice("S-usdToJbc",usdToJbc*0.998);
        setPrice("S-thbToJbc",thbToJbc*0.998);
            /// CMJ
        setPrice("B-jbcToCmj",jbcToCmj*1.012);
        setPrice("B-usdToCmj",usdToCmj*1.012);
        setPrice("B-thbToCmj",thbToCmj*1.012);
        setPrice("S-jbcToCmj",jbcToCmj*0.998);
        setPrice("S-usdToCmj",usdToCmj*0.998);
        setPrice("S-thbToCmj",thbToCmj*0.998);
            // USD
        setPrice("thbUsd",thbToUsd);
            // TAO
        setPrice("usdToTao",taoToUsd);
        setPrice("thbToTao",taoToUsd*thbToUsd);
        setPrice("cmjToTao",jTaoToCmj);
            // MEOW
        setPrice("B-cmjToMeow",priceData[5].swap1 * 1.05);
        setPrice("B-usdToMeow",priceData[5].swap1 * usdToCmj * 1.05);
        setPrice("B-thbToMeow",priceData[5].swap1 * thbToCmj * 1.05);
        setPrice("S-cmjToMeow",priceData[5].swap1 * 0.95);
        setPrice("S-usdToMeow",priceData[5].swap1 * usdToCmj * 0.95);
        setPrice("S-thbToMeow",priceData[5].swap1 * thbToCmj * 0.95);
        
        setPrice("B-Wood",priceData[12].swap1 * 1.05)
        setPrice("S-Wood",priceData[12].swap1 * 0.95)

        setPrice("B-Cu",priceData[3].swap1 * 1.05)
        setPrice("S-Cu",priceData[3].swap1 * 0.95)

        setPrice("B-Os",priceData[2].swap1 * 1.05)
        setPrice("S-Os",priceData[2].swap1 * 0.95)

        setPrice("B-Jdao",priceData[4].swap1 * 1.05)
        setPrice("S-Jdao",priceData[4].swap1 * 0.95)

        setPrice("B-Jasp",priceData[6].swap1 * 1.05)
        setPrice("S-Jasp",priceData[6].swap1 * 0.95)

        setPrice("B-cmjToAngb",priceData[16].swap1/jbcToCmj * 1.05);
        setPrice("B-jbcToAngb",priceData[16].swap1 * 1.05);
        setPrice("S-cmjToAngb",priceData[16].swap1/jbcToCmj * 0.95);
        setPrice("S-jbcToAngb",priceData[16].swap1 * 0.95);

        setPrice("B-cmjToII",priceData[17].swap1 * jTaoToCmj * 1.05);
        setPrice("B-taoToII",priceData[17].swap1 * 1.05);
        setPrice("S-cmjToII",priceData[17].swap1 * jTaoToCmj * 0.95);
        setPrice("S-taoToII",priceData[17].swap1 * 0.95);

        setPrice("B-cmjToEE",priceData[18].swap1 * jTaoToCmj * 1.05);
        setPrice("B-taoToEE",priceData[18].swap1 * 1.05);
        setPrice("S-cmjToEE",priceData[18].swap1 * jTaoToCmj * 0.95);
        setPrice("S-taoToEE",priceData[18].swap1 * 0.95);

        setPrice("B-Ctuna",priceData[7].swap1 * 1.05);
        setPrice("S-Ctuna",priceData[7].swap1 * 0.95);
        
        setPrice("B-Gold",priceData[8].swap1 * 1.05);
        setPrice("S-Gold",priceData[8].swap1 * 0.95);
        
        setPrice("B-Silver",priceData[9].swap1 * 1.05);
        setPrice("S-Silver",priceData[9].swap1 * 0.95);
    
        setPrice("B-Plat",priceData[10].swap1 * 1.05);
        setPrice("S-Plat",priceData[10].swap1 * 0.95);

        setPrice("B-Sx31",priceData[11].swap1 * 1.05);
        setPrice("S-Sx31",priceData[11].swap1 * 0.95);

        setPrice("B-Bbq",priceData[13].swap1 * 1.05);
        setPrice("S-Bbq",priceData[13].swap1 * 0.95);
        setPrice("B-Pza",priceData[14].swap1 * 1.05);
        setPrice("S-Pza",priceData[14].swap1 * 0.95);

        setPrice("B-cmjToSwar",priceData[15].swap1/jbcToCmj * 1.05);
        setPrice("B-jbcToSwar",priceData[15].swap1 * 1.05);
        setPrice("S-cmjToSwar",priceData[15].swap1/jbcToCmj * 0.95);
        setPrice("S-jbcToSwar",priceData[15].swap1 * 0.95);

        setPrice("B_doijib_1",priceData[24].swap1 * 1.05);
        setPrice("S_doijib_1",priceData[24].swap1 * 0.95);
        setPrice("B_doijib_2",priceData[24].swap1/jbcToCmj * 1.05);
        setPrice("S_doijib_2",priceData[24].swap1/jbcToCmj * 0.95);
        setPrice("B_doijib_3",(priceData[24].swap1/jbcToCmj) * thbToCmj * 1.05);
        setPrice("S_doijib_3",(priceData[24].swap1/jbcToCmj) * thbToCmj * 0.95);


        setLabFactory(jTaoToCmj,priceData[13].swap1,priceData[14].swap1,priceData[15].swap1/jbcToCmj,priceData[12].swap1,priceData[21].swap1,priceData[22].swap1,priceData[3].swap1,priceData[6].swap1,priceData[2].swap1,priceData[4].swap1,priceData[23].swap1,priceData[8].swap1,priceData[9].swap1,priceData[7].swap1,priceData[11].swap1,0,cmjToJbc,priceData[10].swap1,priceData[18].swap1 * jTaoToCmj * 1.05,priceData[16].swap1/jbcToCmj * 1.05,jTaoToCmj,priceData[17].swap1 * 1.05);

        function setLocal(number,maximumFractionDigits){
            return number.toLocaleString(undefined, { maximumFractionDigits : maximumFractionDigits })
          }
          
          async function setLabFactory(JTAOPrice,Bbq_Price,Pza_Price,Swar_Price,Wood_Price,Tuna_Price,Mice_Price,Cu_Price,Jasp_Price,Os_Price,Jdao_Price,Mt_Price,Gold_Price,Silver_Price,Ctuna_Price,Sx31_Price,stOPT_Price,Jbc_Price,Plat_Price,EE_Price,ANGB_in_CMJ,JTAO_to_CMJ,JTAO_to_II){
            showNotification("Setting Labs")
            showNotification("Dungeon Calculator is Ready")
          
          // Craft BBQ
                    math1 = Wood_Price*100;
                    math2 = Jbc_Price*0.01;
                    prod = Bbq_Price*40*0.95;
                    pnl = prod-(math1+math2);
            document.getElementById("labD2").innerHTML = setLocal(math1,6);
            document.getElementById("labG2").innerHTML = setLocal(math2,6);
            document.getElementById("BbqProd").innerHTML = setLocal(prod,6);
            document.getElementById("labM2").innerHTML = setLocal(pnl,6);
          // Craft BBQ Factory
          
                    math1 = Wood_Price*100000000;
                    math2 = Jdao_Price*1*1.05;
                    prod = Bbq_Price*6000*0.95;
                    claimCost = 0.01;
                    pnl = prod-(math1+math2+claimCost);
            document.getElementById("labD3").innerHTML = setLocal(math1,6);
            document.getElementById("labG3").innerHTML = setLocal(math2,6);
            document.getElementById("labK3").innerHTML = setLocal(prod,6);
            document.getElementById("labM3").innerHTML = setLocal(pnl,6);
          // Craft Craft Pizza
                    math1 = Bbq_Price*10000*1.05;
                    math2 = stOPT_Price*1;
                    prod = Pza_Price*500*0.95;
                    pnl = prod-(math1+math2);
            document.getElementById("labD4").innerHTML = setLocal(math1,6);
            document.getElementById("labG4").innerHTML = setLocal(math2,6);
            document.getElementById("labK4").innerHTML = setLocal(prod,6);
            document.getElementById("labM4").innerHTML = setLocal(pnl,6);
          // Craft Silver Factory
                    math1 = Cu_Price*150000*1.05;
                    math2 = 1;
                    prod = Silver_Price*5000*0.95;
                    pnl = prod-(math1+math2);
            document.getElementById("labD8").innerHTML = setLocal(math1,6);
            document.getElementById("labK8").innerHTML = setLocal(prod,6);
            document.getElementById("labM8").innerHTML = setLocal(pnl,6);
          // Craft Gold Factory (Silver And SX31)
                    math1 = Silver_Price*10000*1.05;
                    math2 = Sx31_Price*5*1.05;
                    prod = Gold_Price*500*0.95;
                    pnl = prod-(math1+math2);
            document.getElementById("labD9").innerHTML = setLocal(math1,6);
            document.getElementById("labG9").innerHTML = setLocal(math2,6);
            document.getElementById("labK9").innerHTML = setLocal(prod,6);
            document.getElementById("labM9").innerHTML = setLocal(pnl,6);
          // Craft Gold Factory (BBQ And JBC)
                    math1 = Bbq_Price*2000*1.05;
                    math2 = Jbc_Price*1;
                    prod = Gold_Price*6.25*0.95;
                    pnl = prod-(math1+math2);
            document.getElementById("labD10").innerHTML = setLocal(math1,6);
            document.getElementById("labK10").innerHTML = setLocal(prod,6);
            document.getElementById("labM10").innerHTML = setLocal(pnl,6);
            // Craft Gold Factory (Wood And $MT)
                    math1 = Wood_Price*100000000;
                    math2 = Mt_Price*50;
                    prod = Gold_Price*50*0.95;
                    pnl = prod-(math1+math2);
            document.getElementById("labD11").innerHTML = setLocal(math1,6);
            document.getElementById("labG11").innerHTML = setLocal(math2,6);
            document.getElementById("labK11").innerHTML = setLocal(prod,6);
            document.getElementById("labM11").innerHTML = setLocal(pnl,6);
            // Craft Platinum Factory
                    math1 = Gold_Price*300*1.05;
                    math2 = Ctuna_Price*5*1.05;
                    prod = Plat_Price*100*0.95;
                    pnl = prod-(math1+math2);
            document.getElementById("labD12").innerHTML = setLocal(math1,6);
            document.getElementById("labG12").innerHTML = setLocal(math2,6);
            document.getElementById("labK12").innerHTML = setLocal(prod,6);
            document.getElementById("labM12").innerHTML = setLocal(pnl,6);
            // Craft Platinum Factory 2
                    math1 = EE_Price*888*1.05;
                    math2 = 1;
                    prod = Plat_Price*10*0.95;
                    pnl = prod-(math1+math2);
            document.getElementById("PlatFactory2_COST1").innerHTML = setLocal(math1,6);
            document.getElementById("PlatFactory2_Product").innerHTML = setLocal(prod,6);
            document.getElementById("PlatFactory2_PNL").innerHTML = setLocal(pnl,6);
            // Craft CTUNA Factory
                math1 = Tuna_Price*50*1.05;
                math2 = 10*1;
                prod = Ctuna_Price*50*0.95;
                pnl = prod-(math1+math2);
            document.getElementById("labD5").innerHTML = setLocal(math1,6);
            document.getElementById("labK5").innerHTML = setLocal(prod,6);
            document.getElementById("labM5").innerHTML = setLocal(pnl,6);
            // Craft SX31 Labs
                math1 = Mice_Price*50;
                math2 = 9*1;
                prod = Sx31_Price*50*0.95;
                pnl = prod-(math1+math2);
            document.getElementById("labD6").innerHTML = setLocal(math1,6);
            document.getElementById("labK6").innerHTML = setLocal(prod,6);
            document.getElementById("labM6").innerHTML = setLocal(pnl,6);
            // Craft SX31 Fac
                math1 = Mice_Price*500;
                math2 = 90*1;
                prod = Sx31_Price*500*0.95;
                pnl = prod-(math1+math2);
            document.getElementById("labD7").innerHTML = setLocal(math1,6);
            document.getElementById("labK7").innerHTML = setLocal(prod,6);
            document.getElementById("labM7").innerHTML = setLocal(pnl,6);
            // Craft Supply War Factory
                math1 = 0*1;
                math2 = 1*1;
                prod = Swar_Price*0.95;
                pnl = prod-(math1+math2);
            document.getElementById("labD13").innerHTML = setLocal(math1,6);
            document.getElementById("labK13").innerHTML = setLocal(prod,6);
            document.getElementById("labM13").innerHTML = setLocal(pnl,6);
            document.getElementById("SWAR_PNL2").innerHTML = setLocal((pnl/Jbc_Price),4);
            // Craft Star Factory
                math1 = ANGB_in_CMJ*40*1.05;
                math2 = 1*1;
                prod = 0;
                pnl = prod-(math1+math2);
            document.getElementById("Lab_StarFactory_Cost1").innerHTML = setLocal(math1,6);
            document.getElementById("Lab_StarFactory_ProductSell").innerHTML = setLocal(prod,6);
            document.getElementById("Lab_StarFactory_PNL").innerHTML = setLocal(pnl,6);
            document.getElementById("STAR_PNL2").innerHTML = setLocal((pnl/Jbc_Price),4);
            // Craft II Factory
                math1 = 0*888; //Matherials
                math2 = JTAO_to_CMJ*8; // Matherials
                prod = JTAO_to_II*0.95;
                pnl = prod-8; // PNL in JTAO
                pnl2 = pnl*JTAO_to_CMJ; // PNL in CMJ
            document.getElementById("Lab_IIFactory_Cost1").innerHTML = setLocal(math1,6);
            document.getElementById("Lab_IIFactory_Cost2").innerHTML = setLocal(math2,6);
            document.getElementById("Lab_IIFactory_ProductSell").innerHTML = setLocal(prod,6);
            document.getElementById("Lab_IIFactory_PNL").innerHTML = setLocal(pnl,6);
            document.getElementById("II_PNL2").innerHTML = setLocal(pnl2,4);
            // Craft II2 Factory
                math1 = 0*88888; //Matherials
                math2 = JTAO_to_CMJ*128; // Matherials
                prod = (JTAO_to_II*8)*0.95;
                pnl = prod-128; // PNL in JTAO
                pnl2 = pnl*JTAO_to_CMJ; // PNL in CMJ
            document.getElementById("Lab_II2Factory_Cost1").innerHTML = setLocal(math1,6);
            document.getElementById("Lab_II2Factory_Cost2").innerHTML = setLocal(math2,6);
            document.getElementById("Lab_II2Factory_ProductSell").innerHTML = setLocal(prod,6);
            document.getElementById("Lab_II2Factory_PNL").innerHTML = setLocal(pnl,6);
            document.getElementById("II2_PNL2").innerHTML = setLocal(pnl2,4);
          
            // Dungeon Settings
                    CuGasDay = (Bbq_Price*500)*24;
                    JaspGasDay = (Pza_Price*500);
                    AngbGasDay = (Swar_Price*0.2);
            document.getElementById("labR3").innerHTML = setLocal(CuGasDay,2);
            document.getElementById("labR4").innerHTML = setLocal(JaspGasDay,2);
            document.getElementById("labR5").innerHTML = setLocal(AngbGasDay,2);
                    CuGasDayJBC = (CuGasDay/Jbc_Price)*1;
                    JaspGasDayJBC = (JaspGasDay/Jbc_Price)*1;
                    AngbGasDayJBC = (AngbGasDay/Jbc_Price)*1;
            document.getElementById("labS3").innerHTML = setLocal(CuGasDayJBC,4);
            document.getElementById("labS5").innerHTML = setLocal(JaspGasDayJBC,4);
            document.getElementById("labS7").innerHTML = setLocal(AngbGasDayJBC,4);
          
          
            // Setting JasperCave
          {
            gasType = Pza_Price*1;
                prodType = Jasp_Price*1;
                rewardPow = 0.0000864;
                rwCMJPow = rewardPow*prodType;
                rwJBCPow = rwCMJPow*Jbc_Price;
                gasFee = gasType*500;
                minPow = gasFee/(prodType*rewardPow);
                prof1 = ((1+gasFee)/prodType)/rewardPow;
                prof5 = ((5+gasFee)/prodType)/rewardPow;
                prof10 = ((10+gasFee)/prodType)/rewardPow;
                prof100 = ((100+gasFee)/prodType)/rewardPow;
            document.getElementById("labU4").innerHTML = setLocal(minPow*1.1,0);
            document.getElementById("lab_R5").innerHTML = setLocal(gasFee,3);
            document.getElementById("labV4").innerHTML = setLocal(rwCMJPow,6);
            document.getElementById("labEV4").innerHTML = setLocal(rwJBCPow,6);
            document.getElementById("labW4").innerHTML = setLocal(prof1,0);
            document.getElementById("labX4").innerHTML = setLocal(prof5,0);
            document.getElementById("labY4").innerHTML = setLocal(prof10,0);
            document.getElementById("labZ4").innerHTML = setLocal(prof100,0);
            // Setting Copper
                gasType = Bbq_Price*1;
                prodType = Cu_Price*1;
                rewardPow = 0.36;
                rwCMJPow = rewardPow*prodType;
                rwJBCPow = rwCMJPow*Jbc_Price;
                gasFee = gasType*500;
                minPow = gasFee/(prodType*rewardPow);
                prof1 = ((1+gasFee*24)/prodType)/rewardPow/24+1;
                prof5 = ((5+gasFee*24)/prodType)/rewardPow/24+1;
                prof10 = ((10+gasFee*24)/prodType)/rewardPow/24+1;
                prof100 = ((100+gasFee*24)/prodType)/rewardPow/24+1;
            document.getElementById("labU2").innerHTML = setLocal(minPow*1.1,0);
            document.getElementById("labR2").innerHTML = setLocal(gasFee,3);
            document.getElementById("labV2").innerHTML = setLocal(rwCMJPow,6);
            document.getElementById("labAB2").innerHTML = setLocal(rwJBCPow,6);
            document.getElementById("labW2").innerHTML = setLocal(prof1,0);
            document.getElementById("labX2").innerHTML = setLocal(prof5,0);
            document.getElementById("labY2").innerHTML = setLocal(prof10,0);
            document.getElementById("labZ2").innerHTML = setLocal(prof100,0);
          }
          // Setting DaemonWorld
          {
          const gasType = Swar_Price;
          const prodType = ANGB_in_CMJ;
          const rewardPow = 0.000012096;
          const rwCMJPow = rewardPow * prodType;
          const rwJBCPow = rwCMJPow * Jbc_Price;
          const gasFee = gasType * 0.2;
          const minPow = gasFee / (prodType * rewardPow);
          const prof1 = ((1 + gasFee) / prodType) / rewardPow;
          const prof5 = ((5 + gasFee) / prodType) / rewardPow;
          const prof10 = ((10 + gasFee) / prodType) / rewardPow;
          const prof100 = ((100 + gasFee) / prodType) / rewardPow;
          
          document.getElementById("labU6").innerHTML = setLocal(minPow*1.1,0);
          document.getElementById("labR6").innerHTML = setLocal(gasFee,3);
          document.getElementById("labV6").innerHTML = setLocal(rwCMJPow,6);
          document.getElementById("labAB6").innerHTML = setLocal(rwJBCPow,6);
          document.getElementById("labW6").innerHTML = setLocal(prof1,0);
          document.getElementById("labX6").innerHTML = setLocal(prof5,0);
          document.getElementById("labY6").innerHTML = setLocal(prof10,0);
          document.getElementById("labZ6").innerHTML = setLocal(prof100,0);
          }
          
          // Setting Cryptic Cogs Lab_IIFactory_PNL
          {
          const II_Price = parseFloat(document.getElementById("B-taoToII").textContent) ; // II in JTAO
          const EE_Price = parseFloat(document.getElementById("B-taoToEE").textContent) ; // II in JTAO
          const Jtao_inUSDT = parseFloat(document.getElementById("usdToTao").textContent) ; //
          const CMJ_inUSDT = parseFloat(document.getElementById("B-usdToCmj").textContent) ; // 
          const gasType = II_Price;
          const prodType = EE_Price;
          const rewardPow = 0.0767232;
          const reJtaoPow = rewardPow / JTAOPrice;
          const gasFee = gasType * 7;
          const minPow = gasFee / (prodType * rewardPow);
          const prof1 = ((1000 + gasFee) / prodType) / rewardPow+3;
          const prof5 = ((2000 + gasFee) / prodType) / rewardPow+3;
          const prof10 = ((4000 + gasFee) / prodType) / rewardPow+3;
          const prof100 = ((10000 + gasFee) / prodType) / rewardPow+3;
          
          document.getElementById("Dun4_CMJ").innerHTML = setLocal(gasFee,2); // Amount of TAO in Gas Fee
          document.getElementById("Dun4_JBC").innerHTML = setLocal((gasFee * Jtao_inUSDT),4); // Gass Fee in USDT
          
          document.getElementById("Min_Dun4").innerHTML = setLocal(minPow*1.15,0);
          document.getElementById("Cost_CMJ_Dun4").innerHTML = Math.abs(setLocal(gasFee,3));
          document.getElementById("Reward_JTAO_Dun4").innerHTML = setLocal(rwJBCPow,2);
          document.getElementById("Prof1_Dun4").innerHTML = setLocal(prof1,0);
          document.getElementById("Prof2_Dun4").innerHTML = setLocal(prof5,0);
          document.getElementById("Prof3_Dun4").innerHTML = setLocal(prof10,0);
          document.getElementById("Prof4_Dun4").innerHTML = setLocal(prof100,0);
          }}
    }
    async function loadKycData() {
        showNotification("Loading KYC Data");
        
        const tbody = document.getElementById('kycList').getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';
      
        const regisCount = await Ambassador_V03.methods.registCount().call();
      
        for (let i = 0; i < regisCount; i++) {
          const data = await Ambassador_V03.methods.referalData(i).call();
      
          const row = tbody.insertRow();
          const cellNumber = row.insertCell(0);
          const cellAddress = row.insertCell(1);
      
          cellNumber.innerHTML = i + 1;
          cellAddress.innerHTML = data[0];
        }
      }
      
      loadKycData();


    checkConnection();
    start().catch(console.error);

}
async function price_bkc(){

    web3_bkc = new Web3("https://rpc.bitkubchain.io/");
    
    let [thbToUsd, taoToUsd,kubToUsd,usdToWeth] = await setFiatAndTaoPrice(); 

    function setContract(web3_bkc,ABI, address) {
        return new web3_bkc.eth.Contract(ABI, address);
    }
    // Declare ERC 20 
    const KKUB = setContract(web3_bkc,price_contractABI, '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5');
    const KUSDT = setContract(web3_bkc,price_contractABI, '0x7d984C24d2499D840eB3b7016077164e15E5faA6');
    const CMM = setContract(web3_bkc,price_contractABI, '0x9B005000A10Ac871947D99001345b01C1cEf2790');
    const CMOS = setContract(web3_bkc,price_contractABI, '0x8b062b96Bb689833D7870a0133650FA22302496d');
    const JBC = setContract(web3_bkc,price_contractABI, '0x4D51Bb6a38EF573a38BE56566562Fb30464A40F9');

        // LP Address
    const KKUB_KUSDT = setContract(web3_bkc,price_contractABI, '0x286B67516b979a8271805660D3Ac0c626F2D38e6');
    const KKUB_CMM = setContract(web3_bkc,price_contractABI, '0x5Cced24E580586841f326d5088D288e6Ddd201dA');
    const JBC_CMOS = setContract(web3_bkc,price_contractABI, '0x88f343d92184D2aAF9BDF134dfdf0BF1f6cccc7D');
    const CMM_JBC = setContract(web3_bkc,price_contractABI, '0xA4CEB16287A1645e3EC48c16Efc5126e23639917');

    erc20Data = [
        { Name: "KKUB-CMM",Contract: KKUB_CMM, main: KKUB, mainN: "KKUB", pair: CMM, pairN: "CMM", mainUSD: kubToUsd , location: "https://commudao.xyz/gameswap"},
        { Name: "JBC-CMOS", Contract: JBC_CMOS, main: JBC, mainN: "JBC", pair: CMOS, pairN: "CMOS", mainUSD: kubToUsd , location: "https://commudao.xyz/mall"},
        { Name: "CMM-JBC", Contract: CMM_JBC, main: CMM, mainN: "CMM", pair: JBC, pairN: "JBC", mainUSD: kubToUsd , location: "https://commudao.xyz/mall"},

    ]


    const priceDataBKC = [];

    async function getTokenData(name,lpAddress, mainToken,mainN, pairToken,pairN) {
        let mainTokenBalance, pairTokenBalance;
    
        if (mainToken !== null && mainToken !== '') {
            if (typeof mainToken.methods !== 'undefined') {
                mainTokenBalance = await mainToken.methods.balanceOf(lpAddress).call();
            } else {
                mainTokenBalance = await web3_bkc.eth.getBalance(lpAddress);
            }
        } else {
            mainTokenBalance = await web3_bkc.eth.getBalance(lpAddress);
        }
    
        if (pairToken !== null && pairToken !== '') {
            if (typeof pairToken.methods !== 'undefined') {
                pairTokenBalance = await pairToken.methods.balanceOf(lpAddress).call();
            } else {
                pairTokenBalance = await web3_bkc.eth.getBalance(lpAddress);
            }
        } else {
            pairTokenBalance = await web3_bkc.eth.getBalance(lpAddress);
        }
    
        mainTokenBalance = parseFloat(web3_bkc.utils.fromWei(mainTokenBalance, 'ether'));

        if(pairN != "JASP"){
            pairTokenBalance = parseFloat(web3_bkc.utils.fromWei(pairTokenBalance, 'ether')); 
        }else
            pairTokenBalance = parseFloat(web3_bkc.utils.fromWei(pairTokenBalance, 'gwei')); 
    
        const swap1 = mainTokenBalance / pairTokenBalance;
        const swap2 = pairTokenBalance / mainTokenBalance;

        text1 = `${mainN} / ${pairN}`;
        text2 = `${pairN} / ${mainN}`;
    
        priceDataBKC.push({
            name,
            lpAddress,
            mainTokenBalance,
            mainN,
            pairTokenBalance,
            pairN,
            swap1,
            text1, // Symbolize swap1
            swap2,
            text2, // Symbolize swap2
        });
        
    
        return { mainTokenBalance, pairTokenBalance, swap1, swap2 };
    }
    
    
    function setPrice(id,value){
        if(value < 0.0000000000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 14 });
        }else if(value < 0.00000000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 12 });
        }else if(value < 0.000000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 10 });
        }else if(value < 0.00000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 9 });
        }else if(value < 0.000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 7 });
        }else if(value < 0.0099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 5 });
        }else if(value < 0.99){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 3 });
        }else 
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 2 });

    }

    async function start() {
        for (const pool of erc20Data) {
            if (pool.Contract) {
                await getTokenData(pool.Name,pool.Contract.options.address, pool.main,pool.mainN, pool.pair,pool.pairN);
            } else {
                await getTokenData(pool.Name,pool.main, null, null);
            }
        }
        console.table(priceDataBKC);

        setPrice("kkub-priceUsd",kubToUsd);
        setPrice("kkub-priceTHB",kubToUsd*thbToUsd);
        setPrice("cmm-priceKkub",priceDataBKC[0].swap1);
        setPrice("cmm-priceUsd",priceDataBKC[0].swap1 * kubToUsd);
        setPrice("cmm-priceTHB",priceDataBKC[0].swap1 * kubToUsd * thbToUsd);

        let cmosKKUB = priceDataBKC[1].swap1 * priceDataBKC[2].swap1 * priceDataBKC[0].swap1;
        setPrice("cmos-priceKkub",cmosKKUB);
        setPrice("cmos-priceUsd",cmosKKUB * kubToUsd);
        setPrice("cmos-priceTHB",cmosKKUB * kubToUsd * thbToUsd);

    }

    
    start().catch(console.error);

}
async function price_op(){

    web3_OP = new Web3("https://optimism.llamarpc.com");
    
    let [thbToUsd, taoToUsd,kubToUsd,usdToWeth] = await setFiatAndTaoPrice(); 

    function setContract( web3_OP,ABI, address) {
        return new  web3_OP.eth.Contract(ABI, address);
    }
    // Declare ERC 20 
    const WETH = setContract( web3_OP,price_contractABI, '0x4200000000000000000000000000000000000006');
    const CMD = setContract( web3_OP,price_contractABI, '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142');


        // LP Address
    const WETH_CMD = setContract( web3_OP,price_contractABI, '0xa41f70b283b8f097112ca3bb63cb2718ee662e49');

    erc20Data = [
        { Name: "WETH-CMD",Contract: WETH_CMD, main: WETH, mainN: "WETH", pair: CMD, pairN: "CMD", mainUSD: usdToWeth , location: "https://commudao.xyz/gameswap"},
    ]


    const priceDataOP = [];

    async function getTokenData(name,lpAddress, mainToken,mainN, pairToken,pairN) {
        let mainTokenBalance, pairTokenBalance;
    
        if (mainToken !== null && mainToken !== '') {
            if (typeof mainToken.methods !== 'undefined') {
                mainTokenBalance = await mainToken.methods.balanceOf(lpAddress).call();
            } else {
                mainTokenBalance = await  web3_OP.eth.getBalance(lpAddress);
            }
        } else {
            mainTokenBalance = await  web3_OP.eth.getBalance(lpAddress);
        }
    
        if (pairToken !== null && pairToken !== '') {
            if (typeof pairToken.methods !== 'undefined') {
                pairTokenBalance = await pairToken.methods.balanceOf(lpAddress).call();
            } else {
                pairTokenBalance = await  web3_OP.eth.getBalance(lpAddress);
            }
        } else {
            pairTokenBalance = await  web3_OP.eth.getBalance(lpAddress);
        }
    
        mainTokenBalance = parseFloat( web3_OP.utils.fromWei(mainTokenBalance, 'ether'));

        if(pairN != "JASP"){
            pairTokenBalance = parseFloat( web3_OP.utils.fromWei(pairTokenBalance, 'ether')); 
        }else
            pairTokenBalance = parseFloat(web3_OP.utils.fromWei(pairTokenBalance, 'gwei')); 
    
        const swap1 = mainTokenBalance / pairTokenBalance;
        const swap2 = pairTokenBalance / mainTokenBalance;

        text1 = `${mainN} / ${pairN}`;
        text2 = `${pairN} / ${mainN}`;
    
        priceDataOP.push({
            name,
            lpAddress,
            mainTokenBalance,
            mainN,
            pairTokenBalance,
            pairN,
            swap1,
            text1, // Symbolize swap1
            swap2,
            text2, // Symbolize swap2
        });
        
    
        return { mainTokenBalance, pairTokenBalance, swap1, swap2 };
    }
    
    
    function setPrice(id,value){
        value = parseFloat(value)
        if(value < 0.0000000000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 14 });
        }else if(value < 0.00000000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 12 });
        }else if(value < 0.000000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 10 });
        }else if(value < 0.00000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 9 });
        }else if(value < 0.000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 7 });
        }else if(value < 0.0099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 5 });
        }else if(value < 0.099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 4 });
        }else if(value < 0.99){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 3 });
        }else 
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 2 });

    }

    async function start() {
        for (const pool of erc20Data) {
            if (pool.Contract) {
                await getTokenData(pool.Name,pool.Contract.options.address, pool.main,pool.mainN, pool.pair,pool.pairN);
            } else {
                await getTokenData(pool.Name,pool.main, null, null);
            }
        }
        console.table(priceDataOP);

        setPrice("weth-priceUsd",usdToWeth);
        setPrice("weth-priceTHB",usdToWeth*thbToUsd);
        setPrice("cmd-priceWeth",priceDataOP[0].swap1);
        setPrice("cmd-priceUsd",priceDataOP[0].swap1*usdToWeth);
        setPrice("cmd-priceTHB",priceDataOP[0].swap1*usdToWeth*thbToUsd);
        setPrice("cmd-priceWethx80",priceDataOP[0].swap1 *80);
        setPrice("cmd-priceUsdx80",priceDataOP[0].swap1*usdToWeth *80);
        setPrice("cmd-priceTHBx80",priceDataOP[0].swap1*usdToWeth*thbToUsd *80);
        setPrice("bbq_cmd-priceWeth",priceDataOP[0].swap1);
        setPrice("bbq_cmd-priceUsd",priceDataOP[0].swap1*usdToWeth);
        setPrice("bbq_cmd-priceTHB",priceDataOP[0].swap1*usdToWeth*thbToUsd);


    }

    
    start().catch(console.error);
}

async function main() {
    price_bkc();
    price_jbc();
    price_op();
    showNotification("Updated Price");
}
  
main();
