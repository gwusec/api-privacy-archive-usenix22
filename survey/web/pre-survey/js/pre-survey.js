// This JavaScript file contains the script functions for the pre-survey index.html file.

// The completionCode for the pre-survey
const completionCode = "123ABCD";

// Name of the locale storage to store the survey progress
const localStorageName = "api-priv-pre-survey";
const localStorageAuthIDName = "api-priv-pre-authid";

// A toggle boolean that records google login.
let isSignedIn = false;

// Record id of logged in user
let authuserID = 0;
let SSOOrGeneric = 0;


// Function that will be called to render the Google sign-in button.
function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });

}

// Function to be called to modify the Google Sign In page.
function googleSignInComplete(googleUser) {

    let userEmail = googleUser.getBasicProfile().getEmail();
    authuserID = googleUser.getAuthResponse().session_state.extraQueryParams.authuser;
    SSOOrGeneric = 1;

    // Add the user email address to the signed in button.
    document.getElementById('signedInAs').innerHTML =
        '<span class="gmailSignedInText">as <u>' +
        userEmail + '</u></span>' +
        '<img class="gmailImage" src="' + googleUser.getBasicProfile().getImageUrl() + '" alt=""/>';

    // Change the please click sign in paragraph.
    document.getElementById("pleaseClickSignInParagraph").innerText =
        'You are currently signed in to a Google account. If this is not your primary Google account, logout of the account and change into your primary Google account now.';

    isSignedIn = true;
    survey.setValue('isSignedIn', 'true');

    survey.setValue('SSOEmailAddress', userEmail);

    // Setup the sign-in state change listener.
    gapi.load('auth2', function() {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        let auth2 = gapi.auth2.init({
            client_id: '353069496362-4a8fuq2fs5crocmm1eaqqnm0bgn9m4mq.apps.googleusercontent.com'
        });

        // Listen for sign-in state changes.
        auth2.isSignedIn.listen(afterSignIn);
    });
}

// Registers listeners for events fired by the survey model
function registerSurveyListener(survey) {
    // Add an on complete function.
    survey
        .onComplete
        .add(function(result) {
            let resultsJSON = result.data;
            if (SSOOrGeneric === 0) {
                try {
                    document.getElementById("revisitPermissions").hidden = true;
                } catch {}
            }
            // Add a timestamp to the results.
            resultsJSON.timestamp = getCurrentDateTime();

            // Get rid of user email upon sending result
            delete resultsJSON.SSOEmailAddress;

            // Add the uuid to the results.
            resultsJSON.uuid = getCookieValueByName(uuidCookieName);
            resultsJSON.prolificId = $("#submitted-prolific-pid").val();
            resultsJSON.studyId = studyId;
            if (survey.getValue("hasWithdrawn") !== 'true') {
                resultsJSON.presurvey_complete = true;
            }
            // document.querySelector('#surveyResult').textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);

            // Get the session id from the cookie.
            let sessionId = getCookieValueByName(sessionIdCookieName);

            console.log(resultsJSON);

            // POST the survey results to the server for processing.
            $.ajax({
                type: "POST",
                url: "http://localhost:8000/api/presurvey/",
                data: JSON.stringify(resultsJSON, null, 3),
                dataType: "json",
                success: function(data, jqXHR) {
                    // Success handler
                    console.log(data);
                },
                error: function(data, jqXHR) {
                    // Error handler
                    logErrorMessage(data + "  " + jqXHR);
                }
            });

        });

    // Add an on complete function.
    survey
        .onPartialSend
        .add(function(result) {
            let resultsJSON = result.data;

            // Add a timestamp to the results.
            resultsJSON.timestamp = getCurrentDateTime();

            // Add the uuid to the results.
            resultsJSON.uuid = getCookieValueByName(uuidCookieName);
            resultsJSON.prolificId = $("#submitted-prolific-pid").val();
            resultsJSON.studyId = studyId;
            resultsJSON.presurvey_complete = false;
            // document.querySelector('#surveyResult').textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);

            // Get rid of user email upon sending result
            delete resultsJSON.SSOEmailAddress;

            // Get the session id from the cookie.
            let sessionId = getCookieValueByName(sessionIdCookieName);

            // POST the survey results to the server for processing.
            $.ajax({
                type: "POST",
                url: "http://localhost:8000/api/presurvey/",
                data: JSON.stringify(resultsJSON, null, 3),
                dataType: "json",
                success: function(data, jqXHR) {
                    // Success handler
                    console.log(data);
                },
                error: function(data, jqXHR) {
                    // Error handler
                    logErrorMessage(data + "  " + jqXHR);
                }
            });

        });

    survey
        .onAfterRenderPage
        .add(function(survey) {
            // Restore navigation Button state on each page
            survey.showNavigationButtons = true;

            // let resultsJSON = JSON.stringify(survey.data, null, 3);
            // document.querySelector('#surveyResult').textContent = "Result JSON:\n" + resultsJSON;

            if (survey.currentPage.name === 'GoogleSSOPage') {
                // Hide the navigation until sign-in.
                survey.showNavigationButtons = false;

                if (survey.getValue("PrimaryEmail") === "No, I use a different Gmail (Google) account as my primary account") {
                    survey.showNavigationButtons = false;
                    document.getElementById("signInPrimaryNotice").style.display = "block";
                }

                if ((isSignedIn && survey.getValue("PrimaryEmail") === "Yes")) {
                    // Turn on the next button.
                    survey.showNavigationButtons = true;
                }
            } else if (survey.currentPage.name === 'GoogleScreeningPage') {
                document.getElementById("linkToPermissions").href = `https://myaccount.google.com/u/${authuserID}/permissions`;
            } else if (survey.currentPage.name === 'PreLaunchMyAccountPage') {
                survey.showNavigationButtons = false;
                document.getElementById("openPermissionsPage").href = `https://myaccount.google.com/u/${authuserID}/permissions`;
                document.getElementById("openPermissionsPage").onclick = function() {
                    survey.showNavigationButtons = true;
                }
            } else if (survey.currentPage.name === 'GoogleScreeningPageA') {
                document.getElementById("openPermissionsPage").href = `https://myaccount.google.com/u/${authuserID}/permissions`;
            }

            if (survey.currentPage.name === 'GoogleSSOContextPage') {
                signOut();
            }
        });

    survey
        .onValueChanged
        .add(function(survey) {
            survey.showNavigationButtons = true;

            if (survey.currentPage.name === 'GoogleSSOPage') {
                // survey.showNavigationButtons = false;
                if (survey.getValue("PrimaryEmail") === "No, I use a different Gmail (Google) account as my primary account") {
                    survey.showNavigationButtons = false;
                    document.getElementById("signInPrimaryNotice").style.display = "block";
                } else if (survey.getValue("PrimaryEmail") === "Yes") {
                    if (isSignedIn) {
                        survey.showNavigationButtons = true;
                    }
                    try {
                        document.getElementById("signInPrimaryNotice").style.display = "none";
                    } catch {}
                }
            }
        })
}

function loadAuthuserID(localStorageAuthIDName) {
    authuserID = window.localStorage.getItem(localStorageAuthIDName);
}

function saveAuthuserID(localStorageAuthIDName) {
    window.localStorage.setItem(localStorageAuthIDName, authuserID);
}

/******************************************************************************
 * Set up of survey model instance
 ******************************************************************************/
// Set the survey json, see the file json/survey-config.js.
window.survey = new Survey.Model(preSurveyJson);

// Register survey-related listeners
registerCommonSurveyListener(survey);
registerSurveyListener(survey);
//Load saved state
loadState(survey, localStorageName);
loadAuthuserID(localStorageAuthIDName);

// Save survey responses when window is closed, refresh, or navigation buttons are used
window.addEventListener('beforeunload', function(event) {
    if (survey !== undefined) {
        saveState(survey, localStorageName);
        saveAuthuserID(authuserID, localStorageAuthIDName);
    }
});

// Get the survey element div and apply the survey model.
$("#surveyElement").Survey({
    model: window.survey,
});