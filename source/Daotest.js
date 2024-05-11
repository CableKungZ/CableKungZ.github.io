
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////// Uprade Table open url ////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    function openURL(url) {
        var upgradeDiv = document.getElementById('upgradeIframe');
        var upgradeDetails = document.getElementById('upgradeDetails');
        upgradeDetails.style.display = 'none';
        upgradeDiv.innerHTML = '<iframe src="' + url + '" style="width: 100%; height: 100vh; border: none;"></iframe>';
        
        // Add back button
        var backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.classList.add('button');
        backButton.onclick = function() {
            upgradeDetails.style.display = 'block';
            upgradeDiv.innerHTML = ''; // Clear the iframe
        };
        
        // Insert back button at the top of upgradeIframe
        if (upgradeDiv.firstChild) {
            upgradeDiv.insertBefore(backButton, upgradeDiv.firstChild);
        } else {
            upgradeDiv.appendChild(backButton);
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////// Show / Hide Card Board////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    document.addEventListener("DOMContentLoaded", function() {
      var allCards = document.querySelectorAll('#factory,#dungeon,#gashapon, #pool, #upgrade, #noti, #logs,#walletWatcher');
      for (var i = 0; i < allCards.length; i++) {
        allCards[i].style.display = 'none';
      }
    });
    function toggleCards(showType) {
        console.log("Call ",showType);
      var allCards = document.querySelectorAll('#priceBoard,#factory, #dungeon, #gashapon, #pool, #upgrade, #noti, #logs,#walletWatcher');
      for (var i = 0; i < allCards.length; i++) {
        allCards[i].style.display = 'none';
      }
      var showCards = document.querySelectorAll('#' + showType);
      for (var i = 0; i < showCards.length; i++) {
        showCards[i].style.display = 'block';
      }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////// Show / Hide Popup////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    function showdPopup(popupId) {
        document.getElementById(popupId).style.display = 'flex';
    }
    function closedPopup(popupId) {
      document.getElementById(popupId).style.display = 'none';
  }
    function showQR(method) {
        if (method === 'PromptPay') {
            document.getElementById('qrImage').src = 'promptpay_qr_code.png'; // ใส่ URL รูปภาพ QR Code ของ PromptPay ที่คุณมี
        } else if (method === 'Crypto') {
            document.getElementById('qrImage').src = 'https://i.ibb.co/q5Z3K9P/Metamask-Main-Wallet-Address.png'; // ใส่ URL รูปภาพ QR Code ของ Crypto Wallet ที่คุณมี
        }
        document.getElementById('qrCode').style.display = 'block';
    }
    function copyAddress(text) {
        var tempInput = document.createElement('input');
        tempInput.value = text; // ใส่ค่าข้อความที่ได้รับเข้าไปโดยตรง
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Copied to clipboard: ' + text);
    }
    
    // Your existing script for updating prices

    function updateData(data) {

      // Show the updated message
      document.getElementById('updatedMessage').style.display = 'block';
      setTimeout(function() {
        // Hide the updated message after 3 seconds
        document.getElementById('updatedMessage').style.display = 'none';
      }, 200); // 3000 milliseconds = 3 seconds
    }

    // Countdown Timer
    var countdownElement = document.getElementById('countdown');
    var countdownTime = 5; // seconds
     

    function updateCountdown() {
      countdownElement.textContent = 'Price refreshing in ' + countdownTime + ' seconds';
      countdownTime--;

      if (countdownTime < 0) {
        // Call the updateData function when the countdown reaches 0
         
        main();
        countdownTime = 30; // Reset the countdown time
      }
    }

    // Initial call to start the countdown
    updateCountdown();

    // Update the countdown every second
    setInterval(updateCountdown, 1000);


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

const powerInputs = document.querySelectorAll("#power, #input1, #input2, #input3, #input4,#input5");

powerInputs.forEach(input => {
    input.addEventListener("input", calculateProfit);
});





 function calculateProfit() {
    // ดึงค่า Power จาก input
    var isMultiple = document.getElementById("multiPowerBtn").classList.contains('active');
    var RewardOs = parseFloat(document.getElementById("RewardPerPower").textContent) || 0;
    var OsPowerAll = parseFloat(document.getElementById("TotalPower").textContent) || 0;
    var power = 0;
    var CuPower = 0;
    var JaspPower = 0;
    var AngbPower = 0;
    var EEPower = 0;
    var OSPower = 0;
    

    if(isMultiple){
      var CuPower = document.getElementById("power1").value || 0;
      var JaspPower = document.getElementById("power2").value || 0;
      var AngbPower = document.getElementById("power3").value || 0;
      var EEPower = document.getElementById("power4").value || 0;
      var OSPower = document.getElementById("power5").value || 0;
      
    
    }else{
      var power = document.getElementById("power").value || 0;
      var CuPower = power;
      var JaspPower = power;  
      var AngbPower = power
      var EEPower = power;
      var OSPower = power;
    }
    console.log("isMultiple : ",isMultiple);
    console.log("CU POW : ",CuPower);
    console.log("JASP POW : ",JaspPower);
    console.log("ANGB POW : ",AngbPower);
    console.log("EE POW : ",EEPower);
    console.log("OS POW : ",OSPower);
    const cuMine = parseFloat(document.getElementById("labR2").textContent) || 0; // Copper Mine Gas
    const jaspCave = parseFloat(document.getElementById("labR4").textContent) || 0; // Japser Cave Gas
    const daemonWorld = parseFloat(document.getElementById("labR6").textContent) || 0; // daemonWorld Gas

    const labAB2 = parseFloat(document.getElementById("labAB2").textContent) || 0; // Price CU per POW (JBC)
    const labAB4 = parseFloat(document.getElementById("labEV4").textContent) || 0; // Price JASP Per Pow (JBC)
    const cmj_to_JBC = parseFloat(document.getElementById("priceB2").textContent) || 0; // Get Price of CMJ/JBC

    const EEPrice = parseFloat(document.getElementById("EEPrice_JTAO").textContent) || 0; // Get Price of EE/JTAO
    const IIPrice = parseFloat(document.getElementById("IIPrice_JTAO").textContent) || 0; // Get Price of II/JTAO
    const TaoPriceUSDT = parseFloat(document.getElementById("priceD22").textContent) || 0; // Get Price of EE/JTAO
    const gasDun5 = parseFloat(document.getElementById("Cost_CMJ_Dun4").textContent) || 0; // CryoticCogs Gas

    const cuPrice = parseFloat(document.getElementById("priceB7").textContent) || 0;
    const jaspPrice = parseFloat(document.getElementById("priceB17").textContent) || 0;
    const angbPrice = parseFloat(document.getElementById("priceB23").textContent) || 0;
    const osPrice = parseFloat(document.getElementById("priceB18").textContent) || 0;

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

    // คำนวณ PNL - GASFEE
    const copperMineGasFee = (copperMineDaily * cuPrice) - (cuMine * 24);
    const copperMiner2GasFee = (copperMineHourly * cuPrice) - (cuMine);
    const jasperCaveGasFee = (jasperCave * jaspPrice) - jaspCave;
    const daemonWorldGasFee = (angb * angbPrice) - daemonWorld;
    const CrypticCogsGasFee = (CrypticCog* EEPrice) -gasDun5; // Reward in JTAO
    const HouseStakingGasFee = (OsDaily*osPrice); // reward in CMJ

    // คำนวนในมูลค่า JBC

    const copperMineGasFee_inJBC = (copperMineGasFee * cmj_to_JBC);
    const copperMiner2GasFee_inJBC = (copperMiner2GasFee * cmj_to_JBC);
    const jasperCaveGasFee_inJBC = (jasperCaveGasFee * cmj_to_JBC);
    const daemonWorldGasFee_inJBC = (daemonWorldGasFee * cmj_to_JBC);
    const CrypticCog_inJBC = (CrypticCogsGasFee * TaoPriceUSDT); // คำนวรเป็น USDT
    const HouseSTaking_inJBC = (HouseStakingGasFee * cmj_to_JBC);

      // GasFee 
    const GasFee_CrypticCogs_inJTAO = (parseFloat(document.getElementById("IIPrice_JTAO").textContent) || 0) * 7;

    // คำนวนในมูลค่า JTAO
      const CrypticCog_JTAO = (EEPrice*CrypticCog)-GasFee_CrypticCogs_inJTAO;

    // แสดงผลลัพธ์

    document.getElementById("copperMineHourly").innerHTML = `   * ${setLocal(copperMineHourly,2)} Cu/h`;
    document.getElementById("copperMineDaily").innerHTML = `   * ${setLocal(copperMineDaily,2)} Cu/d`;
    document.getElementById("jasperCave").innerHTML = `   * ${setLocal(jasperCave,8)} Jasp/d `;
    document.getElementById("DaemonWorld").innerHTML = `   * ${setLocal(angb,8)} Angb/d `;
    document.getElementById("CrypticNight").innerHTML = `   * ${setLocal(CrypticCog,8)} EE/d `;
    document.getElementById("HouseStaking").innerHTML = `   * ${setLocal(OsDaily,8)} OS/d `;

    // Display PNL messages
    displayPNLMessages(OSPower,HouseSTaking_inJBC,HouseStakingGasFee,CuPower,JaspPower,AngbPower,EEPower,CrypticCog_JTAO,CrypticCogsGasFee,CrypticCog_inJBC,copperMineGasFee, jasperCaveGasFee, copperMiner2GasFee, copperMineGasFee_inJBC, copperMiner2GasFee_inJBC, jasperCaveGasFee_inJBC, daemonWorldGasFee, daemonWorldGasFee_inJBC);
  }

  // Function to display PNL messages
  function displayPNLMessages(OSPower,HouseSTaking_inJBC,HouseStakingGasFee,CuPower,JaspPower,AngbPower,EEPower,CrypticCog_JTAO,CrypticCogsGasFee,CrypticCog_inJBC,copperMineGasFee, jasperCaveGasFee, copperMiner2GasFee, copperMineGasFee_inJBC, copperMiner2GasFee_inJBC, jasperCaveGasFee_inJBC, daemonWorldGasFee, daemonWorldGasFee_inJBC) {
    const pnlCu = copperMineGasFee; // PNL for CopperMine (Cu)
    const pnlJasp = jasperCaveGasFee; // PNL for JasperCave (Jasp)
    const pnlCuh = copperMiner2GasFee;
    const pnlAngb = daemonWorldGasFee;
    const pnlCC = CrypticCogsGasFee;
    const pnlOS = HouseStakingGasFee;

    cmjToUsd = parseFloat(document.getElementById("Sell_CMJinUSD").textContent) || 0;
    var usd_pnlCU = 0 ;
    var usd_pnlCUH = 0 ;
    var usd_pnlJasp = 0; 
    var usd_pnlAngb = 0;
    var usd_pnlCC = 0;
    var usd_pnlOS = 0;
  
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
    }


    calculateROI(usd_pnlCU,usd_pnlJasp,usd_pnlAngb,usd_pnlCC,usd_pnlOS)


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
    const pnlOSMessage = pnlOS >= 0 ? `<span class="profit">Profit</span>  ${setLocal(pnlOS,2)} CMJ , ~${setLocal(HouseSTaking_inJBC,5)} JBC , ~${setLocal(usd_pnlOS,6)} USD` : `<span class="loss">Loss</span>  ${setLocal(Math.abs(pnlOS),2)} CMJ ,  ~${setLocal(Math.abs(HouseSTaking_inJBC),5)} JBC , ~${setLocal(math.abs(usd_pnlOS),6)} USD`;
    document.getElementById("HouseStaking").innerHTML += ` <br>(${pnlOSMessage})` ;
      }else{
        document.getElementById("HouseStaking").innerHTML += ` <br>(No Power No Miner)` ;
  
      }
    }

    function calculateROI(usd_pnlCU,usd_pnlJasp,usd_pnlAngb,usd_pnlCC,usd_pnlOS){
      jbcToUsd = parseFloat(document.getElementById("Sell_JBCinUSD").textContent) || 0;
      investment = parseFloat(document.getElementById("invest").value) || 0;
      returns = parseFloat(document.getElementById("return").value) || 0;
      console.log("InvestMent",investment,"Return : ",returns);
      console.log("CU",usd_pnlCU," JASP",usd_pnlJasp," ANGB",usd_pnlAngb," CC",usd_pnlCC," usd_pnlOS",usd_pnlOS);
      
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


    async function main() {
        const divider = 10 ** 18;
        const jaspdivider = 10 **9;

        const web3 = new Web3('https://jib-rpc.inan.in.th');
        console.log(" Access RPC Success")

        const contractABI = [
        // ABI ของ contract ERC-20
        {
            "constant": true,
            "inputs": [{"name": "_owner", "type": "address"}],
            "name": "balanceOf",
            "outputs": [{"name": "balance", "type": "uint256"}],
            "type": "function"
        }
    ];
    const ERC721ABI = [
    // ABI ของ balanceOf function
    {
      "constant": true,
      "inputs": [{"name": "_owner", "type": "address"}],
      "name": "balanceOf",
      "outputs": [{"name": "", "type": "uint256"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
  async function loadContract(contractAddress) {
    try {
      const response = await fetch(`https://exp-l1.jibchain.net/api?module=contract&action=getabi&address=${contractAddress}`);
      const data = await response.json();
      const abi = JSON.parse(data.result);
      return new web3.eth.Contract(abi, contractAddress);
    } catch (error) {
      console.error('Error loading contract:', error);
      alert("ไม่สามารถ Loading Contract ได้กรุณา รีเฟรช หรือ ลองใหม่อีกครั้งในอีก 1 ชั่วโมง")
    }
  }
        // สร้างออบเจ็กต์สัญญา
        const CMJ = new web3.eth.Contract(contractABI,'0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b');
        const WJBC = new web3.eth.Contract(contractABI,'0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747');
        const Jib_WJBC = new web3.eth.Contract(contractABI,'0x99999999990FC47611b74827486218f3398A4abD');
        const Meow = new web3.eth.Contract(contractABI,'0x04052384166fC30D03929eE328805eC084776843');
        const Wood = new web3.eth.Contract(contractABI,'0xc2744Ff255518a736505cF9aC1996D9adDec69Bd');
        const Tuna = new web3.eth.Contract(contractABI,'0x09676315DC0c85F6bd5e866C5f1363A00Eec4381');
        const Mice = new web3.eth.Contract(contractABI,'0x09DE640ecd50e1c81bCB266279e3ffC2719873df');
        const Cu = new web3.eth.Contract(contractABI,'0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841');
        const Jasp = new web3.eth.Contract(contractABI,'0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860');
        const Os = new web3.eth.Contract(contractABI,'0xAc5299D92373E9352636559cca497d7683A47655');
        const Jdao = new web3.eth.Contract(contractABI,'0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88');
        const Mt = new web3.eth.Contract(contractABI,'0x169816800f1eA9C5735937388aeb9C2A3bAca11F');
        const Vabag = new web3.eth.Contract(contractABI,'0x495d66c9Fd7c63807114d06802A48BdAA60a0426');
        const Bbq = new web3.eth.Contract(contractABI,'0x7004757e595409568Bd728736e1b0c79FDc94e1c');
        const Pza = new web3.eth.Contract(contractABI,'0x09DcdCFc6C48803681a3422997c679E773656763');
        const Ctuna = new web3.eth.Contract(contractABI,'0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0');
        const Sx31 = new web3.eth.Contract(contractABI,'0xd431d826d7a4380b9259612176f00528b88840a7');
        const Sil = new web3.eth.Contract(contractABI,'0x2a081667587c35956d34A4cC3bf92b9CA0ef2C6f');
        const Gold = new web3.eth.Contract(contractABI,'0x7d5346E33889580528e6F79f48BdEE94D8A9E144');
        const Plat = new web3.eth.Contract(contractABI,'0x3Bd00B6cd18281E3Ef13Ba348ad2783794dcb2bD');
        const Swar = new web3.eth.Contract(contractABI,'0x5e18a8B78d5395371308C54719fead810Ce2aCd2');
        const Jusdt = new web3.eth.Contract(contractABI,'0x24599b658b57f91E7643f4F154B16bcd2884f9ac');
        const stOPT = new web3.eth.Contract(contractABI,'0x435BeAF4B83A6dc57927E9dB194a3Ccf54100F7a');
        const Jtao = new web3.eth.Contract(contractABI,'0xdbCCc9F8920e7274eeC62e695084D3bCe443c3dd');
        const Angb = new web3.eth.Contract(contractABI,'0x59c1C2f5FA76DB933B97b7c54223129e2A398534');
        const Taodum = new web3.eth.Contract(ERC721ABI,'0x2036186F6d5287FcB05C56C38374AC5236d8A61d');
        const EE = new web3.eth.Contract(contractABI,'0xF663c756b6D57724C3B41c8839aB9c7Af83c9751');
        const II = new web3.eth.Contract(contractABI,'0x523AA3aB2371A6360BeC4fEea7bE1293adb32241');
        const CMJ_inUSDT = parseFloat(document.getElementById("priceD2").textContent) || 0; 
        JTAO_inUSDT = parseFloat(document.getElementById("priceD22").textContent) || 0; 
        const HouseStaking = await loadContract('0x2eF9d702c42BC0F8B9D7305C34B4f63526502255');

        

        try {

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
              }
            }else{
              alert("Invalid Wallet Address")
            }
            
        }
                
                
          
            
            
            // Bal of JC-LP  , JBC/  0x472d0e2E9839c140786D38110b3251d5ED08DF41
            address = '0x472d0e2E9839c140786D38110b3251d5ED08DF41';
            const JBC_inJCLP = await web3.eth.getBalance(address) / divider; 
            const CMJ_inJCLP = await call_SC(address, CMJ, 18);
            const JBC_to_CMJ = (CMJ_inJCLP/JBC_inJCLP).toFixed(4);
            const CMJ_to_JBC = (JBC_inJCLP/CMJ_inJCLP).toFixed(4);
            // Bal of JU-LP  , JBC/  0x280608DD7712a5675041b95d0000B9089903B569
            address = '0x280608DD7712a5675041b95d0000B9089903B569';
            const JBC_inJULP = await web3.eth.getBalance(address) / divider; 
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
                    console.log(balance)
                }
              });
            document.getElementById("TaoLock").innerHTML = getJtao.toLocaleString( {minimumFractionDigits: 2});
            const Meow_inJUST = (CMJ_to_Meowmes*CMJ_to_JBC*JBC_to_JUSDT).toFixed(6);
            const CMJ_inJUST = (CMJ_to_JBC*JBC_to_JUSDT).toFixed(6);
            const JBC_inJUST = (JBC_to_JUSDT*1).toFixed(6);
            console.log("CMJ PRICE : ",CMJ_to_JBC, "JBC" , CMJ_inJUST, "JUSDT");
            console.log("JBC PRICE : ",JBC_to_CMJ, "CMJ" , JBC_inJUST, "JUSDT");
            console.log("MEOW PRICE : ",CMJ_to_Meowmes, "CMJ" , Meow_inJUST, "JUSDT");
            // Buy Token
            document.getElementById("priceB2").innerHTML = (CMJ_to_JBC*1.013).toLocaleString(undefined,{maximumFractionDigits:8});
            document.getElementById("priceD2").innerHTML = (CMJ_inJUST*1.013).toLocaleString(undefined,{maximumFractionDigits:8});  // CMJ_to_JUSDT
            document.getElementById("priceB3").innerHTML = (JBC_to_CMJ*1.013).toLocaleString(undefined,{maximumFractionDigits:8});
            document.getElementById("priceD3").innerHTML = (JBC_inJUST*1.013).toLocaleString(undefined,{maximumFractionDigits:8});
            document.getElementById("priceB14").innerHTML = (CMJ_to_Meowmes*1.05).toLocaleString(undefined,{maximumFractionDigits:8});
            document.getElementById("priceD14").innerHTML = (Meow_inJUST*1.05).toLocaleString(undefined,{maximumFractionDigits:8});

            // Sell Token
            document.getElementById("Sell_CMJinJBC").innerHTML = (CMJ_to_JBC*0.99).toLocaleString(undefined,{maximumFractionDigits:8});
            document.getElementById("Sell_CMJinUSD").innerHTML = (CMJ_inJUST*0.99).toLocaleString(undefined,{maximumFractionDigits:8});  // CMJ_to_JUSDT
            document.getElementById("Sell_JBCinCMJ").innerHTML = (JBC_to_CMJ*0.99).toLocaleString(undefined,{maximumFractionDigits:8});
            document.getElementById("Sell_JBCinUSD").innerHTML = (JBC_inJUST*0.99).toLocaleString(undefined,{maximumFractionDigits:8});
            document.getElementById("Sell_MeowinCMJ").innerHTML = (CMJ_to_Meowmes*0.95).toLocaleString(undefined,{maximumFractionDigits:8});
            document.getElementById("Sell_MeowinUSD").innerHTML = (Meow_inJUST*0.95).toLocaleString(undefined,{maximumFractionDigits:8});
            const TAOPriceUSD = parseFloat(document.getElementById("priceD22").textContent) || 0;
            const CMJPriceUSD = parseFloat(document.getElementById("priceD2").textContent) || 0;
            






            // Bal of BBQ  , JBC/  0x6F93F16cF86205C5BB9145078d584c354758D6DB
            address = '0x6F93F16cF86205C5BB9145078d584c354758D6DB';
            const BBQ_inBBQCMJ = await call_SC(address, Bbq, 18);
            const CMJ_inBBQCMJ = await call_SC(address, CMJ, 18);
            const BBQ_to_CMJ = (BBQ_inBBQCMJ/CMJ_inBBQCMJ).toFixed(4);
            const CMJ_to_BBQ = (CMJ_inBBQCMJ/BBQ_inBBQCMJ).toFixed(10);
            if (CMJ_to_BBQ != 0){
              document.getElementById("priceB8").innerHTML = (CMJ_to_BBQ*1.05).toLocaleString(undefined,{maximumFractionDigits:14});
              document.getElementById("priceB8_2").innerHTML = (CMJ_to_BBQ*0.95).toLocaleString(undefined,{maximumFractionDigits:14});
            }
                    


            // Bal of Cu  , JBC/  0x280608DD7712a5675041b95d0000B9089903B569
            address = '0x1b70c95fD4EbF8920A624bd2ce22b6905eFBdF60';
            const Cu_inCuCMJ = await call_SC(address, Cu, 18);
            const CMJ_inCuCMJ = await call_SC(address, CMJ, 18);
            const Cu_to_CMJ = (Cu_inCuCMJ/CMJ_inCuCMJ).toFixed(4);
            const CMJ_to_Cu = (CMJ_inCuCMJ/Cu_inCuCMJ).toFixed(10);
            if (CMJ_to_Cu != 0){
              document.getElementById("priceB7").innerHTML = (CMJ_to_Cu*1.05).toLocaleString(undefined,{maximumFractionDigits:14});
              document.getElementById("Sell_CuinCMJ").innerHTML = (CMJ_to_Cu*0.95).toLocaleString(undefined,{maximumFractionDigits:14});
            }
                    


            // Bal of Jasp CMJ
            address = '0xc19DE37d5e14b387BCda8e62aB4934591315901D';
            const Jasp_inJaspCMJ = await call_SC(address, Jasp, 9);
            const CMJ_inJaspCMJ = await call_SC(address, CMJ, 18);
            const Jasp_to_CMJ = (Jasp_inJaspCMJ/CMJ_inJaspCMJ).toFixed(4);
            const CMJ_to_Jasp = (CMJ_inJaspCMJ/Jasp_inJaspCMJ).toFixed(10);
            if (CMJ_to_Jasp != 0){
              document.getElementById("priceB17").innerHTML = (CMJ_to_Jasp*1.05).toLocaleString(undefined,{maximumFractionDigits:14});
              document.getElementById("priceB17_2").innerHTML = (CMJ_to_Jasp*0.95).toLocaleString(undefined,{maximumFractionDigits:14});
            }
                    



            // Bal of Jdao  , JBC/  0x3C061eEce15C539CaE99FbE75B3044236Fa2eff0
            address = '0x3C061eEce15C539CaE99FbE75B3044236Fa2eff0';
            const Jdao_inJdaoCMJ = await call_SC(address, Jdao, 18);
            const CMJ_inJdaoCMJ = await call_SC(address, CMJ, 18);
            const Jdao_to_CMJ = (Jdao_inJdaoCMJ/CMJ_inJdaoCMJ).toFixed(4);
            const CMJ_to_Jdao = (CMJ_inJdaoCMJ/Jdao_inJdaoCMJ).toFixed(10);
                    // display 
            if(CMJ_to_Jdao != 0){
              document.getElementById("priceB15").innerHTML = (CMJ_to_Jdao*1.05).toLocaleString(undefined,{maximumFractionDigits:14});
              document.getElementById("priceB15_2").innerHTML = (CMJ_to_Jdao*0.95).toLocaleString(undefined,{maximumFractionDigits:14});
            }
                    

            // Bal of Pizza(Pza)  , JBC/  0x280608DD7712a5675041b95d0000B9089903B569
            address = '0x3161EE630bF36d2AB6333a9CfD22ebaa3e2D7C70';
            const Pza_inPzaCMJ = await call_SC(address, Pza, 18);
            const CMJ_inPzaCMJ = await call_SC(address, CMJ, 18);
            const Pza_to_CMJ = (Pza_inPzaCMJ/CMJ_inPzaCMJ).toFixed(4);
            const CMJ_to_Pza = (CMJ_inPzaCMJ/Pza_inPzaCMJ).toFixed(10);
            if(CMJ_to_Pza != 0){
              document.getElementById("priceB9").innerHTML = (CMJ_to_Pza*1.05).toLocaleString(undefined,{maximumFractionDigits:14});
              document.getElementById("priceB9_2").innerHTML = (CMJ_to_Pza*0.95).toLocaleString(undefined,{maximumFractionDigits:14});
            }
                   

            // Bal of Sx31  , JBC/  0x280608DD7712a5675041b95d0000B9089903B569
            address = '0xda558EE93B466aEb4F59fBf95D25d410318be43A';
            const Sx31_inSx31CMJ = await call_SC(address, Sx31, 18);
            const CMJ_inSx31CMJ = await call_SC(address, CMJ, 18);
            const Sx31_to_CMJ = (Sx31_inSx31CMJ/CMJ_inSx31CMJ).toFixed(4);
            const CMJ_to_Sx31 = (CMJ_inSx31CMJ/Sx31_inSx31CMJ).toFixed(10);
            if(CMJ_to_Sx31 != 0){
              document.getElementById("priceB11").innerHTML = (CMJ_to_Sx31*1.05).toLocaleString(undefined,{maximumFractionDigits:14});
              document.getElementById("priceB11_2").innerHTML = (CMJ_to_Sx31*0.95).toLocaleString(undefined,{maximumFractionDigits:14});
            }
                    

            // Bal of Ctuna  , JBC/  0x280608DD7712a5675041b95d0000B9089903B569
            address = '0x7801F8cdBABE6999331d1Bf37d74aAf713C3722F';
            const Ctuna_inCtunaCMJ = await call_SC(address, Ctuna, 18);
            const CMJ_inCtunaCMJ = await call_SC(address, CMJ, 18);
            const Ctuna_to_CMJ = (Ctuna_inCtunaCMJ/CMJ_inCtunaCMJ).toFixed(4);
            const CMJ_to_Ctuna = (CMJ_inCtunaCMJ/Ctuna_inCtunaCMJ).toFixed(10);
            if(CMJ_to_Ctuna != 0){
              document.getElementById("priceB10").innerHTML = (CMJ_to_Ctuna*1.05).toLocaleString(undefined,{maximumFractionDigits:14});
              document.getElementById("priceB10_2").innerHTML = (CMJ_to_Ctuna*0.95).toLocaleString(undefined,{maximumFractionDigits:14});
            }
              
                

            // Bal of Gold  , JBC/  0x280608DD7712a5675041b95d0000B9089903B569
            address = '0x7086EC7ED5D94ef503bE324B0aE8A3748A15fAE5';
            const Gold_inGoldCMJ = await call_SC(address, Gold, 18);
            const CMJ_inGoldCMJ = await call_SC(address, CMJ, 18);
            const Gold_to_CMJ = (Gold_inGoldCMJ/CMJ_inGoldCMJ).toFixed(4);
            const CMJ_to_Gold = (CMJ_inGoldCMJ/Gold_inGoldCMJ).toFixed(10);
            if(CMJ_to_Gold != 0){
              document.getElementById("priceB13").innerHTML = (CMJ_to_Gold*1.05).toLocaleString(undefined,{maximumFractionDigits:14});
              document.getElementById("priceB13_2").innerHTML = (CMJ_to_Gold*0.95).toLocaleString(undefined,{maximumFractionDigits:14});
          
            }
                

            // Bal of Os  , JBC/  0x329889325A555b217C41A4c2EADD529a0CfA4231
            address = '0x329889325A555b217C41A4c2EADD529a0CfA4231';
            const Os_inOsCMJ = await call_SC(address, Os, 18);
            const CMJ_inOsCMJ = await call_SC(address, CMJ, 18);
            const Os_to_CMJ = (Os_inOsCMJ/CMJ_inOsCMJ).toFixed(4);
            const CMJ_to_Os = (CMJ_inOsCMJ/Os_inOsCMJ).toFixed(10);
            if(CMJ_to_Os != 0){
              document.getElementById("priceB18").innerHTML = (CMJ_to_Os*1.05).toLocaleString(undefined,{maximumFractionDigits:14});
              document.getElementById("priceB18_2").innerHTML = (CMJ_to_Os*0.95).toLocaleString(undefined,{maximumFractionDigits:14});
            }
               



            // Bal of Swar  , JBC/  0x280608DD7712a5675041b95d0000B9089903B569
            address = '0x5a9E35fC4Afc21B9Fc74bE18015D4D3B002A83A3';
            const Swar_inSwarWJBC = await call_SC(address, Swar, 18);
            const WJBC_inSwarWJBC = await call_SC(address, WJBC, 18);
            const Swar_to_WJBC = (Swar_inSwarWJBC/WJBC_inSwarWJBC).toFixed(4);
            const WJBC_to_Swar = (WJBC_inSwarWJBC/Swar_inSwarWJBC).toFixed(10);
            const SWAR_in_CMJ = (WJBC_to_Swar*JBC_to_CMJ).toFixed(6)
            if(SWAR_in_CMJ != 0){
              document.getElementById("priceB21").innerHTML = (SWAR_in_CMJ*1.05).toLocaleString(undefined,{maximumFractionDigits:7});
              document.getElementById("priceD21").innerHTML = (WJBC_to_Swar*1.05).toLocaleString(undefined,{maximumFractionDigits:7});
              document.getElementById("priceB21_2").innerHTML = (SWAR_in_CMJ*0.95).toLocaleString(undefined,{maximumFractionDigits:7});
              document.getElementById("priceD21_2").innerHTML = (WJBC_to_Swar*0.95).toLocaleString(undefined,{maximumFractionDigits:7});
            }

                

            // Bal of ANGB , WJBC 
            address = '0xDd35db1a731CD86C01d74A8a4bA4354ca1CDE24d';
            const ANGB_inANGBWJBC = await call_SC(address, Angb, 18);
            const WJBC_inANGBWJBC = await call_SC(address, WJBC, 18);
            const ANGB_to_WJBC = (ANGB_inANGBWJBC/WJBC_inANGBWJBC).toFixed(4);
            const WJBC_to_ANGB = (WJBC_inANGBWJBC/ANGB_inANGBWJBC).toFixed(4);
            const ANGB_in_CMJ = (WJBC_to_ANGB*JBC_to_CMJ).toFixed(6)
            if(ANGB_in_CMJ != 0){
              document.getElementById("priceB23").innerHTML = (ANGB_in_CMJ*1.05).toLocaleString(undefined,{maximumFractionDigits:7});
              document.getElementById("priceD23").innerHTML = (WJBC_to_ANGB*1.05).toLocaleString(undefined,{maximumFractionDigits:7});
              document.getElementById("priceB23_2").innerHTML = (ANGB_in_CMJ*0.95).toLocaleString(undefined,{maximumFractionDigits:7});
              document.getElementById("priceD23_2").innerHTML = (WJBC_to_ANGB*0.95).toLocaleString(undefined,{maximumFractionDigits:7});
            }
                

            // Bal of CMJ , SIL 
            address = '0xf189c5B03694b70e5DFD8e8CAE84118Ed7616F19';
            const SIL_inSILCMJ = await call_SC(address, Sil, 18);
            const CMJ_inSILCMJ = await call_SC(address, CMJ, 18);
            const SIL_to_CMJ = (SIL_inSILCMJ/CMJ_inSILCMJ).toFixed(6);
            const CMJ_to_SIL = (CMJ_inSILCMJ/SIL_inSILCMJ).toFixed(10);
            if(CMJ_to_SIL != 0){
              document.getElementById("priceB12").innerHTML = (CMJ_to_SIL*1.05).toLocaleString(undefined,{maximumFractionDigits:14});
              document.getElementById("priceB12_2").innerHTML = (CMJ_to_SIL*0.95).toLocaleString(undefined,{maximumFractionDigits:14});
          
              
            }

            Tao_CMJ = TAOPriceUSD/CMJPriceUSD;
            if(Tao_CMJ != 0){
            document.getElementById('priceB22').innerText = `${Tao_CMJ.toFixed(8)}`;
          }
                
            

            // BAL of II , JTAO
            address = '0xbD5bFF1fBbD83FECD749a328D98F860f7F343c10';
            const II_inIIJTAO = await call_SC(address,II,18);
            const JTAO_inIIJTAO = await call_SC(address,Jtao,18);
            const II_to_JTAO = setLocal((II_inIIJTAO/JTAO_inIIJTAO),4);
            const JTAO_to_II = (JTAO_inIIJTAO/II_inIIJTAO).toLocaleString(undefined,{maximumFractionDigits:4});
            JTAO_inUSDT = parseFloat(document.getElementById("priceD22").textContent) || 0;
            CMJ_inUSDT2 = parseFloat(document.getElementById("priceD2").textContent) || 0;
            if(JTAO_to_II != 0){
              document.getElementById("IIPrice_JTAO").innerHTML = (JTAO_to_II*1.05).toLocaleString(undefined,{maximumFractionDigits:14});
            document.getElementById("IIPrice_JTAO_2").innerHTML = (JTAO_to_II*0.95).toLocaleString(undefined,{maximumFractionDigits:14});
            }
            JTAO_to_CMJ = (JTAO_to_II*JTAO_inUSDT)/CMJ_inUSDT2;
            II_to_CMJ = ((JTAO_to_II*JTAO_inUSDT)/CMJ_inUSDT2).toFixed(8)
            if(II_to_CMJ != 0){
              document.getElementById("IIPrice_CMJ").innerHTML = (II_to_CMJ*1.05).toLocaleString(undefined,{maximumFractionDigits:14});
              document.getElementById("IIPrice_CMJ_2").innerHTML = (II_to_CMJ*0.95).toLocaleString(undefined,{maximumFractionDigits:14});
            }
            
            
            // BAL of EE , JTAO
            address = '0x3822b065E9980F6cd62Fd8Fa60b3fFB36866CA60';
            const EE_inEEJTAO = await call_SC(address,EE,18);
            const JTAO_inEEJTAO = await call_SC(address,Jtao,18);
            const EE_to_JTAO = setLocal((EE_inEEJTAO/JTAO_inEEJTAO),4);
            const JTAO_to_EE = (JTAO_inEEJTAO/EE_inEEJTAO).toLocaleString(undefined,{maximumFractionDigits:4});
            JTAO_inUSDT = parseFloat(document.getElementById("priceD22").textContent) || 0;
            CMJ_inUSDT2 = parseFloat(document.getElementById("priceD2").textContent) || 0;
            if(JTAO_to_EE != 0){
              document.getElementById("EEPrice_JTAO").innerHTML = (JTAO_to_EE*1.05).toLocaleString(undefined,{maximumFractionDigits:14});
              document.getElementById("EEPrice_JTAO_2").innerHTML = (JTAO_to_EE*0.95).toLocaleString(undefined,{maximumFractionDigits:14});
            }
                      
            JTAO_to_CMJ = (JTAO_to_EE*JTAO_inUSDT)/CMJ_inUSDT2;
            EEPrice_CMJ = ((JTAO_to_EE*JTAO_inUSDT)/CMJ_inUSDT2).toFixed(8)
            if(EEPrice_CMJ != 0){
              document.getElementById("EEPrice_CMJ").innerHTML = (EEPrice_CMJ*1.05).toLocaleString(undefined,{maximumFractionDigits:14});
              document.getElementById("EEPrice_CMJ_2").innerHTML = (EEPrice_CMJ*0.95).toLocaleString(undefined,{maximumFractionDigits:14});
              
            }  

////////////////////////////////////////////////////////////////////////////////////// MEOW NEON////////////////////////////////////////////////////////////////////////////////
            // Bal of Meow-BBQ
            address = '0xd332E9387dC0CbC4A850F23418fC98a47bBE8739';
            const BBQ_inBBQMEOW = await call_SC(address, Bbq, 18);
            const MEOW_inBBQMEOW = await call_SC(address, Meow, 18);
            const BBQ_to_Meow = (BBQ_inBBQMEOW/MEOW_inBBQMEOW).toFixed(4);
            const Meow_to_BBQ = (MEOW_inBBQMEOW/BBQ_inBBQMEOW).toFixed(10);
            const BBQ_in_CMJ = (Meow_to_BBQ*CMJ_to_Meow).toFixed(10);

            // Bal of Meow-Wood
            address = '0x538AE35F6618fc5Ac6d42c781d6Bd6C9E977866D';
            const Wood_inWoodMEOW = await call_SC(address, Wood, 18);
            const MEOW_inWoodMEOW = await call_SC(address, Meow, 18);
            const Wood_to_Meow = (Wood_inWoodMEOW/MEOW_inWoodMEOW).toFixed(4);
            const Meow_to_Wood = (MEOW_inWoodMEOW/Wood_inWoodMEOW).toFixed(10);
            const Wood_in_CMJ = (Meow_to_Wood*CMJ_to_Meow).toFixed(10);

            // Bal of Meow-Mt
            address = '0x6314939709ae79E66a2dD9810202448e27afD70E';
            const Mt_inMtMEOW = await call_SC(address, Mt, 18);
            const MEOW_inMtMEOW = await call_SC(address, Meow, 18);
            const Mt_to_Meow = (Mt_inMtMEOW/MEOW_inMtMEOW).toFixed(4);
            const Meow_to_Mt = (MEOW_inMtMEOW/Mt_inMtMEOW).toFixed(10);
            const Mt_in_CMJ = (Meow_to_Mt*CMJ_to_Meow).toFixed(10);


            // Bal of Meow-Gold
            address = '0xCf3b8D974A68dFE026b91C3664B8c7d9Da569924';
            const Gold_inGoldMEOW = await call_SC(address, Gold, 18);
            const MEOW_inGoldMEOW = await call_SC(address, Meow, 18);
            const Gold_to_Meow = (Gold_inGoldMEOW/MEOW_inGoldMEOW).toFixed(4);
            const Meow_to_Gold = (MEOW_inGoldMEOW/Gold_inGoldMEOW).toFixed(10);
            const Gold_in_CMJ = (Meow_to_Gold*CMJ_to_Meow).toFixed(10);

            // Bal of Meow-WJBC
            address = '0xc8B5DB8c8D6707c8F7e565cDfF9a61fd6e7427B6';
            const WJBC_inWJBCMEOW = await call_SC(address, WJBC, 18);
            const MEOW_inWJBCMEOW = await call_SC(address, Meow, 18);
            const WJBC_to_Meow = (WJBC_inWJBCMEOW/MEOW_inWJBCMEOW).toFixed(4);
            const Meow_to_WJBC = (MEOW_inWJBCMEOW/WJBC_inWJBCMEOW).toFixed(10);
            const WJBC_in_CMJ = (Meow_to_WJBC*CMJ_to_Meow).toFixed(10);

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
                    document.getElementById("priceB5").innerHTML = Tuna_in_CMJ;

            // Bal of Meow-Jusdt
            address = '0x8F04C3d6eb9E744b56f5D89d75Be5e9B466aCE25';
            const Jusdt_inJusdtMEOW = await call_SC(address, Jusdt, 18);
            const MEOW_inJusdtMEOW = await call_SC(address, Meow, 18);
            const Jusdt_to_Meow = (Jusdt_inJusdtMEOW/MEOW_inJusdtMEOW).toFixed(4);
            const Meow_to_Jusdt = (MEOW_inJusdtMEOW/Jusdt_inJusdtMEOW).toFixed(10);
            const Jusdt_in_CMJ = (Meow_to_Jusdt*CMJ_to_Meow).toFixed(10);
           // Bal of Meow-SIL
            address = '0xacb0465e3dedb9333ae9ddd6fafa95d5b6fa4c49';
            const SIL_inSILMEOW = await call_SC(address, Sil, 18);
            const MEOW_inSILMEOW = await call_SC(address, Meow, 18);
            const SIL_to_Meow = (SIL_inSILMEOW/MEOW_inSILMEOW).toFixed(4);
            const Meow_to_SIL = (MEOW_inSILMEOW/SIL_inSILMEOW).toFixed(10);
            const SIL_in_CMJ = (Meow_to_SIL*CMJ_to_Meow).toFixed(10);
            // Bal of Meow-MT
            address = '0x6314939709ae79e66a2dd9810202448e27afd70e';
            const MT_inMTMEOW = await call_SC(address, Mt, 18);
            const MEOW_inMTMEOW = await call_SC(address, Meow, 18);
            const MT_to_Meow = (MT_inMTMEOW/MEOW_inMTMEOW).toFixed(4);
            const Meow_to_MT = (MEOW_inMTMEOW/MT_inMTMEOW).toFixed(10);
            const MT_in_CMJ = (Meow_to_MT*CMJ_to_Meow).toFixed(10);

/////////////////////////////////////////////////////////////////////////////////// JIBSWAP /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // Bal of Meow-WJBC
            address = '0x04C106B2E51a307D3c69d2a72c5A24dcF7c35731';
            const Jib_WJBC_inWJBCMEOW = await call_SC(address, Jib_WJBC, 18);
            const Jib_MEOW_inWJBCMEOW = await call_SC(address, Meow, 18);
            const Jib_WJBC_to_Meow = (Jib_WJBC_inWJBCMEOW/Jib_MEOW_inWJBCMEOW).toFixed(4);
            const Jib_Meow_to_WJBC = (Jib_MEOW_inWJBCMEOW/Jib_WJBC_inWJBCMEOW).toFixed(10);
            const Jib_WJBC_in_CMJ = (Jib_Meow_to_WJBC*CMJ_to_Meow).toFixed(10);

            // Bal of Meow-SIL
            address = '0x2038F97Fe5199a473726016c6B755C71A1d02fa0';
            const Jib_SIL_inSILMEOW = await call_SC(address, Sil, 18);
            const Jib_MEOW_inSILMEOW = await call_SC(address, Meow, 18);
            const Jib_SIL_to_Meow = (Jib_SIL_inSILMEOW/Jib_MEOW_inSILMEOW).toFixed(4);
            const Jib_Meow_to_SIL = (Jib_MEOW_inSILMEOW/Jib_SIL_inSILMEOW).toFixed(10);
            const Jib_SIL_in_CMJ = (Jib_Meow_to_SIL*CMJ_to_Meow).toFixed(10);
                


            // Bal of Meow-Gold
            address = '0x1a2a8039c4b685d47B9ef6e2C9D3aCB5aB83BCAC';
            const Jib_Gold_inGoldMEOW = await call_SC(address, Gold, 18);
            const Jib_MEOW_inGoldMEOW = await call_SC(address, Meow, 18);
            const Jib_Gold_to_Meow = (Jib_Gold_inGoldMEOW/Jib_MEOW_inGoldMEOW).toFixed(4);
            const Jib_Meow_to_Gold = (Jib_MEOW_inGoldMEOW/Jib_Gold_inGoldMEOW).toFixed(10);
            const Jib_Gold_in_CMJ = (Jib_Meow_to_Gold*CMJ_to_Meow).toFixed(10);

            // Bal of Meow-Wood
            address = '0x0E2302D286778B70F59451036207Aec484C15198';
            const Jib_Wood_inWoodMEOW = await call_SC(address, Wood, 18);
            const Jib_MEOW_inWoodMEOW = await call_SC(address, Meow, 18);
            const Jib_Wood_to_Meow = (Jib_Wood_inWoodMEOW/Jib_MEOW_inWoodMEOW).toFixed(4);
            const Jib_Meow_to_Wood = (Jib_MEOW_inWoodMEOW/Jib_Wood_inWoodMEOW).toFixed(10);
            const Jib_Wood_in_CMJ = (Jib_Meow_to_Wood*CMJ_to_Meow).toFixed(10);
                    document.getElementById("priceB4").innerHTML = Jib_Wood_in_CMJ;

           // Bal of Meow-Mice
            address = '0xcc59B348085384C1B8e4D310e53a4823aCd38653';
            const Jib_Mice_inMiceMEOW = await call_SC(address, Mice, 18);
            const Jib_MEOW_inMiceMEOW = await call_SC(address, Meow, 18);
            const Jib_Mice_to_Meow = (Jib_Mice_inMiceMEOW/Jib_MEOW_inMiceMEOW).toFixed(4);
            const Jib_Meow_to_Mice = (Jib_MEOW_inMiceMEOW/Jib_Mice_inMiceMEOW).toFixed(10);
            const Jib_Mice_in_CMJ = (Jib_Meow_to_Mice*CMJ_to_Meow).toFixed(10);
                    document.getElementById("priceB6").innerHTML = Jib_Mice_in_CMJ;
            // Bal of Meow-Tuna
            address = '0xF9C16D28E8113D0966cE060a4F8c4cFad6D87467';
            const Jib_Tuna_inTunaMEOW = await call_SC(address, Tuna, 18);
            const Jib_MEOW_inTunaMEOW = await call_SC(address, Meow, 18);
            const Jib_Tuna_to_Meow = (Jib_Tuna_inTunaMEOW/Jib_MEOW_inTunaMEOW).toFixed(4);
            const Jib_Meow_to_Tuna = (Jib_MEOW_inTunaMEOW/Jib_Tuna_inTunaMEOW).toFixed(10);
            const Jib_Tuna_in_CMJ = (Jib_Meow_to_Tuna*CMJ_to_Meow).toFixed(10);
            // Bal of Meow-Os
            address = '0x7400281C02259436CA6bbf2bcD6624E7E497ee96';
            const Jib_Os_inOsMEOW = await call_SC(address, Os, 18);
            const Jib_MEOW_inOsMEOW = await call_SC(address, Meow, 18);
            const Jib_Os_to_Meow = (Jib_Os_inOsMEOW/Jib_MEOW_inOsMEOW).toFixed(4);
            const Jib_Meow_to_Os = (Jib_MEOW_inOsMEOW/Jib_Os_inOsMEOW).toFixed(10);
            const Jib_Os_in_CMJ = (Jib_Meow_to_Os*CMJ_to_Meow).toFixed(10);

            // Bal of Meow-Mt
            address = '0xb882C5Ec427De3085127C89De4fe3ceE12b345bb';
            const Jib_Mt_inMtMEOW = await call_SC(address, Mt, 18);
            const Jib_MEOW_inMtMEOW = await call_SC(address, Meow, 18);
            const Jib_Mt_to_Meow = (Jib_Mt_inMtMEOW/Jib_MEOW_inMtMEOW).toFixed(4);
            const Jib_Meow_to_Mt = (Jib_MEOW_inMtMEOW/Jib_Mt_inMtMEOW).toFixed(10);
            const Jib_Mt_in_CMJ = (Jib_Meow_to_Mt*CMJ_to_Meow).toFixed(10);
            document.getElementById("priceB16").innerHTML = Jib_Mt_in_CMJ;

            // Bal of Meow-stOPT
            address = '0xc33ED5700B34DF55c925b4ca1791Aa0F61c6bcEd';
            const Jib_stOPT_instOPTMEOW = await call_SC(address, stOPT, 18);
            const Jib_MEOW_instOPTMEOW = await call_SC(address, Meow, 18);
            const Jib_stOPT_to_Meow = (Jib_stOPT_instOPTMEOW/Jib_MEOW_instOPTMEOW).toFixed(4);
            const Jib_Meow_to_stOPT = (Jib_MEOW_instOPTMEOW/Jib_stOPT_instOPTMEOW).toFixed(10);
            const Jib_stOPT_in_CMJ = (Jib_Meow_to_stOPT*CMJ_to_Meow).toFixed(10);


            




                // Token Value in CMJ
            const Bbq_Price = CMJ_to_BBQ;
            const Pza_Price = CMJ_to_Pza;
            const Swar_Price = SWAR_in_CMJ;
            const Wood_Price = Jib_Wood_in_CMJ;
            const Tuna_Price = Tuna_in_CMJ;
            const Mice_Price = Jib_Mice_in_CMJ;
            const Cu_Price = CMJ_to_Cu;
            const Jasp_Price = CMJ_to_Jasp;
            const Os_Price = CMJ_to_Os;
            const Jdao_Price = CMJ_to_Jdao;
            const Mt_Price = Jib_Mt_in_CMJ;
            const Gold_Price = CMJ_to_Gold;
            const Silver_Price = Jib_SIL_in_CMJ;
            const Ctuna_Price = CMJ_to_Ctuna;
            const Sx31_Price = CMJ_to_Sx31;
            const stOPT_Price = Jib_stOPT_in_CMJ;
            const Jbc_Price = JBC_to_CMJ;
            const Plat_Price = 0.0011;
                        // HOUSE  
            PoolData = await HouseStaking.methods.poolInfo(1).call();
            totalPower = parseFloat(PoolData[1]);
            rewardPerBlock = await HouseStaking.methods.rewardPerBlock().call() /10**18;
            
            document.getElementById("TotalPower").innerHTML = (totalPower.toLocaleString(undefined,{maximumFractionDigits:0}));

            RewardDebt = (1 * 10) / (10**12);
            multiplier = 2 ;
            rewardPerBlock = 140000000000000000 ; //(0.14)
            poolAllocPoint = 10;
            totalAllocPoint = 13;
            reward = (multiplier*rewardPerBlock*poolAllocPoint) / totalAllocPoint ;
            accRewardPerShare = (reward * (10**12)) / totalPower ;
            rewardPerPower = ((1 * accRewardPerShare) / (10**12)) - RewardDebt;
            FinalOSreward = rewardPerPower /(10**18);
            document.getElementById("RewardPerPower").innerHTML = (FinalOSreward*6485*0.95).toLocaleString(undefined,{maximumFractionDigits:8});
        
            //

            setLabFactory(Plat_Price,JTAO_to_II,JTAO_to_CMJ,ANGB_in_CMJ,Bbq_Price,Pza_Price,Swar_Price,Wood_Price,Tuna_Price,Mice_Price,Cu_Price,Jasp_Price,Os_Price,Jdao_Price,Mt_Price,Gold_Price,Silver_Price,Ctuna_Price,Sx31_Price,stOPT_Price,Jbc_Price);


        } catch (error) {
            console.error('Error:', error);
            console.log('An error occurred while fetching contract information.');
        }
    }
main();
function setLocal(number,maximumFractionDigits){
  return number.toLocaleString(undefined, { maximumFractionDigits : maximumFractionDigits })
}
async function call_SC(address, contract, divider) {
    try {
      const result = await contract.methods.balanceOf(address).call();
      return result / (10 ** divider); // เลื่อนการหารออกจากการเรียกใช้เพื่อความชัดเจน
    } catch (error) {
      console.error("Error calling contract method:", error);
      return null;
    }
  }


  function setLabFactory(Plat_Price,JTAO_to_II,JTAO_to_CMJ,ANGB_in_CMJ,Bbq_Price,Pza_Price,Swar_Price,Wood_Price,Tuna_Price,Mice_Price,Cu_Price,Jasp_Price,Os_Price,Jdao_Price,Mt_Price,Gold_Price,Silver_Price,Ctuna_Price,Sx31_Price,stOPT_Price,Jbc_Price){
    const JTAOPrice = parseFloat(document.getElementById("priceB22").textContent) || 0;

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
                    math2 = Mt_Price*1;
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
                    math1 = EEPrice_CMJ*888*1.05;
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
            document.getElementById("labU4").innerHTML = setLocal(minPow,0);
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
            document.getElementById("labU2").innerHTML = setLocal(minPow,0);
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

  document.getElementById("labU6").innerHTML = setLocal(minPow,0);
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
  const II_Price = parseFloat(document.getElementById("IIPrice_JTAO").textContent) || 0; // II in JTAO
  const EE_Price = parseFloat(document.getElementById("EEPrice_JTAO").textContent) || 0; // II in JTAO
  const Jtao_inUSDT = parseFloat(document.getElementById("priceD22").textContent) || 0; //
  const CMJ_inUSDT = parseFloat(document.getElementById("priceD2").textContent) || 0; // 
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

  document.getElementById("Min_Dun4").innerHTML = setLocal(minPow,0);
  document.getElementById("Cost_CMJ_Dun4").innerHTML = Math.abs(setLocal(gasFee,3));
  document.getElementById("Reward_JTAO_Dun4").innerHTML = setLocal(rwJBCPow,2);
  document.getElementById("Prof1_Dun4").innerHTML = setLocal(prof1,0);
  document.getElementById("Prof2_Dun4").innerHTML = setLocal(prof5,0);
  document.getElementById("Prof3_Dun4").innerHTML = setLocal(prof10,0);
  document.getElementById("Prof4_Dun4").innerHTML = setLocal(prof100,0);
}
}

function setUSD(){
  // ทำ HTTP GET request เพื่อดึงข้อมูลอัตราแลกเปลี่ยน USD/THB
const exchangeRateUrl = "https://api.exchangerate-api.com/v4/latest/USD";

fetch(exchangeRateUrl)
  .then(response => response.json())
  .then(data => {
    // ดึงข้อมูลอัตราแลกเปลี่ยน USD/THB
    const exchangeRate = data.rates.THB;

    // ทำ HTTP GET request เพื่อดึงข้อมูล price_usd จาก API ที่กำหนด
    const tokenUrl = "https://api.geckoterminal.com/api/v2/networks/bitkub_chain/tokens/0x67ebd850304c70d983b2d1b93ea79c7cd6c3f6b5";

    return fetch(tokenUrl)
      .then(response => response.json())
      .then(data => {
        // ดึงข้อมูล price_usd และแปลงเป็นบาท
        const priceUsd = parseFloat(data.data.attributes.price_usd);
        const priceThb = priceUsd * exchangeRate;
        document.getElementById("usdTHB").innerHTML = exchangeRate;

        // แสดงผลลัพธ์ใน HTML
      });
  })
  .catch(error => {
    console.error('เกิดข้อผิดพลาด:', error);
    document.getElementById("KUBTHB").textContent = "ไม่สามารถดึงข้อมูลได้";
  });

// เรียกใช้งาน API
fetch('https://api.geckoterminal.com/api/v2/networks/bitkub_chain/tokens/0x6527d3d38a7ff4e62f98fe27dd9242a36227fe23/pools?include=base_token_price_usd&page=1')
    .then(response => response.json())
    .then(data => {
        // ค้นหาข้อมูลที่ต้องการและแสดงผล
        const pools = data.data;
        pools.forEach(pool => {
            if (pool.id === 'bitkub_chain_0x0969c9d1786c8e570f5955eed7acb4c6aebe2c08') {
                TaoPrice = parseFloat(pool.attributes.token_price_usd)
                document.getElementById('priceD22').innerText = `${TaoPrice.toFixed(8)}`;
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}

window.addEventListener('load', function() {
setUSD()

});

  document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('multiPowerBtn');
    var powerInput = document.getElementById('powerBox');
    var inputs = document.querySelectorAll('p[id^="input"]');

    button.addEventListener('click', function() {
      if (button.classList.contains('active')) {
        powerInput.style.display = 'block';
        inputs.forEach(function(input) {
          input.style.display = 'none';
        });
        button.classList.remove('active');
      } else {
        powerInput.style.display = 'none';
        inputs.forEach(function(input) {
          input.style.display = 'block';
        });
        button.classList.add('active');
      }
    });
  });
  document.addEventListener('DOMContentLoaded', function() {
    var toggleInfoButton = document.getElementById('toggleInfoBtn');
    var infoDiv = document.getElementById('infoDiv');

    toggleInfoButton.addEventListener('click', function() {
      // เมื่อคลิกที่ปุ่ม Toggle Info
      if (infoDiv.style.display === 'none') {
        infoDiv.style.display = 'flex'; // แสดง div ถ้ามันถูกซ่อนอยู่
      } else {
        infoDiv.style.display = 'none'; // ซ่อน div ถ้ามันถูกแสดงอยู่
      }
    });
  });
