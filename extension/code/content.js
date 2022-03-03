/*
 * This JavaScript file contains code that works with the main-survey web page content.
 */

// When the browser extension is loaded set the version number.
chrome.runtime.sendMessage({ type: 'GET_VERSION_NUMBER' });

function getArticleDataset() {
    // Get the article tag that contains the data set for the survey.
    let article = document.querySelector('#surveyArticle');
    // console.log(article.dataset);
    return article.dataset;
}

// Function to get the class names used when parsing activity data.
function getClassNames() {
    let articleDataset = getArticleDataset();

    return {};
}

function getSSOData() {
    // Setup the data for the message to the background script.
    let message = { type: 'GET_SSO_DATA', classNames: getClassNames() };

    // Send the message to the background script.
    chrome.runtime.sendMessage(message);
}

function getTPData() {
    // Setup the data for the message to the background script.
    let message = { type: 'GET_TP_DATA', classNames: getClassNames() };

    // Send the message to the background script.
    chrome.runtime.sendMessage(message);
}

// Function that will message the browser extension background script and load the oldest activity data.
function getOldestAppData() {
    // Setup the data for the message to the background script.
    let message = { type: 'GET_OLDEST_APP_DATA', classNames: getClassNames() };

    // Send the message to the background script.
    chrome.runtime.sendMessage(message);
}

// Function that will message the browser extension background script and load the newest activity data.
function getNewestAppData() {
    // Setup the data for the message to the background script.
    let message = { type: 'GET_NEWEST_APP_DATA', classNames: getClassNames() };

    // Send the message to the background script.
    chrome.runtime.sendMessage(message);
}

// Function that will message the browser extension background script and load the newest activity data.
function getRandomAppData() {
    // Setup the data for the message to the background script.
    let message = { type: 'GET_RANDOM_APP_DATA', classNames: getClassNames() };

    // Send the message to the background script.
    chrome.runtime.sendMessage(message);
}

// Listen to messages from the background script.
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // Only accept messages from our background script, no windows or tabs.
        if (sender.tab === undefined) {
            let articleDataset = getArticleDataset();

            switch (request.type) {
                case 'STORE_ERROR_MESSAGE':
                    if (articleDataset.errorMessage) {
                        articleDataset.errorMessage = `${articleDataset.errorMessage}    ${request.errorMessage}`;
                    } else {
                        articleDataset.errorMessage = request.errorMessage;
                    }
                    break;
                case 'STORE_VERSION_NUMBER':
                    articleDataset.browserExtensionVersion = request.browserExtensionVersion;
                    break;
                case 'STORE_TP_DATA':
                    articleDataset.tpdata = request.TPData;
                case 'STORE_SSO_DATA':
                    articleDataset.ssodata = request.SSOData;
                case 'STORE_OLDEST_APP_DATA':
                    articleDataset.oldestAppData = request.oldestAppData;
                    break;
                case 'STORE_NEWEST_APP_DATA':
                    articleDataset.newestAppData = request.newestAppData;
                    break;
                case 'STORE_RANDOM_APP_DATA':
                    articleDataset.randomAppData = request.randomAppData;
                    break;
                case 'STORE_COUNT_DOWN_TIMER':
                    articleDataset.countDownTimer = request.timeLeft;
                    break;
            }
        }
    });


window.addEventListener('GET_MY_ACCOUNT_SSO_APP', function(event) {
    // Get all SSO apps data
    getSSOData();
}, false);

window.addEventListener('GET_MY_ACCOUNT_TP_APP', function(event) {
    // Get all TP apps data
    getTPData();
}, false);

window.addEventListener('GET_MY_ACCOUNT_OLDEST_APP', function(event) {
    // Get the oldest app's data
    getOldestAppData();
}, false);

window.addEventListener('GET_MY_ACCOUNT_NEWEST_APP', function(event) {
    // Get the newest app's data
    getNewestAppData();
}, false);

window.addEventListener('GET_MY_ACCOUNT_RANDOM_APP', function(event) {
    // Get the random app's data
    getRandomAppData();
}, false);

// Open the my account permissions page
window.addEventListener('LAUNCH_MY_ACCOUNT_PAGE', function(event) {
    chrome.runtime.sendMessage(event.detail);
}, false);

// Listener for the browser extension uninstall message.
window.addEventListener('COMMAND_UNINSTALL_EXTENSION', function(event) {
    chrome.runtime.sendMessage(event.detail);
}, false);