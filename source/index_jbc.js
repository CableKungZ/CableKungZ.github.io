

      ///////////// WEB3 SCRIPT /////////////////
      var divider = 10 ** 18;
var jaspdivider = 10 ** 9;

var PROVIDER_URLS = [
  'https://rpc-l1.jibchain.net',
  'http://49.13.16.167:8545',
  'https://rpc-l1.jibchain.net',
  'https://rpc-l1.jbc.aomwara.in.th',
  'https://rpc-l1.jbc.xpool.pw',
  'https://jib-rpc.inan.in.th'
];

var web3_Jbc;
var currentProviderIndex = 0;

async function checkConnection() {
    while (currentProviderIndex < PROVIDER_URLS.length) {
        const providerUrl = PROVIDER_URLS[currentProviderIndex];
        web3_Jbc = new Web3(providerUrl);

        try {
            // Try getting the latest block number
            const blockNumber = await web3_Jbc.eth.getBlockNumber();
            console.log(`Connected to provider: ${providerUrl}. Latest block number: ${blockNumber}`);
            return; // Exit the loop if connection is successful
        } catch (error) {
            console.error(`RPC ERROR with provider: ${providerUrl}`, error);
            alert(`RPC ERROR with provider: ${providerUrl}`);
            currentProviderIndex++;
        }
    }

    console.error("All provider URLs failed.");
    alert("All provider URLs failed.");
}

checkConnection();
let contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const ERC721ABI = [{"constant": true,"inputs": [{"name": "_owner", "type": "address"}],"name": "balanceOf","outputs": [{"name": "", "type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}];
const houseABI = [{"inputs":[{"internalType":"address","name":"_cmcitySlot1","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"ItemStaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"ItemUnstaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cmcitySlot1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"migrateNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"migrateReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"nftStake","outputs":[{"internalType":"address","name":"tokenOwnerOf","type":"address"},{"internalType":"uint256","name":"tokenStakedAt","type":"uint256"},{"internalType":"uint256","name":"power","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"address","name":"nftAddr","type":"address"},{"internalType":"uint256","name":"powerAll","type":"uint256"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"slotUsage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_house","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_house","type":"uint256"},{"internalType":"bool","name":"_unstake","type":"bool"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_multiplierNumber","type":"uint256"}],"name":"updateMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"}];
async function loadContract(contractAddress) {
    try {
        const response = await fetch(`https://exp-l1.jibchain.net/api?module=contract&action=getabi&address=${contractAddress}`);
        const data = await response.json();
        const abi = JSON.parse(data.result);
        return new web3_Jbc.eth.Contract(abi, contractAddress);
    } catch (error) {
        console.error('Error loading contract:', error);
        alert("ไม่สามารถ Loading Contract ได้กรุณา รีเฟรช หรือ ลองใหม่อีกครั้งในอีก 1 ชั่วโมง");
    }
}
// Initialize contracts
const CMJ = new web3_Jbc.eth.Contract(contractABI, '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b');
const WJBC = new web3_Jbc.eth.Contract(contractABI, '0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747');
const Jib_WJBC = new web3_Jbc.eth.Contract(contractABI, '0x99999999990FC47611b74827486218f3398A4abD');
const Meow = new web3_Jbc.eth.Contract(contractABI, '0x04052384166fC30D03929eE328805eC084776843');
const Wood = new web3_Jbc.eth.Contract(contractABI, '0xc2744Ff255518a736505cF9aC1996D9adDec69Bd');
const Tuna = new web3_Jbc.eth.Contract(contractABI, '0x09676315DC0c85F6bd5e866C5f1363A00Eec4381');
const Mice = new web3_Jbc.eth.Contract(contractABI, '0x09DE640ecd50e1c81bCB266279e3ffC2719873df');
const Cu = new web3_Jbc.eth.Contract(contractABI, '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841');
const Jasp = new web3_Jbc.eth.Contract(contractABI, '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860');
const Os = new web3_Jbc.eth.Contract(contractABI, '0xAc5299D92373E9352636559cca497d7683A47655');
const Jdao = new web3_Jbc.eth.Contract(contractABI, '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88');
const Mt = new web3_Jbc.eth.Contract(contractABI, '0x169816800f1eA9C5735937388aeb9C2A3bAca11F');
const Vabag = new web3_Jbc.eth.Contract(contractABI, '0x495d66c9Fd7c63807114d06802A48BdAA60a0426');
const Bbq = new web3_Jbc.eth.Contract(contractABI, '0x7004757e595409568Bd728736e1b0c79FDc94e1c');
const Pza = new web3_Jbc.eth.Contract(contractABI, '0x09DcdCFc6C48803681a3422997c679E773656763');
const Ctuna = new web3_Jbc.eth.Contract(contractABI, '0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0');
const Sx31 = new web3_Jbc.eth.Contract(contractABI, '0xd431d826d7a4380b9259612176f00528b88840a7');
const Sil = new web3_Jbc.eth.Contract(contractABI, '0x2a081667587c35956d34A4cC3bf92b9CA0ef2C6f');
const Gold = new web3_Jbc.eth.Contract(contractABI, '0x7d5346E33889580528e6F79f48BdEE94D8A9E144');
const Plat = new web3_Jbc.eth.Contract(contractABI, '0x3Bd00B6cd18281E3Ef13Ba348ad2783794dcb2bD');
const Swar = new web3_Jbc.eth.Contract(contractABI, '0x5e18a8B78d5395371308C54719fead810Ce2aCd2');
const Jusdt = new web3_Jbc.eth.Contract(contractABI, '0x24599b658b57f91E7643f4F154B16bcd2884f9ac');
const stOPT = new web3_Jbc.eth.Contract(contractABI, '0x435BeAF4B83A6dc57927E9dB194a3Ccf54100F7a');
const Jtao = new web3_Jbc.eth.Contract(contractABI, '0xdbCCc9F8920e7274eeC62e695084D3bCe443c3dd');
const Angb = new web3_Jbc.eth.Contract(contractABI, '0x59c1C2f5FA76DB933B97b7c54223129e2A398534');
const Taodum = new web3_Jbc.eth.Contract(ERC721ABI, '0x2036186F6d5287FcB05C56C38374AC5236d8A61d');
const EE = new web3_Jbc.eth.Contract(contractABI, '0xF663c756b6D57724C3B41c8839aB9c7Af83c9751');
const II = new web3_Jbc.eth.Contract(contractABI, '0x523AA3aB2371A6360BeC4fEea7bE1293adb32241');
const HouseStaking = new web3_Jbc.eth.Contract(houseABI, '0x2eF9d702c42BC0F8B9D7305C34B4f63526502255');
    
CMJ_inUSDT = parseFloat(document.getElementById("B-usdToCmj").textContent) ;
JTAO_inUSDT = parseFloat(document.getElementById("usdToTao").textContent) ;



        let totalOpened = 0;
        let nCount = 0;
        let rCount = 0;
        let srCount = 0;
        let ssrCount = 0;

        function openLootBox() {
            let itemType = document.getElementById("boxType").value;
            let result = generateItem(itemType);
            document.getElementById("popupText").innerHTML = "<h1>Yahoo !!! You get <b style='text-align: center; font-weight: bold;'>" + result + "</b></h1>";
            totalOpened++;
            document.getElementById("totalOpened").innerHTML = "Total LootBoxes opened: " + totalOpened;
        }

        function generateItem(itemType) {
            let rand = Math.random() * 100;
            document.getElementById("Roll").innerHTML = "<h5>Roll : <span>"+(rand*10000).toFixed(0)+"</span></h5>";

            let rarity;
            N = 46.875
            R = 28.125
            SR = 18.750
            SSR = 6.250
            if (rand < N) {
                rarity = "N";
                nCount++;
                document.getElementById("nCount").innerHTML = "N Count: " + nCount;
            } else if (rand < R+N) {
                rarity = "R";
                rCount++;
                document.getElementById("rCount").innerHTML = "R Count: " + rCount;
            } else if (rand < R+N+SR) {
                rarity = "SR";
                srCount++;
                document.getElementById("srCount").innerHTML = "SR Count: " + srCount;
            } else {
                rarity = "SSR";
                ssrCount++;
                document.getElementById("ssrCount").innerHTML = "SSR Count: " + ssrCount;
            }

            let itemName;
            switch (itemType) {
                case "1":
                    itemName = "Golden Dragon Accessory";
                    document.getElementById("TotalSupply").innerHTML = "Supply: 256"
                    document.getElementById("NSupply").innerHTML = "N Supply: 120 (46.875 %)"
                    document.getElementById("RSupply").innerHTML =  "R Supply: 72 (28.125 %)"
                    document.getElementById("SRSupply").innerHTML = "SR Supply: 48 (18.750 %)"
                    document.getElementById("SSRSupply").innerHTML = "SSR Supply: 16 (6.250 %)"
                    if (rarity == "N") {
                      document.getElementById("itempic").innerHTML = '<img src="https://docs.commudao.xyz/~gitbook/image?url=https:%2F%2F3234540731-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FKRfp86SF30KCpRo85oD7%252Fuploads%252FeMqfHUs8Ococdp6Jp4IZ%252Fdownload.png%3Falt=media%26token=41773348-77e2-4e0d-880c-8787588755c8&width=245&dpr=1&quality=100&sign=2169cde74336d6a91debbaf08df0456b2bfb6ea1e8db70d7b08b53c55f2e54ef" height="400px" weight="400px">';
                    } else if (rarity == "R") {
                      document.getElementById("itempic").innerHTML = '<img src="https://docs.commudao.xyz/~gitbook/image?url=https:%2F%2F3234540731-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FKRfp86SF30KCpRo85oD7%252Fuploads%252FhRd1SoSidxPhYhek79Ul%252Fdownload%2520%281%29.png%3Falt=media%26token=12ef85aa-ff41-44b6-b792-63dd92e5641d&width=245&dpr=1&quality=100&sign=6d4abecb02987ca2130b626357ded856e2e83d3d9417b89be18310f7e2793f1f" height="400px" weight="400px">';
                    } else if (rarity == "SR") {
                      document.getElementById("itempic").innerHTML = '<img src="https://docs.commudao.xyz/~gitbook/image?url=https:%2F%2F3234540731-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FKRfp86SF30KCpRo85oD7%252Fuploads%252FYEgIDCtx6lwVBXi5cHec%252Fdownload%2520%282%29.png%3Falt=media%26token=deb3c981-83bd-4c23-8f60-1b7c0362265f&width=245&dpr=1&quality=100&sign=dc668f3317632422b78d3832b73ad310b7aed457c07f09faa4409198e24edb05" height="400px" weight="400px">';
                    } else if (rarity == "SSR") {
                      document.getElementById("itempic").innerHTML = '<img src="https://docs.commudao.xyz/~gitbook/image?url=https:%2F%2F3234540731-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FKRfp86SF30KCpRo85oD7%252Fuploads%252FgXbWEMdvQINTMYC0JUED%252Fdownload%2520%283%29.png%3Falt=media%26token=135b6a54-f87c-4fac-9de0-844999e223df&width=245&dpr=1&quality=100&sign=83e07c6ebba717132835cb1e736e2f14f61eea711d01540b2313706ba12aaa7f" height="400px" weight="400px">';
                    }
                    
                      break;
                case "2":
                    itemName = "Golden Dragon Boots";
                    document.getElementById("TotalSupply").innerHTML = "Supply: 256"
                    document.getElementById("NSupply").innerHTML = "N Supply: 120 (46.875 %)"
                    document.getElementById("RSupply").innerHTML =  "R Supply: 72 (28.125 %)"
                    document.getElementById("SRSupply").innerHTML = "SR Supply: 48 (18.750 %)"
                    document.getElementById("SSRSupply").innerHTML = "SSR Supply: 16 (6.250 %)"
                    if (rarity == "N") {
                      document.getElementById("itempic").innerHTML = '<img src="https://docs.commudao.xyz/~gitbook/image?url=https:%2F%2F3234540731-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FKRfp86SF30KCpRo85oD7%252Fuploads%252F9bptTyI0wmE3YhD8PWgd%252Fdownload.png%3Falt=media%26token=1c36d2bc-6870-44ae-8dae-e8c25d9ac003&width=245&dpr=1&quality=100&sign=e6b1d780cdac712f8f762882a08e92d64e532158e6b49f6ef5f345632a8ed1e9" height="400px" weight="400px">';
                    } else if (rarity == "R") {
                      document.getElementById("itempic").innerHTML = '<img src="https://docs.commudao.xyz/~gitbook/image?url=https:%2F%2F3234540731-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FKRfp86SF30KCpRo85oD7%252Fuploads%252FfyjVwkc7wLYOffZqxSth%252Fdownload.png%3Falt=media%26token=5e561e09-fbd0-477c-8ece-4db224510e78&width=245&dpr=1&quality=100&sign=2b1a40042a3f964443aef7c296aa98ca0edd1aca42dbe8dce0b51a5253d2073e" height="400px" weight="400px">';
                    } else if (rarity == "SR") {
                      document.getElementById("itempic").innerHTML = '<img src="https://docs.commudao.xyz/~gitbook/image?url=https:%2F%2F3234540731-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FKRfp86SF30KCpRo85oD7%252Fuploads%252FdV2mEdrV19JFtdje6ouE%252Fdownload%2520%281%29.png%3Falt=media%26token=a3f7719a-e083-4e55-9038-21514815b1d6&width=245&dpr=1&quality=100&sign=10a995f267012f5cd3357514a99e3a16063404767d2424387c16ae2fbda523e2" height="400px" weight="400px">';
                    } else if (rarity == "SSR") {
                      document.getElementById("itempic").innerHTML = '<img src="https://docs.commudao.xyz/~gitbook/image?url=https:%2F%2F3234540731-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FKRfp86SF30KCpRo85oD7%252Fuploads%252Fnrlc2PLauJnRzdjtNdbc%252Fdownload%2520%282%29.png%3Falt=media%26token=bd959825-5426-4e51-a8cb-516c4f6f563d&width=245&dpr=1&quality=100&sign=e1c4be18a509ed3533f24948500ee799de3472063dfc79e168cb752a54145d8e" height="400px" weight="400px">';
                    }
                    break;
                case "3":
                    itemName = "Golden Dragon Armor";
                    document.getElementById("TotalSupply").innerHTML = "Supply: 256"
                    document.getElementById("NSupply").innerHTML = "N Supply: 120 (46.875 %)"
                    document.getElementById("RSupply").innerHTML =  "R Supply: 72 (28.125 %)"
                    document.getElementById("SRSupply").innerHTML = "SR Supply: 48 (18.750 %)"
                    document.getElementById("SSRSupply").innerHTML = "SSR Supply: 16 (6.250 %)"
                    if (rarity == "N") {
                      document.getElementById("itempic").innerHTML = '<img src="https://docs.commudao.xyz/~gitbook/image?url=https:%2F%2F3234540731-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FKRfp86SF30KCpRo85oD7%252Fuploads%252FxhObMJMipxFURRzFDmlo%252Fimage.png%3Falt=media%26token=dc42254d-fd84-4102-b6e2-adafda1e4824&width=245&dpr=1&quality=100&sign=b3e155df9538483cf78749f1ae5a4bf30bf924772a16d9ff2c1b17c65b052634" height="400px" weight="400px">';
                    } else if (rarity == "R") {
                      document.getElementById("itempic").innerHTML = '<img src="https://docs.commudao.xyz/~gitbook/image?url=https:%2F%2F3234540731-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FKRfp86SF30KCpRo85oD7%252Fuploads%252F6PNROZHiX9aFThreGq0C%252Fimage.png%3Falt=media%26token=3e14e8db-9b07-487a-8521-0188802e6435&width=245&dpr=1&quality=100&sign=71816bf89ffc7ab228aa43d259a20c63a00a9d1b98eb9c384b589b782ba906b1" height="400px" weight="400px">';
                    } else if (rarity == "SR") {
                      document.getElementById("itempic").innerHTML = '<img src="https://docs.commudao.xyz/~gitbook/image?url=https:%2F%2F3234540731-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FKRfp86SF30KCpRo85oD7%252Fuploads%252FQau8PuqrPUKD61ETffQm%252Fdownload.png%3Falt=media%26token=4a2b144c-ec85-420e-bc46-2cb38fa166d2&width=245&dpr=1&quality=100&sign=a4d6941d749b46f72bc16773a50d2bd011b18b3169c072ede004be37786b75a4" height="400px" weight="400px">';
                    } else if (rarity == "SSR") {
                      document.getElementById("itempic").innerHTML = '<img src="https://docs.commudao.xyz/~gitbook/image?url=https:%2F%2F3234540731-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FKRfp86SF30KCpRo85oD7%252Fuploads%252F0hX0L5x750lb8goeLTaj%252Fdownload%2520%281%29.png%3Falt=media%26token=c39df46d-0e2e-4527-a56e-5d5608af3d13&width=245&dpr=1&quality=100&sign=02bdce82c975555f3f9278e3943e624040b98c2405b132255ec02e78fb93a39e" height="400px" weight="400px">';
                    }
                    break;
                case "4":
                    itemName = "Songkran Splasher";
                    document.getElementById("TotalSupply").innerHTML = "Supply: 256"
                    document.getElementById("NSupply").innerHTML = "N Supply: 120 (46.875 %)"
                    document.getElementById("RSupply").innerHTML =  "R Supply: 72 (28.125 %)"
                    document.getElementById("SRSupply").innerHTML = "SR Supply: 48 (18.750 %)"
                    document.getElementById("SSRSupply").innerHTML = "SSR Supply: 16 (6.250 %)"
                    if (rarity == "N") {
                      document.getElementById("itempic").innerHTML = '<img src="https://docs.commudao.xyz/~gitbook/image?url=https:%2F%2F3234540731-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FKRfp86SF30KCpRo85oD7%252Fuploads%252FBy4c0zQEXSk4SqQnoC7p%252Fsk-splasher-n0.png%3Falt=media%26token=4f18f7c4-1bcb-42c5-bbb8-803ef0a98858&width=245&dpr=1&quality=100&sign=0c379d749160add76118e74281d06d3dd3ab65693f12c9d2a172cb09dc882613" height="400px" weight="400px">';
                    } else if (rarity == "R") {
                      document.getElementById("itempic").innerHTML = '<img src="https://docs.commudao.xyz/~gitbook/image?url=https:%2F%2F3234540731-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FKRfp86SF30KCpRo85oD7%252Fuploads%252FD4Q6RpphrSkoLTV0nvo2%252Fsk-splasher-r0.png%3Falt=media%26token=3370d2e7-70c2-4770-90e6-654e107a41a6&width=245&dpr=1&quality=100&sign=78c97ad671c2a17ac63af3788f9a57b1d957243b33373e2886d269aa70baf2c8" height="400px" weight="400px">';
                    } else if (rarity == "SR") {
                      document.getElementById("itempic").innerHTML = '<img src="https://docs.commudao.xyz/~gitbook/image?url=https:%2F%2F3234540731-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FKRfp86SF30KCpRo85oD7%252Fuploads%252FwHsdYb7dz14Pmsp6x1Kh%252Fsk-splasher-sr0.png%3Falt=media%26token=b022eafc-3ded-46ac-9ebf-18764ed9baee&width=245&dpr=1&quality=100&sign=43ed3eaef203ba195898adbb5f04fcc9426b148e52d40c10f7049b66dbbd1c63" height="400px" weight="400px">';
                    } else if (rarity == "SSR") {
                      document.getElementById("itempic").innerHTML = '<img src="" height="400px" weight="400px">';
                    }
                    break;
                default:
                    itemName = "Unknown Item";
                    if (rarity == "N") {
                      document.getElementById("itempic").innerHTML = '<img src="" height="400px" weight="400px">';
                    } else if (rarity == "R") {
                      document.getElementById("itempic").innerHTML = '<img src="" height="400px" weight="400px">';
                    } else if (rarity == "SR") {
                      document.getElementById("itempic").innerHTML = '<img src="" height="400px" weight="400px">';
                    } else if (rarity == "SSR") {
                      document.getElementById("itempic").innerHTML = '<img src="" height="400px" weight="400px">';
                    }
            }
            return itemName + " (" + rarity + ")";
        }


  // เลือก input ทั้งหมดที่มี id เป็น "Stakepower", "TaoN", "TaoR", "TaoSR", "TaoSSR", "TaoUR"
const inputs = document.querySelectorAll("#Stakepower, #TaoN, #TaoR, #TaoSR, #TaoSSR, #TaoUR");

// ใช้ forEach loop เพื่อเพิ่ม event listener ให้กับทุก input
inputs.forEach(input => {
    input.addEventListener("input", getGear);
});

  function getGear() {
    // Retrieve values from input fields
    const power = document.getElementById("Stakepower").value;
    const TaoN = document.getElementById("TaoN").value;
    const TaoR = document.getElementById("TaoR").value;
    const TaoSR = document.getElementById("TaoSR").value;
    const TaoSSR = document.getElementById("TaoSSR").value;
    const TaoUR = document.getElementById("TaoUR").value;

    // Calculate TokenReward based on power
    let Pow;
    let Level;
    if (power >= 5300000) {
        Pow = 250;
        level = 20;
        document.getElementById("GearNext").innerHTML = ` LEVEL MAXED `;
      } else if (power >= 5200000) {
        Pow = 195;
        level = 19;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 5,300,000 JTAO`;
      } else if (power >= 5100000) {
        Pow = 190;
        level = 18;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 5,200,000 JTAO`;
      } else if (power >= 5000000) {
        Pow = 185;
        level = 17;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 5,100,000 JTAO`;
      } else if (power >= 3300000) {
        Pow = 180;
        level = 16;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 5,000,000 JTAO`;
      } else if (power >= 3200000) {
        Pow = 165;
        level = 15;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 3,300,000 JTAO`;
      } else if (power >= 3100000) {
        Pow = 160;
        level = 14;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 3,200,000 JTAO`;
      } else if (power >= 3000000) {
        Pow = 155;
        level = 13;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 3,100,000 JTAO`;
      } else if (power >= 2300000) {
        Pow = 150;
        level = 12;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 3,000,000 JTAO`;
      } else if (power >= 2200000) {
        Pow = 135;
        level = 11;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 2,300,000 JTAO`;
      } else if (power >= 2100000) {
        Pow = 130;
        level = 10;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 2,200,000 JTAO`;
      } else if (power >= 2000000) {
        Pow = 125;
        level = 9;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 2,100,000 JTAO`;
      } else if (power >= 1500000) {
        Pow = 120;
        level = 8;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 2,000,000 JTAO`;
      } else if (power >= 1400000) {
        Pow = 115;
        level = 7;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 1,500,000 JTAO`;
      } else if (power >= 1300000) {
        Pow = 110;
        level = 6;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 1,400,000 JTAO`;
      } else if (power >= 1200000) {
        Pow = 105;
        level = 5;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 1,300,000 JTAO`;
      } else if (power >= 1000000) {
        Pow = 100;
        level = 4;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 1,200,000 JTAO`;
      } else if (power >= 900000) {
        Pow = 95;
        level = 3;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 1,000,000 JTAO`;
      } else if (power >= 800000) {
        Pow = 85;
        level = 2;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 900,000 JTAO`;
      } else {
        Pow = 15;
        level = 1;
        document.getElementById("GearNext").innerHTML = `Next Level: more than or equal 800,000 JTAO`;
    }
    
    const TokenReward = (3600 * Pow * power * (2314810000000 / 100)) / (10**18) ;

    // Calculate rewards
    const RewardHour = (TokenReward + (TaoN * (3220611.913008 / 24)) + (TaoR * (3864734.2956096 / 24)) + (TaoSR * (4830917.869512 / 24)) + (TaoSSR * (5797101.4434144 / 24)) + (TaoUR * (8051529.78252 / 24)));
    const RewardDay = ((TokenReward * 24) + (TaoN * 3220611.913008) + (TaoR * 3864734.2956096) + (TaoSR * 4830917.869512) + (TaoSSR * 5797101.4434144) + (TaoUR * 8051529.78252));
    const RewardMo = (RewardDay*30);
    


// Display rewards
  document.getElementById("GearPow").innerHTML = `<span style="font-size": 24px;><b>Stake Level:</b></span>${level}<br><span style="font-size": 24px;><b>Power:</b> : *${Pow/100}`;

  const rewardHourElement = document.getElementById("GearHour");
  rewardHourElement.innerHTML = `Hourly: <span style="font-size: 24px; color: black;">${Math.floor(RewardHour).toLocaleString()}</span><span style="font-size: 18px; color: gray;">.${(RewardHour % 1).toFixed(3).slice(2)}</span> GEAR`;

  const rewardDayElement = document.getElementById("GearDay");
  rewardDayElement.innerHTML = `Daily: <span style="font-size: 24px; color: black;">${Math.floor(RewardDay).toLocaleString()}</span><span style="font-size: 18px; color: gray;">.${(RewardDay % 1).toFixed(3).slice(2)}</span> GEAR`;

  const rewardMoElement = document.getElementById("GearMo");
  rewardMoElement.innerHTML = `Monthly: <span style="font-size: 24px; color: black;">${Math.floor(RewardMo).toLocaleString()}</span><span style="font-size: 18px; color: gray;">.${(RewardMo % 1).toFixed(3).slice(2)}</span> GEAR`;

}




const powerInputs = document.querySelectorAll("#power,#bbqPower, #input1, #input2, #input3, #input4,#input5,#input6","#bbq-herominer-input1");

powerInputs.forEach(input => {
    input.addEventListener("input", calculateProfit);
});





 function calculateProfit() {
    // ดึงค่า Power จาก input
    var isMultiple = document.getElementById("multiPowerBtn").classList.contains('active');
    var RewardOs = parseFloat(document.getElementById("RewardPerPower").textContent) ;
    var OsPowerAll = parseFloat(document.getElementById("TotalPower").textContent) ;
    var power = 0;
    var CuPower = 0;
    var JaspPower = 0;
    var AngbPower = 0;
    var EEPower = 0;
    var OSPower = 0;
    var MOPower =0;
    // BBQ CHAIN
    var heroPower = document.getElementById("bbqPower").value ;
    

    if(isMultiple){
      var CuPower = document.getElementById("power1").value ;
      var JaspPower = document.getElementById("power2").value ;
      var AngbPower = document.getElementById("power3").value ;
      var EEPower = document.getElementById("power4").value ;
      var OSPower = document.getElementById("power5").value ;
      var MOPower = document.getElementById("power6").value ;
      
    
    }else{
      var power = document.getElementById("power").value ;
      var CuPower = power;
      var JaspPower = power;  
      var AngbPower = power
      var EEPower = power;
      var OSPower = power;
      var MOPower = power;
    }
    /* console.log("isMultiple : ",isMultiple);
    console.log("CU POW : ",CuPower);
    console.log("JASP POW : ",JaspPower);
    console.log("ANGB POW : ",AngbPower);
    console.log("EE POW : ",EEPower);
    console.log("OS POW : ",OSPower); */


    const cuMine = parseFloat(document.getElementById("labR2").textContent) ; // Copper Mine Gas
    const jaspCave = parseFloat(document.getElementById("labR4").textContent) ; // Japser Cave Gas
    const daemonWorld = parseFloat(document.getElementById("labR6").textContent) ; // daemonWorld Gas

    //** MEMETIC ORBITS */
    const DoiJib_Gas = parseFloat(document.getElementById("B_doijib_1").textContent) * 7000000; //Gas DOI JIB
    const sellSilver = parseFloat(document.getElementById("S-Silver").textContent); // get SELL SIL PRICE (CMJ)
    const silver_inCMJ_toJBC = sellSilver * parseFloat(document.getElementById("S-jbcToCmj").textContent);
    const rewardPerPow = parseFloat(document.getElementById("rewardPerPow").textContent);



    const labAB2 = parseFloat(document.getElementById("labAB2").textContent) ; // Price CU per POW (JBC)
    const labAB4 = parseFloat(document.getElementById("labEV4").textContent) ; // Price JASP Per Pow (JBC)
    const cmj_to_JBC = parseFloat(document.getElementById("B-cmjToJbc").textContent) ; // Get Price of CMJ/JBC

    const EEPrice = parseFloat(document.getElementById("S-taoToEE").textContent) ; // Get Price of EE/JTAO
    const IIPrice = parseFloat(document.getElementById("S-taoToII").textContent) ; // Get Price of II/JTAO
    const TaoPriceUSDT = parseFloat(document.getElementById("usdToTao").textContent) ; // Get Price of EE/JTAO
    const gasDun5 = parseFloat(document.getElementById("Cost_CMJ_Dun4").textContent) ; // CryoticCogs Gas

    const cuPrice = parseFloat(document.getElementById("S-Cu").textContent) ;
    const jaspPrice = parseFloat(document.getElementById("S-Jasp").textContent) ;
    const angbPrice = parseFloat(document.getElementById("S-cmjToAngb").textContent) ;
    const osPrice = parseFloat(document.getElementById("S-Os").textContent) ;

    const gemPrice = 0;

    const noprice = 0;

    // คำนวณผลกำไร
    let copperMineHourly = 0;
    let copperMineDaily = 0;
    let jasperCave = 0;
    let angb = 0;
    let CrypticCog = 0;
    let Os = 0;
    
      OsDaily = RewardOs*OSPower; 
      copperMineHourly = 0.36 * CuPower;
      copperMineDaily = 0.36 * CuPower * 24;
      jasperCave = 0.0000864 * JaspPower;
      angb = ((14000000 * 86400 * 10) * 10 ** -18) * AngbPower;
      CrypticCog = (EEPower * 0.0767232);
      memeTic = (MOPower * rewardPerPow);

      bbqHeroCatProd = (heroPower * 0.00864);


    // คำนวณ PNL - GASFEE
    const copperMineGasFee = (copperMineDaily * cuPrice) - (cuMine * 24);
    const copperMiner2GasFee = (copperMineHourly * cuPrice) - (cuMine);
    const jasperCaveGasFee = (jasperCave * jaspPrice) - jaspCave;
    const daemonWorldGasFee = (angb * angbPrice) - daemonWorld;
    const CrypticCogsGasFee = (CrypticCog* EEPrice) -gasDun5; // Reward in JTAO
    const HouseStakingGasFee = (OsDaily*osPrice); // reward in CMJ
    const MemeticPNL = (memeTic*silver_inCMJ_toJBC) - DoiJib_Gas; // MEMETIC REWARD(SIL) x SILVER (in JBC) - DOIJIB GAS IN JBC

    console.log("DOIJIB GAS : ",DoiJib_Gas," WJBC");
    console.log("MEMETIC REWARD : ",memeTic," SIL");
    console.log("MEMETIC PNL : ",MemeticPNL," SIL");
    console.log("SILVER CMJ : ",sellSilver);
    console.log("SILVER WJBC : ",silver_inCMJ_toJBC);;

    const bbqHeroCatPNL = (bbqHeroCatProd*gemPrice);

    // คำนวนในมูลค่า JBC

    const copperMineGasFee_inJBC = (copperMineGasFee * cmj_to_JBC);
    const copperMiner2GasFee_inJBC = (copperMiner2GasFee * cmj_to_JBC);
    const jasperCaveGasFee_inJBC = (jasperCaveGasFee * cmj_to_JBC);
    const daemonWorldGasFee_inJBC = (daemonWorldGasFee * cmj_to_JBC);
    const CrypticCog_inJBC = (CrypticCogsGasFee * TaoPriceUSDT); // คำนวรเป็น USDT
    const HouseSTaking_inJBC = (HouseStakingGasFee * cmj_to_JBC);

      // GasFee 
    const GasFee_CrypticCogs_inJTAO = (parseFloat(document.getElementById("B-taoToII").textContent) ) * 7;

    // คำนวนในมูลค่า JTAO
      const CrypticCog_JTAO = (EEPrice*CrypticCog)-GasFee_CrypticCogs_inJTAO;


    document.getElementById("copperMineHourly").innerHTML = `    ${setLocal(copperMineHourly,2)} Cu/h`;
    document.getElementById("copperMineDaily").innerHTML = `    ${setLocal(copperMineDaily,2)} Cu/d`;
    document.getElementById("jasperCave").innerHTML = `    ${setLocal(jasperCave,8)} Jasp/d `;
    document.getElementById("DaemonWorld").innerHTML = `    ${setLocal(angb,8)} Angb/d `;
    document.getElementById("CrypticNight").innerHTML = `    ${setLocal(CrypticCog,8)} EE/d `;
    document.getElementById("HouseStaking").innerHTML = `    ${setLocal(OsDaily,8)} OS/d `;
    document.getElementById("Memetic").innerHTML = `    ${setLocal(memeTic,8)} SIL/7d `;
    document.getElementById("bbq-herominer-gems").innerHTML = `    ${setLocal(bbqHeroCatProd,8)} Gems/d`
    // Display PNL messages
    displayPNLMessages(MOPower,MemeticPNL,OSPower,HouseSTaking_inJBC,HouseStakingGasFee,CuPower,JaspPower,AngbPower,EEPower,CrypticCog_JTAO,CrypticCogsGasFee,CrypticCog_inJBC,copperMineGasFee, jasperCaveGasFee, copperMiner2GasFee, copperMineGasFee_inJBC, copperMiner2GasFee_inJBC, jasperCaveGasFee_inJBC, daemonWorldGasFee, daemonWorldGasFee_inJBC);
  }

  // Function to display PNL messages
  function displayPNLMessages(MOPower,MemeticPNL,OSPower,HouseSTaking_inJBC,HouseStakingGasFee,CuPower,JaspPower,AngbPower,EEPower,CrypticCog_JTAO,CrypticCogsGasFee,CrypticCog_inJBC,copperMineGasFee, jasperCaveGasFee, copperMiner2GasFee, copperMineGasFee_inJBC, copperMiner2GasFee_inJBC, jasperCaveGasFee_inJBC, daemonWorldGasFee, daemonWorldGasFee_inJBC) {
    const pnlCu = copperMineGasFee; // PNL for CopperMine (Cu)
    const pnlJasp = jasperCaveGasFee; // PNL for JasperCave (Jasp)
    const pnlCuh = copperMiner2GasFee;
    const pnlAngb = daemonWorldGasFee;
    const pnlCC = CrypticCogsGasFee;
    const pnlOS = HouseStakingGasFee;
    const pnlMO = MemeticPNL;

    cmjToUsd = parseFloat(document.getElementById("S-usdToCmj").textContent) ;
    wjbcToUsd = parseFloat(document.getElementById("S-usdToJbc").textContent) ;

    var usd_pnlCU = 0 ;
    var usd_pnlCUH = 0 ;
    var usd_pnlJasp = 0; 
    var usd_pnlAngb = 0;
    var usd_pnlCC = 0;
    var usd_pnlOS = 0;
    var usd_pnlMO = 0;
  
    // convest PNL from CMJ to USD
    if((pnlCu * cmjToUsd) > 0 ){
      var usd_pnlCU = pnlCu * cmjToUsd;
    }if((pnlJasp * cmjToUsd) > 0){
      var usd_pnlJasp = pnlJasp * cmjToUsd;
    }if((pnlAngb * cmjToUsd) > 0){
      var usd_pnlAngb = pnlAngb * cmjToUsd;
    }if(CrypticCog_inJBC > 0){
      var usd_pnlCC = CrypticCog_inJBC;
    }if(pnlOS * cmjToUsd > 0){
      var usd_pnlOS = pnlOS * cmjToUsd;
    }if(pnlCuh * cmjToUsd > 0){
      var usd_pnlCUH = pnlCuh * cmjToUsd;
    }if(pnlMO * wjbcToUsd > 0){
      var usd_pnlMO = pnlMO * wjbcToUsd;
    }


    calculateROI(usd_pnlMO,usd_pnlCU,usd_pnlJasp,usd_pnlAngb,usd_pnlCC,usd_pnlOS)


    // Display PNL messages
    if(CuPower != 0){
    const pnlCuMessage = pnlCu >= 0 ? `<span class="profit">Profit</span> ${setLocal(pnlCu,2)} CMJ , ~${setLocal(copperMineGasFee_inJBC,3)} JBC , ~${setLocal(usd_pnlCU,5)} USD` : `<span class="loss">Loss</span>  ${setLocal(Math.abs(pnlCu),2)} CMJ ,  ~${setLocal(Math.abs(copperMineGasFee_inJBC),5)} JBC , ~${setLocal(Math.abs(usd_pnlCU),6)} USD`;
    const pnlCuhMessage = pnlCu >= 0 ? `<span class="profit">Profit</span>  ${setLocal(pnlCuh,2)} CMJ , ~${setLocal(copperMiner2GasFee_inJBC,3)} JBC , ~${setLocal(usd_pnlCUH,5)} USD` : `<span class="loss">Loss</span>  ${setLocal(Math.abs(pnlCuh),2)} CMJ ,  ~${setLocal(Math.abs(copperMiner2GasFee_inJBC),5)} JBC , ~${setLocal(Math.abs(usd_pnlCUH),6)} USD`;
    document.getElementById("copperMineHourly").innerHTML += ` <br>(${pnlCuhMessage})` ;
      document.getElementById("copperMineDaily").innerHTML += ` <br>(${pnlCuMessage})` ;
    }else{
      document.getElementById("copperMineHourly").innerHTML += ` <br>(No Power No Miner)` ;
      document.getElementById("copperMineDaily").innerHTML += ` <br>(No Power No Miner)` ;

    }
    if(JaspPower != 0 ){
    const pnlJaspMessage = pnlJasp >= 0 ? `<span class="profit">Profit</span>  ${setLocal(pnlJasp,2)} CMJ , ~${setLocal(jasperCaveGasFee_inJBC,5)} JBC , ~${setLocal(usd_pnlJasp,6)} USD` : `<span class="loss">Loss</span>  ${setLocal(Math.abs(pnlJasp),2)} CMJ ,  ~${setLocal(Math.abs(jasperCaveGasFee_inJBC),5)} JBC , ~${setLocal(Math.abs(usd_pnlJasp),6)} USD`;
    document.getElementById("jasperCave").innerHTML +=` <br>(${pnlJaspMessage})` ;
    }else{
      document.getElementById("jasperCave").innerHTML +=` <br>(No Power No Miner)` ;
      
    }
    if(AngbPower != 0){
    const pnlAngbMessage = pnlAngb >= 0 ? `<span class="profit">Profit</span>  ${setLocal(pnlAngb,2)} CMJ , ~${setLocal(daemonWorldGasFee_inJBC,5)} JBC , ~${setLocal(usd_pnlAngb,6)} USD` : `<span class="loss">Loss</span>  ${setLocal(Math.abs(pnlAngb),2)} CMJ ,  ~${setLocal(Math.abs(daemonWorldGasFee_inJBC),5)} JBC , ~${setLocal(Math.abs(usd_pnlAngb),6)} USD`;
    document.getElementById("DaemonWorld").innerHTML += ` <br>(${pnlAngbMessage})` ;
    }else{
      document.getElementById("DaemonWorld").innerHTML += ` <br>(No Power No Miner)` ;
    }
    if(EEPower != 0){
    const pnlCCMessage = pnlCC >= 0 ? `<span class="profit">Profit</span>  ${setLocal(pnlCC,5)} JTAO , ~${setLocal(CrypticCog_inJBC,5)} USD` : `<span class="loss">Loss</span>  ${setLocal(Math.abs(pnlCC),5)} JTAO ,  ~${setLocal(Math.abs(CrypticCog_inJBC),5)} USD`;
    document.getElementById("CrypticNight").innerHTML += ` <br>(${pnlCCMessage})` ;
    }else{
      document.getElementById("CrypticNight").innerHTML += ` <br>(No Power No Miner)` ;

    }
    if(OSPower != 0){
    const pnlOSMessage = pnlOS >= 0 ? `<span class="profit">Profit</span>  ${setLocal(pnlOS,2)} CMJ , ~${setLocal(HouseSTaking_inJBC,5)} JBC , ~${setLocal(usd_pnlOS,6)} USD` : `<span class="loss">Loss</span>  ${setLocal(Math.abs(pnlOS),2)} CMJ ,  ~${setLocal(Math.abs(HouseSTaking_inJBC),5)} JBC , ~${setLocal(Math.abs(usd_pnlOS),6)} USD`;
    document.getElementById("HouseStaking").innerHTML += ` <br>(${pnlOSMessage})` ;
      }else{
        document.getElementById("HouseStaking").innerHTML += ` <br>(No Power No Miner)` ;
  
      }

if(MOPower != 0){
    const pnlMOMessage = pnlMO >= 0 ? `<span class="profit">Profit</span>  ${setLocal((pnlMO*wjbcToUsd)/cmjToUsd,2)} CMJ , ~${setLocal(pnlMO,5)} JBC , ~${setLocal(pnlMO*wjbcToUsd,6)} USD` : `<span class="loss">Loss</span>  ${setLocal(Math.abs((pnlMO*wjbcToUsd)/cmjToUsd),2)} CMJ ,  ~${setLocal(Math.abs(pnlMO),5)} JBC , ~${setLocal(Math.abs(pnlMO*wjbcToUsd),6)} USD`;
    document.getElementById("Memetic").innerHTML += ` <br>(${pnlMOMessage})` ;
      }else{
        document.getElementById("Memetic").innerHTML += ` <br>(No Power No Miner)` ;
  
      }
    }

    function calculateROI(usd_pnlMO,usd_pnlCU,usd_pnlJasp,usd_pnlAngb,usd_pnlCC,usd_pnlOS){
      jbcToUsd = parseFloat(document.getElementById("S-usdToJbc").textContent) ;
      investment = parseFloat(document.getElementById("invest").value) ;
      returns = parseFloat(document.getElementById("return").value) ;
      console.log("InvestMent",investment,"Return : ",returns);
      console.log("CU",usd_pnlCU," JASP",usd_pnlJasp," ANGB",usd_pnlAngb," CC",usd_pnlCC," usd_pnlOS",usd_pnlOS," usd_pnlMO",usd_pnlMO);
      
      sum = usd_pnlCU+usd_pnlJasp+usd_pnlAngb+usd_pnlCC+usd_pnlOS;
      sumJBC = sum/jbcToUsd;
      document.getElementById("gain").innerHTML = ` ${sum.toLocaleString(undefined,{maximumFractionDigits:4})} USD , ${sumJBC.toLocaleString(undefined,{maximumFractionDigits:4})} JBC`;
      if(investment>returns && investment != 0){
        remianing = investment - returns;
        roiPercent = parseFloat((returns/investment)*100);
        roiDay = remianing / sum;
        document.getElementById("returnDate").innerHTML = `Return In : ~${parseInt(roiDay+1)} Days , Remaining ${((remianing).toLocaleString(undefined,{maximumFractionDigits:2}))} USD (Returned : ${((roiPercent).toLocaleString(undefined,{maximumFractionDigits:2}))}%) `;
      }else if(returns > investment && investment != 0){
        // Profit
        remianing =  returns-investment;
        roiPercent = parseFloat((returns/investment)*100);
        document.getElementById("returnDate").innerHTML = `คืนทุนเรียบร้อย กำไรอยู่ที่ ${(remianing).toLocaleString(undefined,{maximumFractionDigits:2})} (${(roiPercent).toLocaleString(undefined,{maximumFractionDigits:2})})%`;
      }

    }
    const walletInput = document.querySelectorAll("#wallet_power");
        walletInput.forEach(input => {
            input.addEventListener("input", setPowerFromWallet);
        });
            
    async function setPowerFromWallet(){
              const walletAddress = document.getElementById("wallet_power").value;
            if(walletAddress != 0){
              if(walletAddress != 0){
                console.log(walletAddress);
                CUContract = await loadContract('0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841');
                EEContract = await loadContract('0xF663c756b6D57724C3B41c8839aB9c7Af83c9751');
                JASPContract = await loadContract('0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860');
                DWContract = await loadContract('0x59c1C2f5FA76DB933B97b7c54223129e2A398534');
            
                getDataCu = await CUContract.methods.nftEquip(walletAddress).call();
                getDataJasp = await JASPContract.methods.nftEquip(walletAddress).call();
                getDataAngb = await DWContract.methods.nftEquip(walletAddress).call();
                getDataEE = await EEContract.methods.nftStatus(walletAddress).call();
            
                var CuPow = document.getElementById('power1');
                var JaspPow = document.getElementById('power2');
                var AngbPow = document.getElementById('power3');
                var EEPow = document.getElementById('power4');
                var OSPow = document.getElementById('power5');
                console.log(getDataCu[3]);
                console.log(getDataJasp[7]);
                console.log(getDataAngb[8]);
                console.log(getDataEE[7]);
                CuPow.value = parseFloat(getDataCu[3]);
                JaspPow.value = parseFloat(getDataJasp[7]);
                AngbPow.value = parseFloat(getDataAngb[8]);
                EEPow.value = parseFloat(getDataEE[7]);
                OSPow.value = parseFloat(0);
              calculateProfit()  
              }}else{alert("Invalid Wallet Address")}}

              

    async function main() {
            try {

            // Bal of JC-LP  , JBC/  0x472d0e2E9839c140786D38110b3251d5ED08DF41
            address = '0x472d0e2E9839c140786D38110b3251d5ED08DF41';
            const JBC_inJCLP = await web3_Jbc.eth.getBalance(address) / divider; 
            const CMJ_inJCLP = await call_SC(address, CMJ, 18);
            const JBC_to_CMJ = (CMJ_inJCLP/JBC_inJCLP).toFixed(4);
            const CMJ_to_JBC = (JBC_inJCLP/CMJ_inJCLP).toFixed(4);
            // Bal of JU-LP  , JBC/  0x280608DD7712a5675041b95d0000B9089903B569
            address = '0x280608DD7712a5675041b95d0000B9089903B569';
            const JBC_inJULP = await web3_Jbc.eth.getBalance(address) / divider; 
            const JDUST_inJULP = await call_SC(address, Jusdt, 18);
            const JBC_to_JUSDT = (JDUST_inJULP/JBC_inJULP).toFixed(4);
            const JUSDT_to_JBC = (JBC_inJULP/JDUST_inJULP).toFixed(4);
            // Bal of Meow-CMJ
            address = '0xdB16eCc5d2c27F67B4a4dc1e25f1e6e20BAcAFD0';
            const Meow_inMeowCMJ = await call_SC(address, Meow, 18);
            const CMJ_inMeowCMJ = await call_SC(address, CMJ, 18);
            const Meow_to_CMJ = (Meow_inMeowCMJ/CMJ_inMeowCMJ).toFixed(4);
            const CMJ_to_Meow = (CMJ_inMeowCMJ/Meow_inMeowCMJ).toFixed(10);
            const CMJ_to_Meowmes = (CMJ_inMeowCMJ/Meow_inMeowCMJ).toFixed(6);
            // get bal of Jtao
            address = '0x0E2610730A3c42fd721B289BEe092D9AD1C76890';
            const getJtao = await call_SC(address, Jtao, 18);
            Taodum.methods.balanceOf(address).call((error, balance) => {
                if (error) {
                    document.getElementById("TaoNFT").innerHTML = "Error";
                } else {
                    document.getElementById("TaoDum").innerHTML = balance;
                    //console.log(balance)
                }});
            document.getElementById("TaoLock").innerHTML = getJtao.toLocaleString( {minimumFractionDigits: 2});
            const Meow_inJUST = (CMJ_to_Meowmes*CMJ_to_JBC*JBC_to_JUSDT).toFixed(6);
            const CMJ_inJUST = (CMJ_to_JBC*JBC_to_JUSDT).toFixed(6);
            const JBC_inJUST = (JBC_to_JUSDT*1).toFixed(6);
            //console.log("CMJ PRICE : ",CMJ_to_JBC, "JBC" , CMJ_inJUST, "JUSDT");
            //console.log("JBC PRICE : ",JBC_to_CMJ, "CMJ" , JBC_inJUST, "JUSDT");
            //console.log("MEOW PRICE : ",CMJ_to_Meowmes, "CMJ" , Meow_inJUST, "JUSDT");
            exchangeRate = parseFloat(document.getElementById("thbUsd").textContent) || 33; 

            const TAOPriceUSD = parseFloat(document.getElementById("usdToTao").textContent) ;
            const CMJPriceUSD = parseFloat(document.getElementById("B-usdToCmj").textContent) ;

////////////////////////////////////////////////////////////////////////////////////// MEOW NEON////////////////////////////////////////////////////////////////////////////////

            // Bal of Meow-Mt
            address = '0x6314939709ae79E66a2dD9810202448e27afD70E';
            const Mt_inMtMEOW = await call_SC(address, Mt, 18);
            const MEOW_inMtMEOW = await call_SC(address, Meow, 18);
            const Mt_to_Meow = (Mt_inMtMEOW/MEOW_inMtMEOW).toFixed(4);
            const Meow_to_Mt = (MEOW_inMtMEOW/Mt_inMtMEOW).toFixed(10);
            const Mt_in_CMJ = (Meow_to_Mt*CMJ_to_Meow).toFixed(10);

            // Bal of Meow-Mice
            address = '0xd21fb03ae67958ce28600350e1Df84Ef90196107';
            const Mice_inMiceMEOW = await call_SC(address, Mice, 18);
            const MEOW_inMiceMEOW = await call_SC(address, Meow, 18);
            const Mice_to_Meow = (Mice_inMiceMEOW/MEOW_inMiceMEOW).toFixed(4);
            const Meow_to_Mice = (MEOW_inMiceMEOW/Mice_inMiceMEOW).toFixed(10);
            const Mice_in_CMJ = (Meow_to_Mice*CMJ_to_Meow).toFixed(10);

            // Bal of Meow-Tuna
            address = '0xA86c548E4eB41c4b7752213c8f8dCf94c50354B0';
            const Tuna_inTunaMEOW = await call_SC(address, Tuna, 18);
            const MEOW_inTunaMEOW = await call_SC(address, Meow, 18);
            const Tuna_to_Meow = (Tuna_inTunaMEOW/MEOW_inTunaMEOW).toFixed(4);
            const Meow_to_Tuna = (MEOW_inTunaMEOW/Tuna_inTunaMEOW).toFixed(10);
            const Tuna_in_CMJ = (Meow_to_Tuna*CMJ_to_Meow).toFixed(10);

            // Bal of Meow-MT
            address = '0x6314939709ae79e66a2dd9810202448e27afd70e';
            const MT_inMTMEOW = await call_SC(address, Mt, 18);
            const MEOW_inMTMEOW = await call_SC(address, Meow, 18);
            const MT_to_Meow = (MT_inMTMEOW/MEOW_inMTMEOW).toFixed(4);
            const Meow_to_MT = (MEOW_inMTMEOW/MT_inMTMEOW).toFixed(10);
            const MT_in_CMJ = (Meow_to_MT*CMJ_to_Meow).toFixed(10);

/////////////////////////////////////////////////////////////////////////////////// JIBSWAP /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


           // Bal of Meow-Mice
            address = '0xcc59B348085384C1B8e4D310e53a4823aCd38653';
            const Jib_Mice_inMiceMEOW = await call_SC(address, Mice, 18);
            const Jib_MEOW_inMiceMEOW = await call_SC(address, Meow, 18);
            const Jib_Mice_to_Meow = (Jib_Mice_inMiceMEOW/Jib_MEOW_inMiceMEOW).toFixed(4);
            const Jib_Meow_to_Mice = (Jib_MEOW_inMiceMEOW/Jib_Mice_inMiceMEOW).toFixed(10);
            const Jib_Mice_in_CMJ = (Jib_Meow_to_Mice*CMJ_to_Meow).toFixed(10);
            // Bal of Meow-Tuna
            address = '0xF9C16D28E8113D0966cE060a4F8c4cFad6D87467';
            const Jib_Tuna_inTunaMEOW = await call_SC(address, Tuna, 18);
            const Jib_MEOW_inTunaMEOW = await call_SC(address, Meow, 18);
            const Jib_Tuna_to_Meow = (Jib_Tuna_inTunaMEOW/Jib_MEOW_inTunaMEOW).toFixed(4);
            const Jib_Meow_to_Tuna = (Jib_MEOW_inTunaMEOW/Jib_Tuna_inTunaMEOW).toFixed(10);
            const Jib_Tuna_in_CMJ = (Jib_Meow_to_Tuna*CMJ_to_Meow).toFixed(10);
    
            // Bal of Meow-Mt
            address = '0xb882C5Ec427De3085127C89De4fe3ceE12b345bb';
            const Jib_Mt_inMtMEOW = await call_SC(address, Mt, 18);
            const Jib_MEOW_inMtMEOW = await call_SC(address, Meow, 18);
            const Jib_Mt_to_Meow = (Jib_Mt_inMtMEOW/Jib_MEOW_inMtMEOW).toFixed(4);
            const Jib_Meow_to_Mt = (Jib_MEOW_inMtMEOW/Jib_Mt_inMtMEOW).toFixed(10);
            const Jib_Mt_in_CMJ = (Jib_Meow_to_Mt*CMJ_to_Meow).toFixed(10);
            document.getElementById("B-Mt").innerHTML = Jib_Mt_in_CMJ;

            // Bal of Meow-stOPT
            address = '0xc33ED5700B34DF55c925b4ca1791Aa0F61c6bcEd';
            const Jib_stOPT_instOPTMEOW = await call_SC(address, stOPT, 18);
            const Jib_MEOW_instOPTMEOW = await call_SC(address, Meow, 18);
            const Jib_stOPT_to_Meow = (Jib_stOPT_instOPTMEOW/Jib_MEOW_instOPTMEOW).toFixed(4);
            const Jib_Meow_to_stOPT = (Jib_MEOW_instOPTMEOW/Jib_stOPT_instOPTMEOW).toFixed(10);
            const Jib_stOPT_in_CMJ = (Jib_Meow_to_stOPT*CMJ_to_Meow).toFixed(10);

                        // HOUSE  
            PoolData = await HouseStaking.methods.poolInfo(1).call();
            totalPower = parseFloat(PoolData[1]);
            rewardPerBlock = await HouseStaking.methods.rewardPerBlock().call() /10**18;
            multiplier = await HouseStaking.methods.BONUS_MULTIPLIER().call();
            console.log("Current House Multipiler ",multiplier);
            document.getElementById("housemultiply").innerHTML = `*${multiplier}`;
            
            document.getElementById("TotalPower").innerHTML = (totalPower.toLocaleString(undefined,{maximumFractionDigits:0}));

            RewardDebt = (1 * 10) / (10**12);
            rewardPerBlock = 140000000000000000 ; //(0.14)
            poolAllocPoint = 10;
            totalAllocPoint = 13;
            reward = (multiplier*rewardPerBlock*poolAllocPoint) / totalAllocPoint ;
            accRewardPerShare = (reward * (10**12)) / totalPower ;
            rewardPerPower = ((1 * accRewardPerShare) / (10**12)) - RewardDebt;
            FinalOSreward = rewardPerPower /(10**18);
            document.getElementById("RewardPerPower").innerHTML = (FinalOSreward*6485*0.95).toLocaleString(undefined,{maximumFractionDigits:8});

        } catch (error) {
            console.error('Error:', error);
            console.log('An error occurred while fetching contract information.');
        }}
main();

async function call_SC(address, contract, divider) {
    try {
      const result = await contract.methods.balanceOf(address).call();
      return result / (10 ** divider); // เลื่อนการหารออกจากการเรียกใช้เพื่อความชัดเจน
    } catch (error) {
      console.error("Error calling contract method:", error);
      return null;
    }
  }

  function setLocal(number,maximumFractionDigits){
    return number.toLocaleString(undefined, { maximumFractionDigits : maximumFractionDigits })
  }