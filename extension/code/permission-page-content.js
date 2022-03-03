// Good practice to define keys as constants
var DATA_ROOT = "apps";
var APP_NAME = "appName";
var APP_ICON = "appIcon";
var APP_TIMESTAMP = "appInstallTimestamp";
var APP_HOMEPAGE = "appHomepage";
var APP_PERMISSIONS = "appPermissions";
var APP_PERMISSION_TITLE = "appPermissionTitle";
var APP_PERMISSION_DETAIL = "appPermissionDetail";
var APP_PERMISSION_ICON = "appPermissionIcon";
/*
 * This JavaScript file contains code that will be run when the Google My Account page is loaded
 */

// Function to activate the my account tab content.
function activateMyAccountTabContent() {
    /** 
     * Turn off all the clickable items other than the part
     * where expend apps reveals detailed access.
     */
    let style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule('.U26fgb {pointer-events: none;}');
    style.sheet.insertRule('.oNu23d {pointer-events: none;}');
    style.sheet.insertRule('.ow0aJf {pointer-events: none;}');
    style.sheet.insertRule('.ei7k9d {pointer-events: none;}');
    style.sheet.insertRule('.urYcCd {pointer-events: none;}');
    style.sheet.insertRule('.OcFGjf {pointer-events: none;}');

    style.sheet.insertRule('.gpLzmc {visibility: hidden;}');

    // Weird Toggle Disabled
    style.sheet.insertRule('.VfPpkd-e9dDuf-bMcfAe {pointer-events: none;}');

    // Function to return the document height.
    function getDocHeight() {
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    }

    /*
     * Add a blue banner at the top of the Google My Account Page with a countdown timer.
     * When the timer expires we will close the tab/page or redirect back to the survey.
     */

    // Create a banner.
    let htmlText = `
    <div style="text-align: center; z-index: 999; position: fixed; top: 0; left: 0; background-color: #033C5ADD; width: 100%; padding: 10px;">
        <span id="timeout" style="font-size: 20px; color:#FFFFFF; font-family: \u0022AvenirLTStd-Roman\u0022, Helvetica, Arial, sans-serif;">
            Do not close this tab. This tab will close automatically after one minute.
        </span>
        <br/>
        <span id="interactMessage"
            style="font-size: 20px; color:#FFFFFF; font-family: \u0022AvenirLTStd-Roman\u0022, Helvetica, Arial, sans-serif;">
            Clicking on each app will reveal detailed accesses.
        </span>
    </div>
    <img style="z-index: 999; position: fixed; top: 20px; left: 15px;"
         src="https://creativeservices.gwu.edu/sites/g/files/zaxdzs2746/f/downloads/gw_monogram_2c_rev.png"
         alt="GW monogram logo" width="35"/>
    <div id="closeTabDiv"
         style="text-align: center; top: 25%; left: 50%; transform: translateX(-50%); display:none; position: fixed; z-index: 1; padding: 20px; background-color: #033C5ADD; font-size: 22px; color:#FFFFFF; font-family: \u0022AvenirLTStd-Roman\u0022, Helvetica, Arial, sans-serif;">
        This tab will now close. Please return to survey.
    </div>
    <div id="clickingOffDiv"
         style="text-align: center; top: 25%; left: 50%; transform: translateX(-50%); display:none; position: fixed; z-index: 1; padding: 20px; background-color: #033C5ADD; font-size: 22px; color:#FFFFFF; font-family: \u0022AvenirLTStd-Roman\u0022, Helvetica, Arial, sans-serif;">
        Please scroll down to view all of your authorized applications.
    </div>
    `;

    // Create a new div to store the banner html in.
    let div = document.createElement('div');

    // Set the banner in the inner html.
    div.innerHTML = htmlText;

    // Append the banner div to the Google My Account page.
    document.body.appendChild(div);

    // 1 minute in milliseconds.
    let timeoutInMilliseconds = (60 * 1000);

    // Set the time that we are counting down to.
    let countDownTime = new Date().getTime() + timeoutInMilliseconds;
    console.log(countDownTime);

    // Show the clicking is off div.
    let clickingOffDiv = document.getElementById('clickingOffDiv');
    if (clickingOffDiv) {
        clickingOffDiv.style.display = 'block';
    }

    // Update the span element with id="timeout" every 30 seconds.
    let countDownMessageInterval = setInterval(function() {
        let minLeft = Math.round(((countDownTime - new Date().getTime()) % (1000 * 60 * 60)) / (1000 * 60));
        document
            .getElementById('timeout')
            .textContent = `Do not close this tab. This tab will close automatically after ${minLeft > 0 ? 'one minute' : 'thirty seconds'}.`;
    }, 30 * 1000);

    // Show the close tab div with 5 seconds remaining.
    setTimeout(function() {
        let closeTabDiv = document.getElementById('closeTabDiv');
        if (closeTabDiv) {
            closeTabDiv.style.display = 'block';
        }
        document
            .getElementById('timeout')
            .innerHTML = 'This tab will now close. Please return to the survey.';
    }, timeoutInMilliseconds - (5 * 1000));


    // Hide the clicking off div after 5 seconds.
    setTimeout(function() {
        let clickingOffDiv = document.getElementById('clickingOffDiv');
        if (clickingOffDiv) {
            clickingOffDiv.style.display = 'none';
        }
    }, 5 * 1000);

    // // If the count down is over close the Google MyAccount tab.
    setTimeout(function() {
        // Stop interval timers.
        clearInterval(countDownMessageInterval);

        // Send the close tab message to be processed by the background js.
        // Tabs must be closed in a background JavaScript because of a browser restriction.
        // Send the My Account exploration related data.
        chrome.runtime.sendMessage({
            type: 'CLOSE_MY_ACCOUNT_PAGE_TAB',
            tabUrl: window.location.href.toString(),
        });
    }, timeoutInMilliseconds);
}

// Listen to messages from the background script.
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // Only accept messages from our background script, no windows or tabs.
        if (sender.tab === undefined) {
            switch (request.type) {
                case 'ACTIVATE_MY_ACCOUNT_PAGE_CONTENT':
                    // Start the my account page exploration content.
                    activateMyAccountTabContent();

                    let SSOJSON = getSSOServices();
                    chrome.runtime.sendMessage({
                        type: 'SEND_SSO_JSON',
                        SSOJSON: SSOJSON
                    });
                    let TPJSON = getTPServices();
                    chrome.runtime.sendMessage({
                        type: 'SEND_TP_JSON',
                        TPJSON: TPJSON
                    });

                    break;
            }
        }
    });

/**
 * Function to get all SSO apps' data.
 *
 * @returns {Promise<string>} all SSO apps' data.
 */
function getSSOServices() {
    servicesTemp = document.evaluate('/html/body/script[8]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
    services = JSON.parse(servicesTemp.substring(servicesTemp.indexOf("["), servicesTemp.lastIndexOf(",")));
    SSOJSON = extractAppData(services[4][2]);
    return SSOJSON;
}

/**
 * Function to get all SSO apps' data.
 *
 * @returns {Promise<string>} all TP apps' data.
 */
function getTPServices() {
    servicesTemp = document.evaluate('/html/body/script[8]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
    services = JSON.parse(servicesTemp.substring(servicesTemp.indexOf("["), servicesTemp.lastIndexOf(",")));
    TPJSON = extractAppData(services[4][1]);
    return TPJSON;
}

// Helper method to extract detailed info about authorized apps
function extractAppData(inputJSON) {
    // Iterate through all apps
    var appData = {};
    appData[DATA_ROOT] = [];

    for (var i = 0; i < inputJSON.length; i++) {
        // An object representing this app. Useful for transmission and analysis.
        var thisApp = {}

        var appName = inputJSON[i][1];
        thisApp[APP_NAME] = appName;

        var appIcon = inputJSON[i][2];
        thisApp[APP_ICON] = appIcon;

        var appInstallTime = inputJSON[i][3];
        thisApp[APP_TIMESTAMP] = appInstallTime;

        var appHomepage = inputJSON[i][13];
        thisApp[APP_HOMEPAGE] = appHomepage;

        // Iterate through all the API services accessed
        var appPermissions = [];
        var accesses = inputJSON[i][99];
        // Flag to distinguish between Basic Account Info and Additional Access
        var BAIvsAA = 0;
        for (var j = 0; j < accesses.length; j++) {
            var apiPermission = {};
            var apiService = accesses[j][1];
            var apiPermissionIcon = accesses[j][2];
            if (apiService === null && BAIvsAA === 0) {
                // Basic account info does not have field name.
                // Neither does "Additional access." Handle this more gracefully.
                apiService = "Basic account info";
                BAIvsAA++;
            } else if (apiService === null) {
                apiService = "Additional access";
            }

            var permissions = accesses[j][99];
            apiPermission[APP_PERMISSION_TITLE] = apiService;
            apiPermission[APP_PERMISSION_DETAIL] = permissions;
            apiPermission[APP_PERMISSION_ICON] = apiPermissionIcon;

            // Store the permissions, keyed to the access category. Handle
            // repeat keys (e.g., "Basic account info / Additional access") specially
            var existingPermissionIndex = permissionExists(appPermissions, apiService)
            if (existingPermissionIndex === -1) {
                appPermissions.push(apiPermission);
            } else {
                var combined = appPermissions[existingPermissionIndex][APP_PERMISSION_DETAIL].concat(permissions);
                appPermissions[existingPermissionIndex][APP_PERMISSION_DETAIL] = combined;
            }
        }
        thisApp[APP_PERMISSIONS] = appPermissions;

        appData[DATA_ROOT].push(thisApp);
    }

    return appData;
}

function permissionExists(inputJSON, permissionToFind) {
    for (i = 0; i < inputJSON.length; i++) {
        if (inputJSON[i][APP_PERMISSION_TITLE] === permissionToFind) {
            return i;
        }
    }
    return -1;
}