// Function to generate a random string used in the root page for generating Prolific IDs.
function generateRandomProlificId() {
    let mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let length = 24;
    let result = '';

    for (let i = length; i > 0; --i) {
        result += mask[Math.floor(Math.random() * mask.length)];
    }

    return result;
}

function deleteCookieByName(cookieName, path) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=" + path + ";";
}

$(document).ready(function() {
    document.getElementById("pre-survey")
        .href = "/pre-survey?PROLIFIC_PID=" +
        generateRandomProlificId() +
        "&STUDY_ID=presurvey0123456789&SESSION_ID=" +
        generateRandomProlificId() +
        "&PROLIFIC_CC=1A2B3456";

    document.getElementById("main-survey")
        .href = "/main-survey?PROLIFIC_PID=" +
        generateRandomProlificId() +
        "&STUDY_ID=mainsurvey0123456789&SESSION_ID=" +
        generateRandomProlificId() +
        "&PROLIFIC_CC=1A2B3456";

    // Delete old study cookies
    deleteCookieByName('apipriv-study-prolific-session-id', '/');
    deleteCookieByName('apipriv-study-uuid', '/');
    deleteCookieByName('api-priv-pre-survey', 'pre-survey');
    deleteCookieByName('api-priv-main-survey', 'main-survey');

    // Clear the local storage.
    window.localStorage.clear();
});