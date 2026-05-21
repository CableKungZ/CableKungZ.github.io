async function price_bbq(){

    web3_BBQ = new Web3("https://bbqchain-rpc.commudao.xyz");
    
    let [thbToUsd, taoToUsd,kubToUsd,usdToWeth] = await setFiatAndTaoPrice(); 

    function setContract( web3_BBQ,ABI, address) {
        return new  web3_BBQ.eth.Contract(ABI, address);
    }
    // Declare ERC 20 
    const CMM = setContract( web3_BBQ,price_contractABI, '0x45ed41ED4E0F48317f787Dc268779260b1Ca81f1');
    const GEM = setContract( web3_BBQ,price_contractABI, '0x222B20bCBBa261DfaaEEe6395f672F15c4d7e88F');

        // LP Address
    const GEM_CMM = setContract( web3_BBQ,price_contractABI, '0xcd73B2268109c9984E9b62AAEEC7Fc65a8e4A277');

    erc20Data = [
        { Name: "GEM-CMM",Contract: GEM_CMM, main: CMM, mainN: "CMM", pair: GEM, pairN: "GEM", mainUSD: usdToWeth , location: "https://commudao.xyz/mall/bbqchain"},
    ]


    const priceDataBBQ = [];

    async function getTokenData(name,lpAddress, mainToken,mainN, pairToken,pairN) {
        let mainTokenBalance, pairTokenBalance;
    
        if (mainToken !== null && mainToken !== '') {
            if (typeof mainToken.methods !== 'undefined') {
                mainTokenBalance = await mainToken.methods.balanceOf(lpAddress).call();
            } else {
                mainTokenBalance = await  web3_BBQ.eth.getBalance(lpAddress);
            }
        } else {
            mainTokenBalance = await  web3_BBQ.eth.getBalance(lpAddress);
        }
    
        if (pairToken !== null && pairToken !== '') {
            if (typeof pairToken.methods !== 'undefined') {
                pairTokenBalance = await pairToken.methods.balanceOf(lpAddress).call();
            } else {
                pairTokenBalance = await  web3_BBQ.eth.getBalance(lpAddress);
            }
        } else {
            pairTokenBalance = await  web3_BBQ.eth.getBalance(lpAddress);
        }
    
        mainTokenBalance = parseFloat( web3_BBQ.utils.fromWei(mainTokenBalance, 'ether'));

        if(pairN != "JASP"){
            pairTokenBalance = parseFloat( web3_BBQ.utils.fromWei(pairTokenBalance, 'ether')); 
        }else
            pairTokenBalance = parseFloat(web3_BBQ.utils.fromWei(pairTokenBalance, 'gwei')); 
    
        const swap1 = mainTokenBalance / pairTokenBalance;
        const swap2 = pairTokenBalance / mainTokenBalance;

        text1 = `${mainN} / ${pairN}`;
        text2 = `${pairN} / ${mainN}`;
    
        priceDataBBQ.push({
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
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 15 });
        }else if(value < 0.00000000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 13 });
        }else if(value < 0.000000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 11 });
        }else if(value < 0.00000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 10 });
        }else if(value < 0.000099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 8 });
        }else if(value < 0.0099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 6 });
        }else if(value < 0.099){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 5 });
        }else if(value < 0.99){
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 4 });
        }else 
            document.getElementById(id).innerHTML = (parseFloat(value)).toLocaleString(undefined, { maximumFractionDigits: 3 });

    }
    function getTextContentUntilNumber(id, callback) {
        const interval = 100; // Interval time in milliseconds
        const maxAttempts = 50; // Maximum number of attempts before giving up
        let attempts = 0;
    
        const checkContent = () => {
            const element = document.getElementById(id);
            const textContent = element ? element.textContent : '';
            const number = parseFloat(textContent);
            
            if (!isNaN(number)) {
                clearInterval(intervalId);
                callback(number);
            } else if (attempts >= maxAttempts) {
                clearInterval(intervalId);
                console.error('Failed to retrieve a valid number.');
            }
            
            attempts++;
        };
    
        const intervalId = setInterval(checkContent, interval);
    }
    
    async function getTextContentUntilNumber(id) {
        const interval = 100; // Interval time in milliseconds
        const maxAttempts = 50; // Maximum number of attempts before giving up
        let attempts = 0;
    
        return new Promise((resolve, reject) => {
            const checkContent = () => {
                const element = document.getElementById(id);
                if (element) {
                    const textContent = element.textContent;
                    const number = parseFloat(textContent);
                    
                    if (!isNaN(number)) {
                        clearInterval(intervalId);
                        resolve(number);
                    } else if (attempts >= maxAttempts) {
                        clearInterval(intervalId);
                        reject(new Error('Failed to retrieve a valid number.'));
                    }
                } else {
                    console.warn(`Element with ID "${id}" not found.`);
                }
                
                attempts++;
            };
    
            const intervalId = setInterval(checkContent, interval);
        });
    }
    
    async function start() {
        for (const pool of erc20Data) {
            if (pool.Contract) {
                await getTokenData(pool.Name, pool.Contract.options.address, pool.main, pool.mainN, pool.pair, pool.pairN);
            } else {
                await getTokenData(pool.Name, pool.main, null, null);
            }
        }
        console.table(priceDataBBQ);
    
        try {
            let cmdToCMM = 0; //await getTextContentUntilNumber('op-cmmToken-cmd');
            let cmmToUSD = 0; //await getTextContentUntilNumber('op-cmmToken-usd');
            let cmmToTHB = 0; //await getTextContentUntilNumber('op-cmmToken-thb');
            
            let gemToCMM = 0 ;// priceDataBBQ[0].swap1 * 0.95;
            setPrice("bbq_gem-priceCMM", gemToCMM);
            setPrice("bbq_gem-priceUSD", gemToCMM * cmmToUSD);
            setPrice("bbq_gem-priceTHB", gemToCMM * cmmToTHB);

            //setPrice("OP-HeroCat-ProductToCMM", 0.00864 * gemToCMM);
            calculateProfit()

        } catch (error) {
            console.error(error);
        }
    }
    
    start().catch(console.error);
}