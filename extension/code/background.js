// Good practice to define keys as constants
var DATA_ROOT = "apps";
var APP_NAME = "appName";
var APP_ICON = "appIcon";
var APP_TIMESTAMP = "appInstallTimestamp";
var APP_HOMEPAGE = "appHomepage";
var APP_PERMISSIONS = "appPermissions";
var APP_PERMISSION_TITLE = "appPermissionTitle";
var APP_PERMISSION_DETAIL = "appPermissionDetail";

var oldestAppIndex = 0;
var newestAppIndex = 0;

// Only force execute the content script if the browser is Chrome
// Cannot use window.chrome to detect chrome or not because window
// does not exist in background script
if (typeof chrome !== "undefined" && typeof browser === "undefined") {
    // When the browser extension is initially installed, run the content script in the main-survey tab.
    chrome.tabs.query({}, function(tabs) {
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].url.includes('main-survey')) {
                chrome.tabs.executeScript(tabs[i].id, { file: 'content.js' });
            }
        }
    });
}

// Function to send the error messages to the main survey content script.
function sendErrorMessage(errorMessage) {
    chrome.tabs.query({}, function(tabs) {
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].url.includes('main-survey')) {
                // Send a message to the main survey content script to store the error message.
                chrome.tabs.sendMessage(tabs[i].id, { type: 'STORE_ERROR_MESSAGE', errorMessage: errorMessage });
            }
        }
    });
}

// Function to fetch a URL.
async function fetchByURL(url) {
    return await fetch(url, { mode: 'no-cors' });
}

// Variable to hold the array of session ids.  This is used to restrict each survey session to one countdown timer.
let sessionIdArray = [];

// Variable to hold the my account tab.
let myAccountTab;

// Variable to hold all service information
let SSOJSON, TPJSON;

// Function to manage the my account tab launch.
function launchMyAccountTab(sessionId, authuserID) {
    // The my account bundle view url.
    const myAccountURL = `https://myaccount.google.com/u/${authuserID}/permissions`;

    // Check whether the my account tab exists or not.
    if (myAccountTab === undefined) {
        // If the my account tab does not exist: Create the my account tab and corresponding listeners.
        chrome.tabs.create({ url: myAccountURL }, (tab) => {
            myAccountTab = tab;

            // Register the listeners.
            chrome.tabs.onRemoved.addListener((tabId) => {
                if (myAccountTab && tabId === myAccountTab.id) {
                    myAccountTab = undefined;
                }
            });

            let callOnceFlag = 0;
            chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
                // If the my account page tab has completed loading then execute the content script.
                if (myAccountTab && tabId === myAccountTab.id && changeInfo.status === 'complete' && callOnceFlag == 0) {
                    // Send a message to the my account page content script to activate my account page banner.
                    chrome.tabs.sendMessage(tabId, { type: 'ACTIVATE_MY_ACCOUNT_PAGE_CONTENT' })
                    callOnceFlag = 1;

                    /**
                     * Commenting out the part below because we have disabled the launch button
                     * after the user clicks it once. Thus, no need to check if a specific
                     * sessionId has already launched the page.
                     */
                    // // If the session id has not been added to the session id array,
                    // // then add the session id to the array and start the count down timer.
                    // if (!sessionIdArray.includes(sessionId)) {
                    //     // Add the session id to the session id array.
                    //     sessionIdArray.push(sessionId);

                    //     // // Start the count down timer.
                    //     // startCountDownTimer();
                    // }

                    // Start the count down timer.
                    startCountDownTimer();
                }
            });
        });
    } else {
        // If the my account tab does exist activate it.
        chrome.tabs.update(myAccountTab.id, { active: true }, () => {});
    }
}

// Function to update a count down data attribute.
function startCountDownTimer() {
    // 1 minutes in milliseconds.
    let timeoutInMilliseconds = 1 * 60 * 1000;

    // Update and display the time left for exploring the My Account page
    let updateTimer = (timeLeft) => {
        // Tell the content script to start a count down timer.
        chrome.tabs.query({}, function(tabs) {
            for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].url.includes('main-survey')) {
                    // Send a message to the main survey content script to start a count down timer.
                    let message = {
                        type: 'STORE_COUNT_DOWN_TIMER',
                        timeLeft: timeLeft
                    }
                    chrome.tabs.sendMessage(tabs[i].id, message);
                }
            }
        });
    };

    // Initialize timer
    updateTimer(timeoutInMilliseconds);

    // Calculate timestamp for timeout
    let endTime = new Date().getTime() + timeoutInMilliseconds;

    // Update the count down timer every second.
    let countDownInterval = setInterval(function() {
        updateTimer(endTime - new Date().getTime());
    }, 1000);

    // Clear the interval timer.
    setTimeout(function() {
        clearInterval(countDownInterval);
    }, timeoutInMilliseconds);
}

// Function to find the index of the oldest app
function findOldestAppIndex(inputJSON) {
    let oldestAppTime = 8640000000000000 // Maximum date
    let ret = 0;
    for (let i = 0; i < inputJSON.length; i++) {
        let currentAppTime = inputJSON[i][APP_TIMESTAMP];
        if (currentAppTime < oldestAppTime) {
            oldestAppTime = currentAppTime;
            ret = i;
        }
    }
    return ret;
}

// Function to find the index of the newest app
function findNewestAppIndex(inputJSON) {
    let newestAppTime = 0 // Maximum date
    let ret = 0;
    for (let i = 0; i < inputJSON.length; i++) {
        let currentAppTime = inputJSON[i][APP_TIMESTAMP];
        if (currentAppTime > newestAppTime) {
            newestAppTime = currentAppTime;
            ret = i;
        }
    }
    return ret;
}

/**
 * Function to get all the data for any SSO apps
 *
 * @returns {Promise<string>} the data of all SSO apps
 */
async function getSSOAccess() {
    var appsJSON = SSOJSON[DATA_ROOT];

    return JSON.stringify(appsJSON);
}

/**
 * Function to get all the data for any Third Party apps
 *
 * @returns {Promise<string>} the data of all TP apps
 */
async function getTPAccess() {
    var appsJSON = TPJSON[DATA_ROOT];
    oldestAppIndex = findOldestAppIndex(appsJSON);
    newestAppIndex = findNewestAppIndex(appsJSON);
    return JSON.stringify(appsJSON);
}

/**
 * Function to get all the data of the oldest Third Party app authorized.
 *
 * @returns {Promise<string>} the data of oldest app
 */
async function getOldestAccess() {
    var appsJSON = TPJSON[DATA_ROOT];
    var oldestAppJSON = appsJSON[oldestAppIndex];

    let returnJSON = {};
    returnJSON[APP_HOMEPAGE] = oldestAppJSON[APP_HOMEPAGE];
    returnJSON[APP_TIMESTAMP] = oldestAppJSON[APP_TIMESTAMP];
    returnJSON[APP_NAME] = oldestAppJSON[APP_NAME];
    returnJSON[APP_ICON] = oldestAppJSON[APP_ICON];
    returnJSON[APP_PERMISSIONS] = oldestAppJSON[APP_PERMISSIONS];

    return JSON.stringify(returnJSON);
}

/**
 * Function to get all the data of the newest Third Party app authorized.
 *
 * @returns {Promise<string>} the data of newest app
 */
async function getNewestAccess() {
    var appsJSON = TPJSON[DATA_ROOT];
    var newestAppJSON = appsJSON[newestAppIndex];

    var numApps = TPJSON[DATA_ROOT].length;
    if (numApps > 1) {
        let returnJSON = {};
        returnJSON[APP_HOMEPAGE] = newestAppJSON[APP_HOMEPAGE];
        returnJSON[APP_TIMESTAMP] = newestAppJSON[APP_TIMESTAMP];
        returnJSON[APP_NAME] = newestAppJSON[APP_NAME];
        returnJSON[APP_ICON] = newestAppJSON[APP_ICON];
        returnJSON[APP_PERMISSIONS] = newestAppJSON[APP_PERMISSIONS];

        return JSON.stringify(returnJSON);
    } else {
        return;
    }
}

/**
 * Function to get all the data of the random Third Party app authorized.
 *
 * @returns {Promise<string>} the data of random app
 */
async function getRandomAccess() {
    var appsJSON = TPJSON[DATA_ROOT];
    var numApps = TPJSON[DATA_ROOT].length;
    if (numApps > 2) {
        var randomNumber = Math.floor(Math.random() * (numApps - 1));
        while (randomNumber === oldestAppIndex || randomNumber === newestAppIndex) {
            randomNumber = Math.floor(Math.random() * (numApps - 1));
        }
        var randomAppJSON = appsJSON[randomNumber];

        let returnJSON = {};
        returnJSON[APP_HOMEPAGE] = randomAppJSON[APP_HOMEPAGE];
        returnJSON[APP_TIMESTAMP] = randomAppJSON[APP_TIMESTAMP];
        returnJSON[APP_NAME] = randomAppJSON[APP_NAME];
        returnJSON[APP_ICON] = randomAppJSON[APP_ICON];
        returnJSON[APP_PERMISSIONS] = randomAppJSON[APP_PERMISSIONS];

        return JSON.stringify(returnJSON);
    } else {
        return;
    }
}

/******************************************************************************
 * Listeners
 *****************************************************************************/
// Add a listener for processing background url requests without asynchronous response function.
chrome.runtime.onMessage.addListener(function(request) {
    switch (request.type) {
        // If this is a close tab request, find the tab id for the given tab url and close that tab.
        case 'CLOSE_MY_ACCOUNT_PAGE_TAB':
            // Close the My Account page tab.
            chrome.tabs.query({}, function(tabs) {
                for (let i = 0; i < tabs.length; i++) {
                    if (tabs[i].url === request.tabUrl) {
                        chrome.tabs.remove(tabs[i].id);
                    } else if (tabs[i].url.includes('main-survey')) {
                        // Switch back to the main-survey tab.
                        chrome.tabs.update(tabs[i].id, { active: true });
                    }
                }
            });
            break;
        case 'SEND_SSO_JSON':
            SSOJSON = request.SSOJSON;
            break;
        case 'SEND_TP_JSON':
            TPJSON = request.TPJSON;
            break;
        case 'LAUNCH_MY_ACCOUNT_PAGE':
            // Launch the My Account tab.
            // console.log("msg received");
            launchMyAccountTab(request.sessionId, request.authuserID);
            break;
        case 'GET_SSO_DATA':
            // Pass in the class names used in parsing the My Account document object model.
            // classNames = request.classNames;
            // Get Google SSO services
            getSSOAccess()
                // Return the oldestAccessDate as a text response
                .then(SSOData => {
                    chrome.tabs.query({}, function(tabs) {
                        for (let i = 0; i < tabs.length; i++) {
                            if (tabs[i].url.includes('main-survey')) {
                                // Send a message to the main survey content script to store the oldest activity data.
                                let message = {
                                    type: 'STORE_SSO_DATA',
                                    SSOData: SSOData
                                };
                                chrome.tabs.sendMessage(tabs[i].id, message);
                            }
                        }
                    });
                })
                .catch(error => sendErrorMessage(error));
            break;
        case 'GET_TP_DATA':
            // Pass in the class names used in parsing the My Account document object model.
            // classNames = request.classNames;
            // Get Google SSO services
            getTPAccess()
                // Return the oldestAccessDate as a text response
                .then(TPData => {
                    chrome.tabs.query({}, function(tabs) {
                        for (let i = 0; i < tabs.length; i++) {
                            if (tabs[i].url.includes('main-survey')) {
                                // Send a message to the main survey content script to store the oldest activity data.
                                let message = {
                                    type: 'STORE_TP_DATA',
                                    TPData: TPData
                                };
                                chrome.tabs.sendMessage(tabs[i].id, message);
                            }
                        }
                    });
                })
                .catch(error => sendErrorMessage(error));
            break;
        case 'GET_OLDEST_APP_DATA':
            // Pass in the class names used in parsing the My Account document object model.
            classNames = request.classNames;
            // Get Google oldest app
            getOldestAccess()
                // Return the oldestAccessDate as a text response
                .then(oldestAppData => {
                    chrome.tabs.query({}, function(tabs) {
                        for (let i = 0; i < tabs.length; i++) {
                            if (tabs[i].url.includes('main-survey')) {
                                // Send a message to the main survey content script to store the oldest activity data.
                                let message = {
                                    type: 'STORE_OLDEST_APP_DATA',
                                    oldestAppData: oldestAppData
                                };
                                chrome.tabs.sendMessage(tabs[i].id, message);
                            }
                        }
                    });
                })
                .catch(error => sendErrorMessage(error));
            break;
        case 'GET_NEWEST_APP_DATA':
            // Pass in the class names used in parsing the My Account document object model.
            classNames = request.classNames;
            // Get Google oldest Account date
            getNewestAccess()
                // Return the oldestAccessDate as a text response
                .then(newestAppData => {
                    chrome.tabs.query({}, function(tabs) {
                        for (let i = 0; i < tabs.length; i++) {
                            if (tabs[i].url.includes('main-survey')) {
                                // Send a message to the main survey content script to store the oldest activity data.
                                let message = {
                                    type: 'STORE_NEWEST_APP_DATA',
                                    newestAppData: newestAppData
                                };
                                chrome.tabs.sendMessage(tabs[i].id, message);
                            }
                        }
                    });
                })
                .catch(error => sendErrorMessage(error));
            break;
        case 'GET_RANDOM_APP_DATA':
            // Pass in the class names used in parsing the My Account document object model.
            classNames = request.classNames;
            // Get Google oldest Account date
            getRandomAccess()
                // Return the oldestAccessDate as a text response
                .then(randomAppData => {
                    chrome.tabs.query({}, function(tabs) {
                        for (let i = 0; i < tabs.length; i++) {
                            if (tabs[i].url.includes('main-survey')) {
                                // Send a message to the main survey content script to store the oldest activity data.
                                let message = {
                                    type: 'STORE_RANDOM_APP_DATA',
                                    randomAppData: randomAppData
                                };
                                chrome.tabs.sendMessage(tabs[i].id, message);
                            }
                        }
                    });
                })
                .catch(error => sendErrorMessage(error));
            break;
        case 'GET_VERSION_NUMBER':
            // Return the version number of the extension.
            chrome.tabs.query({}, function(tabs) {
                for (let i = 0; i < tabs.length; i++) {
                    if (tabs[i].url.includes('main-survey')) {
                        // Send a message to the main survey content script to store the browser version number.
                        let message = {
                            type: 'STORE_VERSION_NUMBER',
                            browserExtensionVersion: chrome.runtime.getManifest().version
                        }
                        chrome.tabs.sendMessage(tabs[i].id, message);
                    }
                }
            });
            break;
        case 'COMMAND_UNINSTALL_EXTENSION':
            // Uninstall this browser extension.
            chrome.management.uninstallSelf();
            break;
    }
    return false;
});