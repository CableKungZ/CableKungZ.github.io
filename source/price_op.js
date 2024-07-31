async function price_op(){

    web3_OP = new Web3("https://optimism.llamarpc.com");
    
    let [thbToUsd, taoToUsd,kubToUsd,usdToWeth] = await setFiatAndTaoPrice(); 

    function setContract( web3_OP,ABI, address) {
        return new  web3_OP.eth.Contract(ABI, address);
    }
    // Declare ERC 20 
    const WETH = setContract( web3_OP,price_contractABI, '0x4200000000000000000000000000000000000006');
    const CMD = setContract( web3_OP,price_contractABI, '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142');
    const CMM = setContract( web3_OP,price_contractABI, '0xd7ee783dfe4ba0ee3979c392f82e0a93d06fc27e');

        // LP Address
    const WETH_CMD = setContract( web3_OP,price_contractABI, '0xa41f70b283b8f097112ca3bb63cb2718ee662e49');
    const CMD_CMM = setContract( web3_OP,price_contractABI, '0xa4df424cd74db4395215ee1258cf2705f04dda36');

    erc20Data = [
        { Name: "WETH-CMD",Contract: WETH_CMD, main: WETH, mainN: "WETH", pair: CMD, pairN: "CMD", mainUSD: usdToWeth , location: "https://commudao.xyz/gameswap"},
        { Name: "CMD-CMM",Contract: CMD_CMM, main: CMD, mainN: "CMD", pair: CMM, pairN: "CMM", mainUSD: usdToWeth , location: "https://commudao.xyz/gameswap"},
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

        let cmd_to_usd = priceDataOP[0].swap1*usdToWeth;
        let cmd_to_thb = priceDataOP[0].swap1*usdToWeth*thbToUsd;

        setPrice("weth-priceUsd",usdToWeth);
        setPrice("weth-priceTHB",usdToWeth*thbToUsd);
        
        setPrice("cmd-priceWeth",priceDataOP[0].swap1);
        setPrice("cmd-priceUsd",cmd_to_usd);
        setPrice("cmd-priceTHB",cmd_to_thb);

        setPrice("cmd-priceWethx80",priceDataOP[0].swap1 *80);
        setPrice("cmd-priceUsdx80",cmd_to_usd *80);
        setPrice("cmd-priceTHBx80",cmd_to_thb *80);

        setPrice("bbq_cmd-priceWeth",priceDataOP[0].swap1);
        setPrice("bbq_cmd-priceUsd",cmd_to_usd);
        setPrice("bbq_cmd-priceTHB",cmd_to_thb);

        setPrice("op-cmmToken-cmd",priceDataOP[1].swap1);
        setPrice("op-cmmToken-usd",priceDataOP[1].swap1 * cmd_to_usd);
        setPrice("op-cmmToken-thb",priceDataOP[1].swap1 * cmd_to_thb);


    }

    
    start().catch(console.error);
}