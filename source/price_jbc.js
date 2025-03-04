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
    const PLUTO = setContract(web3_jbc,price_contractABI,'0x70A74EC50BccEaE43Dd16f48492552A8B25403ea');
    const FBTC = setContract(web3_jbc,price_contractABI,'0x8656268C82cffda9062387F8F117166F01e8Ef2E');
    const X4 = setContract(web3_jbc,price_contractABI,'0x0DF9D160489440D630a247fBC830DA74779928b1');
    const INF = setContract(web3_jbc,price_contractABI,'0xCCbb477D6c28892d6311ebb729b4c242C92f70FD');
    const BB = setContract(web3_jbc,price_contractABI,'0x8fcC6e3a23a0255057bfD9A97799b3a995Bf3D24');

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
    const CMJ_PLUTO = setContract(web3_jbc,price_contractABI, '0xd3d493ac2c0dD08C814FbbFB5f8B4983a8a0921C');
    const CMJ_FBTC = setContract(web3_jbc,price_contractABI, '0x4EF48881EFf572bBD636bcE736877881B9Ea17D5');
    const CMJ_X4 = setContract(web3_jbc,price_contractABI, '0xA7e55e89d6B0E81cCDB034a04Eb65A7aF16b697C');
    const CMJ_INF = setContract(web3_jbc,price_contractABI, '0x5E9C3A7E74a5865EC8eD3eaF6B1a4220D6E9A96b');
    const CMJ_BB = setContract(web3_jbc,price_contractABI, '0x8cf701fCBe5DC3043D96e3fA7A398d3D08769DAB');

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

        { Name: "CMJ-PLUTO", Contract: CMJ_PLUTO, main: CMJ, mainN: "CMJ", pair: PLUTO, pairN: "PLUTO", mainUSD: cmjToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "CMJ-F.BTC", Contract: CMJ_FBTC, main: CMJ, mainN: "CMJ", pair: FBTC, pairN: "F.BTC", mainUSD: cmjToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "CMJ-X4", Contract: CMJ_X4, main: CMJ, mainN: "CMJ", pair: X4, pairN: "X4", mainUSD: cmjToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "CMJ-INF", Contract: CMJ_INF, main: CMJ, mainN: "CMJ", pair: INF, pairN: "INF", mainUSD: cmjToUSDT , location: "https://commudao.xyz/mall"},
        { Name: "CMJ-BB", Contract: CMJ_BB, main: CMJ, mainN: "CMJ", pair: BB, pairN: "BB", mainUSD: cmjToUSDT , location: "https://bunnybuddy.vercel.app/swap"},

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
        
        const pairGwei = ["JASP", "PLUTO"];
        const pairWei = ["F.BTC"];
        
        if (pairGwei.includes(pairN)) {
            pairTokenBalance = parseFloat(web3_jbc.utils.fromWei(pairTokenBalance, 'gwei'));
        } else if (!pairWei.includes(pairN)) {
            pairTokenBalance = parseFloat(web3_jbc.utils.fromWei(pairTokenBalance, 'ether'));
        } else {
            pairTokenBalance = pairTokenBalance; 
        }
        
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
            // CS
            let csPrice = 2/(usdToCmj*1.012)
        setPrice("csPriceCMJ",csPrice);
        document.getElementById("csForCU").innerHTML = setLocal(csPrice/100,4);
        document.getElementById("csForJasp").innerHTML = setLocal(csPrice/100,4);

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
            // BB
        setPrice("B-cmjToBB",priceData[29].swap1 * 1.06);
        setPrice("B-usdToBB",priceData[29].swap1 * usdToCmj * 1.06);
        setPrice("B-thbToBB",priceData[29].swap1 * thbToCmj * 1.06);
        setPrice("S-cmjToBB",priceData[29].swap1 * 0.94);
        setPrice("S-usdToBB",priceData[29].swap1 * usdToCmj * 0.94);
        setPrice("S-thbToBB",priceData[29].swap1 * thbToCmj * 0.94);
        
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

        setPrice("B-Pluto",priceData[25].swap1 * 1.05);
        setPrice("S-Pluto",priceData[25].swap1 * 0.95);

        setPrice("B-FBTC",priceData[26].swap1 * 1.05);
        setPrice("S-FBTC",priceData[26].swap1 * 0.95);

        setPrice("B-X4",priceData[27].swap1 * 1.05);
        setPrice("S-X4",priceData[27].swap1 * 0.95);

        setPrice("B-INF",priceData[28].swap1 * 1.05);
        setPrice("S-INF",priceData[28].swap1 * 0.95);


        memeticGas = parseFloat((priceData[3].swap1*1.05*10000000)*(jbcToCmj*1.012)); // GAS in WJBC
        setPrice("memetic-gasfee",memeticGas);
        memeticGas2 = (priceData[3].swap1*1.08*10000000); // GAS in CMJ
        setPrice("memetic-gasfee2",memeticGas2);
        minimumPow = memeticGas2/(priceData[10].swap1  * 1.05) // gasFEE in CMJ devid with Product in CMJ

        mul = 1.03
        Minimum_NoHouse = ((memeticGas2/(priceData[8].swap1 * 0.95))/0.06048 )* mul;
        Minimum_C10House = ((memeticGas2/(priceData[8].swap1 * 0.95))/0.6048) * mul;
        Minimum_B10House = ((memeticGas2/(priceData[8].swap1 * 0.95))/3.024) * mul;
        Minimum_A10House = ((memeticGas2/(priceData[8].swap1 * 0.95))/6.048) * mul;
        setPrice("Minimum_NoHouse",parseInt(Minimum_NoHouse));
        setPrice("Minimum_C10House",parseInt(Minimum_C10House));
        setPrice("Minimum_B10House",parseInt(Minimum_B10House));
        setPrice("Minimum_A10House",parseInt(Minimum_A10House));

        
        setLabFactory((priceData[24].swap1/jbcToCmj),priceData[28].swap1,priceData[27].swap1,priceData[26].swap1,priceData[25].swap1,priceData[24].swap1,jTaoToCmj,priceData[13].swap1,priceData[14].swap1,priceData[15].swap1/jbcToCmj,priceData[12].swap1,priceData[21].swap1,priceData[22].swap1,priceData[3].swap1,priceData[6].swap1,priceData[2].swap1,priceData[4].swap1,priceData[23].swap1,priceData[8].swap1,priceData[9].swap1,priceData[7].swap1,priceData[11].swap1,0,cmjToJbc,priceData[10].swap1,priceData[18].swap1 * jTaoToCmj * 1.05,priceData[16].swap1/jbcToCmj * 1.05,jTaoToCmj,priceData[17].swap1 * 1.05);

        function setLocal(number,maximumFractionDigits){
            return number.toLocaleString(undefined, { maximumFractionDigits : maximumFractionDigits })
          }
          
          async function setLabFactory(DoiJib_Price,INF_Price,X4_Price,FBTC_Price,Pluto_Price,DoiJib_to_WJBC,JTAOPrice,Bbq_Price,Pza_Price,Swar_Price,Wood_Price,Tuna_Price,Mice_Price,Cu_Price,Jasp_Price,Os_Price,Jdao_Price,Mt_Price,Gold_Price,Silver_Price,Ctuna_Price,Sx31_Price,stOPT_Price,Jbc_Price,Plat_Price,EE_Price,ANGB_in_CMJ,JTAO_to_CMJ,JTAO_to_II){
            showNotification("Setting Labs")
            showNotification("Dungeon Calculator is Ready")
            const starPrice = ((ANGB_in_CMJ*40*1.05));
          
          // Craft BBQ
                    math1 = Wood_Price*100;
                    math2 = Jbc_Price*0.01;
                    prod = Bbq_Price*40*0.95;
                    pnl = prod-(math1+math2);
            document.getElementById("labD2").innerHTML = setLocal(math1,6);
            document.getElementById("labG2").innerHTML = setLocal(math2,6);
            document.getElementById("BbqProd").innerHTML = setLocal(prod,6);
            document.getElementById("labM2").innerHTML = setLocal(pnl,6);

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
            // Craft Pluto Factory
                    math1 = Jasp_Price*100*1.05;
                    math2 = 5;
                    prod = Pluto_Price*5*0.95;
                    pnl = prod-(math1+math2);
            document.getElementById("PlutoFactory_COST1").innerHTML = setLocal(math1,6);
            document.getElementById("PlutoFactory_Product").innerHTML = setLocal(prod,6);
            document.getElementById("PlutoFactory_PNL").innerHTML = setLocal(pnl,6);

            // Craft Doi Star ( Partner )
            math1 = starPrice;
            math2 = 100000*DoiJib_Price;
            prod = 0;
            pnl = prod-(math1+math2);
            const Doistar_Price = Math.abs(pnl);
    document.getElementById("DoiStarFactory_COST1").innerHTML = setLocal(math1,6);
    document.getElementById("DoiStarFactory_COST2").innerHTML = setLocal(math2,6);
    document.getElementById("DoiStarFactory_Product").innerHTML = setLocal(prod,6);
    document.getElementById("DoiStarFactory_PNL").innerHTML = setLocal(pnl,6);


            // Craft FBTC Factory
            math1 = Pluto_Price*20*1.05;
            math2 = Doistar_Price*10*1.05;
            prod = FBTC_Price*0.95;
            pnl = prod-(math1+math2);
    document.getElementById("FBTCFactory_COST1").innerHTML = setLocal(math1,6);
    document.getElementById("FBTCFactory_COST2").innerHTML = setLocal(math2,6);
    document.getElementById("FBTCFactory_Product").innerHTML = setLocal(prod,6);
    document.getElementById("FBTCFactory_PNL").innerHTML = setLocal(pnl,6);

            // Craft FBTC Factory
            math1 = FBTC_Price*10*1.05;
            math2 = Plat_Price*1000*1.05;
            prod = X4_Price*0.95;
            pnl = prod-(math1+math2);
    document.getElementById("X4Factory_COST1").innerHTML = setLocal(math1,6);
    document.getElementById("X4Factory_COST2").innerHTML = setLocal(math2,6);
    document.getElementById("X4Factory_Product").innerHTML = setLocal(prod,6);
    document.getElementById("X4Factory_PNL").innerHTML = setLocal(pnl,6);

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
            // DoiJib Field Calculation
                prod = 1000000 * DoiJib_to_WJBC;
                nftPrice = 500; // WJBC
                pnl = prod-nftPrice;
                document.getElementById("doiJIB-PNL").innerHTML = setLocal(pnl,6);
                document.getElementById("doiJIB-Prod").innerHTML = setLocal(prod,6);
            // bbq-craftBBQ-PNL 
                prod = 50 * (Bbq_Price*0.95); // BBQ CRAFTED AMOUNT x BBQ PRICE
                pnl = prod - 0.000125; // 0.00125 CMJ from ( 0.01 CMD / 80 CMD ) RATE 1 CMJ -> 80 CMD
                document.getElementById("bbq-craftBBQ-PNL").innerHTML = setLocal(pnl,8);
                document.getElementById("bbq-craftBBQ-PNL2").innerHTML = setLocal(pnl*1440,8);
                document.getElementById("bbq-craftBBQ-PNL-percent").innerHTML = setLocal((pnl/0.000125)*100,2); // Prod - Cost / Cost *100



            // Dungeon Settings
                    CuGasDay = (Bbq_Price*5000)*24;
                    JaspGasDay = (Pza_Price*5000);
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
                gasFee = gasType*5000;
                minPow = gasFee/(prodType*rewardPow);
                prof1 = ((1+gasFee)/prodType)/rewardPow;
                prof5 = ((5+gasFee)/prodType)/rewardPow;
            document.getElementById("labU4").innerHTML = setLocal(minPow*1.1,0);
            document.getElementById("lab_R5").innerHTML = setLocal(gasFee,3);
            document.getElementById("labV4").innerHTML = setLocal(rwCMJPow,6);
            document.getElementById("labEV4").innerHTML = setLocal(rwJBCPow,6);
            document.getElementById("labW4").innerHTML = setLocal(prof1,0);
            document.getElementById("labX4").innerHTML = setLocal(prof5,0);
            let csCost = parseFloat(document.getElementById("csForJasp").textContent);
            document.getElementById("csMinPowerForJasp").innerHTML = setLocal(csCost/(prodType*rewardPow*0.94),0);


            // Setting Copper
                gasType = Bbq_Price*1;
                prodType = Cu_Price*1;
                rewardPow = 0.36;
                rwCMJPow = rewardPow*prodType;
                rwJBCPow = rwCMJPow*Jbc_Price;
                gasFee = gasType*5000;
                minPow = gasFee/(prodType*rewardPow);
                prof1 = ((1+gasFee*24)/prodType)/rewardPow/24+1;
                prof5 = ((5+gasFee*24)/prodType)/rewardPow/24+1;
            document.getElementById("labU2").innerHTML = setLocal(minPow*1.1,0);
            document.getElementById("labR2").innerHTML = setLocal(gasFee,3);
            document.getElementById("labV2").innerHTML = setLocal(rwCMJPow,6);
            document.getElementById("labAB2").innerHTML = setLocal(rwJBCPow,6);
            document.getElementById("labW2").innerHTML = setLocal(prof1,0);
            document.getElementById("labX2").innerHTML = setLocal(prof5,0);
            csCost = parseFloat(document.getElementById("csForCU").textContent);
            document.getElementById("csMinPowerForCu").innerHTML = setLocal(csCost/(prodType*rewardPow*0.94),0);

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

          
          document.getElementById("labU6").innerHTML = setLocal(minPow*1.1,0);
          document.getElementById("labR6").innerHTML = setLocal(gasFee,3);
          document.getElementById("labV6").innerHTML = setLocal(rwCMJPow,6);
          document.getElementById("labAB6").innerHTML = setLocal(rwJBCPow,6);
          document.getElementById("labW6").innerHTML = setLocal(prof1,0);
          document.getElementById("labX6").innerHTML = setLocal(prof5,0);

          }
          
          // Setting Cryptic Cogs Lab_IIFactory_PNL
          {
          const II_Price = parseFloat(document.getElementById("B-taoToII").textContent) ; // II in JTAO
          const EE_Price = parseFloat(document.getElementById("S-taoToEE").textContent) ; // II in JTAO
          const Jtao_inUSDT = parseFloat(document.getElementById("usdToTao").textContent) ; //
          const CMJ_inUSDT = parseFloat(document.getElementById("B-usdToCmj").textContent) ; // 
          const gasType = II_Price;
          const prodType = EE_Price*0.95;
          const rewardPow = 0.0767232;
          const reJtaoPow = rewardPow / JTAOPrice;
          const gasFee = gasType * parseFloat(document.getElementById('gasTaoDum').value);
          const minPow = gasFee / (prodType * rewardPow);


            // Fomular  ((II GAS PRICE) / EE_PRICE) / MINING RATE = Minimum Power
          const nopfp = ((35 * II_Price) / EE_Price) / rewardPow;
          const pfp_r1 = ((7 * II_Price) / EE_Price) / rewardPow;
          const pfp_r2 = ((4 * II_Price) /  EE_Price) / rewardPow;
          const pfp_r3 = ((1 * II_Price) / EE_Price) / rewardPow;

          document.getElementById("Dun4_CMJ").innerHTML = setLocal(gasFee,2); // Amount of TAO in Gas Fee
          document.getElementById("Dun4_JBC").innerHTML = setLocal((gasFee * Jtao_inUSDT),4); // Gass Fee in USDT
          
          document.getElementById("Reward_JTAO_Dun4").innerHTML = setLocal(rewardPow*prodType,4);

          document.getElementById("minpow_taodum_nopfp").innerHTML = setLocal(nopfp,0);
          document.getElementById("minpow_taodum_rank1").innerHTML = setLocal(pfp_r1,0);
          document.getElementById("minpow_taodum_rank2").innerHTML = setLocal(pfp_r2,0);
          document.getElementById("minpow_taodum_rank3").innerHTML = setLocal(pfp_r3,0);

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
      calculateProfit();
      loadKycData();


    checkConnection();
    start().catch(console.error);

}