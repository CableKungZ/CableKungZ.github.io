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