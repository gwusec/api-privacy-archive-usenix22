const surveyInstructions = `
    <div class="jumbotron">
        <h4>
            Thank you for your interest in our survey.
        </h4>
        <p class="lead">Your answers are important to us!</p>
        <hr class="my-4">
        <p>Please read the following instructions carefully</p>
        <ul>
            <li>You <b>cannot proceed</b> with certain parts of the survey under <i>Incognito or Private</i> browing modes.
            </br>Please exit <i>Incognito or Private</i> before continuing with the survey.</li>
            <li>Take your time in reading and answering the questions.</li>
            <li>Answer the questions as accurately as possible.</li>
        </ul>
    </div>
`;

const googleSSOContext = `
<div class="card mb-3">
    <h4 class="card-header">
        Use your Google Account to sign in to other apps or services
    </h4>
    <div class="card-body">
        <p class="card-text">
            You can use your Google Account to sign in to third-party apps and services. 
            You won't have to remember individual usernames and passwords for each account.
        </p>
        <p class="card-text">
            Third-party apps and services are created by companies or developers that aren’t Google.
        </p>
    </div>
    <img class="card-img-bottom" src="./images/GoogleSSOContextImg.png">
</div>
`;

const googleThirdPartyContext = `
<div class="card mb-3">
    <h4 class="card-header">
        Manage third-party apps & services with access to your Google Account
    </h4>
    <div class="card-body">
        <p class="card-text">
            Google lets you give third-party apps and services access to different parts of your Google Account. 
            Third-party apps and services are created by companies or developers that aren’t Google.
        </p>
        <p class="card-text">
            For example, you may download an app that helps you schedule workouts with friends. 
            This app may request access to your Google Calendar and Contacts to suggest times and friends 
            for you to meet up with.
        </p>
    </div>
    <img class="card-img-bottom" src="./images/GoogleThirdPartyContextImg.png">
</div>
`;

const gsContext = `
<div class="card mb-3">
    <h4 class="card-header"></h4>
    <div class="card-body">
        <p class="card-text">
            You can revisit the "<a target="_blank" id="linkToPermissions" href="https://myaccount.google.com/permissions">
            Apps with access to your account</a>" page by clicking the link.
        </p>
        <p class="card-text">
            You should see one or more of the following boxes on that web page:
        </p>
    </div>
</div>
`;

const googleScreeningSSOContext = `
<div class="card mb-3">
    <img class="card-img-bottom" src="./images/GSContextBoxB.png">
</div>
`;

const googleScreeningThirdPartyContext = `
<div class="card mb-3">
    <img class="card-img-bottom" src="./images/GSContextBoxA.png">
</div>
`;

const genericSSOContext = `
<div class="card mb-3">
    <h4 class="card-header">
    Use an existing online account to sign in to other apps or services
    </h4>
    <div class="card-body">
        <p class="card-text">
            You can use your existing account on various online platforms (e.g., Facebook, Google, Apple, etc.) to sign in to 
            third-party apps and services. You won't have to remember individual usernames and passwords for each account.
        </p>
        <p class="card-text">
            Third-party apps and services are created by companies or developers that aren’t part of those platforms.
        </p>
    </div>
    <img class="card-img-bottom" src="./images/GenericSSOContextImg.png">
</div>
`;

const genericThirdPartyContext = `
<div class="card mb-3">
    <h4 class="card-header">
        Manage third-party apps & services with access to your online Account
    </h4>
    <div class="card-body">
        <p class="card-text">
            Online platforms let you give third-party apps and services access to different parts of your 
            accounts on those platforms. Third-party apps and services are created by companies or developers 
            that aren't part of those platforms.
        </p>
        <p class="card-text">
            For example, you may download an app that helps you schedule workouts with friends. This app may request 
            access to your online calendar (e.g., Google Calendar, Apple iCloud Calendar, Microsoft Outlook, etc.) and 
            contact list to suggest times and friends for you to meet up with.
        </p>
    </div>
    <img class="card-img-bottom" src="./images/GoogleThirdPartyContextImg.png">
</div>
`;

const googleLoginPage = `
    <p>
        This survey requires that you login to your primary Google account to continue.
        We are using this Single Sign On to verify that you have a Google account.
    </p>

    <div class="card mb-3">
        <div class="card-header bg-info text-white">Privacy Notice</div>
        <div class="card-body">
            <b>
                We do not transmit your email address to our server as part of this study, and we will not be able to 
                tie your email address to any results or analysis. All uses of your email address are local to your browser.
            </b>
            The researchers will never see your email address. At no time do the researchers have access to your
            Google account.
        </div>
    </div>
  
    <p id="pleaseClickSignInParagraph">
        Please click the &ldquo;Sign in&rdquo; button below and login to your primary Google account.
    </p>
    
    <br/>
    
    <table>
        <tr>
            <td>
                <div id="my-signin2"></div>
            </td>
            <td>
                <div id="signedInAs"></div>
            </td>
        </tr>
    </table>
    
    <br/>
    
    <script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>

    <p id="signInPrimaryNotice" style="color:red;display:none">Please sign into your primary Gmail (Google) account.</p>

    <p id="IncognitoNotice" style="color:red;display:none">
        You <b>cannot proceed</b> with the survey under <b>Incognito or Private</b> browing modes.
        </br>Please exit <b>Incognito or Private</b> before continuing with the survey.
    </p>
`;

const successfulCompletionMessagePreSurvey = `
    <div class="jumbotron">
        <h4>
            Thank you for participating in our survey!
        </h4>
        <hr class="my-4">
        <p class="lead">Please monitor your Prolific studies list for an invitation to complete the main survey.</p>
        <p class="lead">
        As a reminder:
            <ul>
                <li>
                    We did not track or store your email address
                </li>
            </ul>
        </p>
    </div>
`;