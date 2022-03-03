// Study id
let studyId = '';

// Firefox
let isFirefox = typeof InstallTrigger !== 'undefined';

// Chrome
let isChrome = !!window.chrome;

// Edge (based on chromium) detection
var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

/******************************************************************************
 * Cookie management.
 ******************************************************************************/

let sessionIdCookieName = 'apipriv-study-prolific-session-id';
let uuidCookieName = 'apipriv-study-uuid';

function setCookieByNameValueExpireDays(cookieName, cookieValue, expireDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    document.cookie = cookieName + "=" + cookieValue + ";" + "expires=" + date.toUTCString() + ";path=/";
}

function getCookieValueByName(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookieByName(cookieName, path) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=" + path + ";";
}

function removeAllMainStudyRelatedCookies() {
    deleteCookieByName(sessionIdCookieName, '/');
    deleteCookieByName(uuidCookieName, '/');
    deleteCookieByName('api-privacy-main-survey', 'main-survey');
}

function removeAllPreStudyRelatedCookies() {
    deleteCookieByName(sessionIdCookieName, '/');
    deleteCookieByName(uuidCookieName, '/');
    deleteCookieByName('api-privacy-pre-survey', 'pre-survey');
}

function isUuidCookieAvailable() {
    let uuid = getCookieValueByName(uuidCookieName);
    return uuid !== "";
}

/******************************************************************************
 * Window resize protections, Prolific ID entry, and URL parameter management.
 ******************************************************************************/
function hideSurveyShowProlificIdEntry() {
    $("#surveyElement").hide();
    $("#prolific-id-entry").show();
}

function hideProlificIdEntryShowSurvey() {
    $("#prolific-id-entry").hide();
    $("#prolific-id-alert").hide();
    $("#surveyElement").show();
}

function enableParticipation() {
    $("#desktop-resize-warning").hide();

    // Base the view on the UUID cookie.
    if (isUuidCookieAvailable()) {
        hideProlificIdEntryShowSurvey();
    } else {
        hideSurveyShowProlificIdEntry();
    }
}

function disableParticipation() {
    $("#desktop-resize-warning").show();
    $("#surveyElement").hide();
    $("#prolific-id-entry").hide();
    $("#prolific-id-alert").hide();
}

function decideEnableDisable() {
    if ($(window).width() > 1000) {
        enableParticipation();
    } else {
        disableParticipation();
    }
}

function submitProlificIdAndStartSurvey() {
    let prolificId = $("#submitted-prolific-pid").val();

    // Clear the Prolific ID from URL parameter
    if (window.location.href.includes('?')) {
        history.replaceState({},
            document.title,
            "/" + window.location.href.split('/')[3].split('?')[0] + '/');
    }

    // Get the session id from the cookie.
    let sessionId = getCookieValueByName(sessionIdCookieName);

    // Temporary set uuid to sessionID
    setCookieByNameValueExpireDays(uuidCookieName, sessionId, 1);
    // End of temporary part

    // GET call to validate the prolific id.
    // $.ajax({
    //     type: "GET",
    //     url: "http://localhost:8000/rest-api/sessionId/" + sessionId + "/prolificId/" + prolificId,
    //     contentType: "application/json; charset=utf-8",
    //     dataType: 'json',
    //     crossDomain: true,
    //     headers: { "Authorization": "Basic " + btoa("survey:BYoJSd5Pp7YN1pc5Z") },
    //     success: function(data, status, jqXHR) {
    //         if (data.valid === "true") {
    //             // Display the survey.
    //             hideProlificIdEntryShowSurvey();

    //             // Store the uuid as a cookie.
    //             setCookieByNameValueExpireDays(uuidCookieName, data.uuid, 1);
    //         } else {
    //             // Display the error message.
    //             $("#prolific-id-alert").show();
    //         }
    //     },
    //     error: function(jqXHR, status) {
    //         // Error handler
    //         $("#prolific-id-alert").show();
    //     }
    // });

    hideProlificIdEntryShowSurvey();
}

// Function that is called if survey participant has an incorrect browser version.
function incorrectBrowserType() {
    // Show the incorrect browser type message even when the prolific id entry is on.
    $("#prolific-id-entry").hide();
    $("#prolific-id-alert").hide();

    // Show the incorrect browser type message even if the resolution warning box is on.
    $("#desktop-resize-warning").hide();

    // Show the incorrect browser type message.
    $("#incorrectBrowserTypeDiv").show();
}

function documentReady() {
    // Get the Prolific ID from the URL parameter
    let urlParameters = new URLSearchParams(window.location.search);

    let prolificId = '';

    // If the URL contains the Prolific Id
    if (window.location.href.includes('?')) {
        if (urlParameters.has('PROLIFIC_PID')) {
            prolificId = urlParameters.get('PROLIFIC_PID');
        }

        // Populate the text input with the Prolific ID value.
        $("#submitted-prolific-pid").val(prolificId);
    }

    // If the URL contains all of the parameters.
    if (window.location.href.includes('&')) {
        // Get the rest of the URL parameters
        if (urlParameters.has('STUDY_ID')) {
            studyId = urlParameters.get('STUDY_ID');
        }

        let sessionId = '';

        if (urlParameters.has('SESSION_ID')) {
            sessionId = urlParameters.get('SESSION_ID');
        }

        let prolificCompletionCode = '';

        if (urlParameters.has('PROLIFIC_CC')) {
            prolificCompletionCode = urlParameters.get('PROLIFIC_CC');
        }

        // Clear the URL parameters
        history.replaceState({}, document.title, "/" + window.location.href.split('/')[3] + '/?' +
            window.location.href.split('?')[1].split('&')[0]);

        // POST the session information to the server.
        // $.ajax({
        //     type: "POST",
        //     url: "http://localhost:8000/rest-api/sessionId/" + sessionId + "/prolificId/" + prolificId +
        //         "/studyId/" + studyId + "/prolificCompletionCode/" + prolificCompletionCode,
        //     contentType: "application/json; charset=utf-8",
        //     dataType: 'json',
        //     crossDomain: true,
        //     headers: { "Authorization": "Basic " + btoa("survey:BYoJSd5Pp7YN1pc5Z") },
        //     success: function(data, status, jqXHR) {
        //         // Success handler
        //         console.log(status);
        //     },
        //     error: function(jqXHR, status) {
        //         // Error handler
        //         $("#prolific-id-alert").show();
        //     }
        // });

        // Set the session Id into a cookie for later
        setCookieByNameValueExpireDays(sessionIdCookieName, sessionId, 1);
    }

    decideEnableDisable();
}

$(document).ready(function() {
    // Browser type check
    if (!isChrome && !isFirefox && !isEdgeChromium) {
        incorrectBrowserType();
    } else {
        documentReady();
    }
});

$(window).resize(function() {
    // Browser type check
    if (!isChrome && !isFirefox && !isEdgeChromium) {
        incorrectBrowserType();
    } else {
        decideEnableDisable();
    }
});