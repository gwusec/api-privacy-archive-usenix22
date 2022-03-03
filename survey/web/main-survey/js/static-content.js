const strategiesDescription = `
    <div class="card">
        <div class="card-header bg-info text-white">Strategies</div>
        <div class="card-body">
            Some people use strategies to limit the amount of information that companies can collect about them
            online.
        </div>
    </div>
`;

const surveyInstructions = `
    <div class="jumbotron">
        <h4>
            Thank you for participating in the second part of our survey.
        </h4>
        <p class="lead">
            Your answers are important to us!
        </p>
        <hr class="my-4">
        <p class="lead">
            Please read the following instructions carefully
        </p>
        <ul>
            <li>You <b>cannot proceed</b> with certain parts of the survey under <i>Incognito or Private</i> browing modes.
            </br>Please exit <i>Incognito or Private</i> before continuing with the survey.</li>
            <li>Take your time in reading and answering the questions.</li>
            <li>Answer the questions as accurately as possible.</li>
        </ul>
    </div>
`;

const beginMainSurveyMessagePage = `
    <div class="jumbotron">
        <h4>
            Now that you have successfully installed the web browser extension we will start the main survey. 
        </h4>
        <p>Please click the &ldquo;Next&rdquo; button to proceed.</p>
    </div>
`;

const extensionInstructions = `
    <div id="extensionInstructionsDiv"></div>
`;

const browserExtensionIntroduction = `
    <div class="jumbotron">
        <h4>
            Please follow the instructions below to install the <i>API Survey Assistant</i> web browser extension.
        </h4>
        <br/>
        <ul>
            <li>
                Installation of the web browser extension is required to proceed in this study.
            </li>
            <li>
                The &ldquo;Next&rdquo; button will not appear until the web browser extension has been successfully 
                installed.
            </li>
            <li>
                At the end of the survey, a button will be provided for uninstalling the extension with one click.
                Please <b>do not uninstall</b> the extension during the survey.
            </li>
        </ul>
    </div>
`;

const firefoxExtensionInstructions = `
    <div class="card mb-3">
        <h4 class="card-header">
            1. Click the &ldquo;Install Extension&rdquo; button at the bottom of this page.
        </h4>
        <div class="card-body">
            <p class="card-text">
                <b>Note:</b> The button at the bottom of this page will open a new browser tab.</br>
                Please read all instructions before clicking.
            </p>
        </div>
    </div>
    <div class="card mb-3">
        <h4 class="card-header">
            2. Click the &ldquo;Continue to Installation&rdquo; button.
        </h4>
        <img class="card-img-bottom" src="images/FirefoxContinueWithRedArrow.png"
             alt="Mozilla Firefox's continue to install a browser extension dialog">
    </div>
    <div class="card mb-3">
        <h4 class="card-header">
            3. Click the &ldquo;Add&rdquo; button.
        </h4>
        <img class="card-img-bottom" src="images/FirefoxAddWithRedArrow.png"
            alt="Mozilla Firefox's add a browser extension dialog">
    </div>
    <div class="card mb-3">
        <h4 class="card-header">
            4. Click the &ldquo;Allow this extension to run in Private Windows&rdquo; checkbox.
        </h4>
        <div class="card-body">
            <p>
                <b>Note:</b> This is only required if you are running this survey in a private window.
            </p>
        </div>
        <img class="card-img-bottom" src="images/FirefoxPrivateWithRedArrow.png"
             alt="Mozilla Firefox's allow browser extension in private window dialog">
    </div>
    <div class="card mb-3">
        <h4 class="card-header">
            5. Click the &ldquo;Okay, Got It&rdquo; button.
        </h4>
        <img class="card-img-bottom" src="images/FirefoxOkayWithRedArrow.png"
             alt="Mozilla Firefox's browser extension confirmation dialog">
    </div>
    <div class="card mb-3">
        <h4 class="card-header">
            Click now the &ldquo;Install Extension&rdquo; button.
        </h4>
        <div class="card-body text-center">
            <a id="installFirefoxAddOn" class="btn btn-success"
                href="https://apipriv.seas.gwu.edu/extensions/api_survey_assistant-0.3-fx.xpi" 
                role="button">
                Install Extension
            </a>
        </div>
    </div>
`;

const chromeExtensionInstructions = `
    <div class="card mb-3">
        <h4 class="card-header">
            1. Click the &ldquo;Install Extension&rdquo; button at the bottom of this page.
        </h4>
        <div class="card-body">
            <p class="card-text">
                <b>Note:</b> The button at the bottom of this page will open a new browser tab.</br>
                Please read all instructions before clicking.
            </p>
        </div>
    </div>
    <div class="card mb-3">
        <h4 class="card-header">
            2. Click the &ldquo;Add to Chrome&rdquo; button.
        </h4>
        <img class="card-img-bottom" src="images/ChromeAddToChromeWithRedArrow.png"
             alt="Google Chrome store page of the browser extension">
    </div>
    <div class="card mb-3">
        <h4 class="card-header">
            3. Click the &ldquo;Add Extension&rdquo; button.
        </h4>
        <img class="card-img-bottom" src="images/ChromeAddExtensionWithRedArrow.png"
             alt="Google Chrome's add a browser extension dialog">
    </div>
    <div class="card mb-3">
        <h4 class="card-header">
            4. Click the &ldquo;Google API Survey&rdquo; tab to return to the survey.
        </h4>
        <img class="card-img-bottom" src="images/ChromeSurveyTabWithRedArrow.png"
             alt="Google Chrome's tab bar">
    </div>
    <div class="card mb-3">
        <h4 class="card-header">
            Click now the &ldquo;Install Extension&rdquo; button.
        </h4>
        <div class="card-body text-center">
            <a id="installChromeExtension" class="btn btn-success"
               href="https://chrome.google.com/webstore/detail/api-survey-assistant-exte/fimegjanagioeipcojocgefcepiiiolp" 
               role="button" target="_blank">
                Install Extension
            </a>
        </div>
    </div>
`;

const edgeExtensionInstructions = `
    <div class="card mb-3">
        <h4 class="card-header">
            1. Click the &ldquo;Install Extension&rdquo; button at the bottom of this page.
        </h4>
        <div class="card-body">
            <p class="card-text">
                <b>Note:</b> The button at the bottom of this page will open a new browser tab.</br>
                Please read all instructions before clicking.
            </p>
        </div>
    </div>
    <div class="card mb-3">
        <h4 class="card-header">
            4. Click the &ldquo;Google API Survey&rdquo; tab to return to the survey.
        </h4>
        <img class="card-img-bottom" src="images/EdgeOtherStoresWithRedArrow.png"
         alt="Edge's other store">
    </div>
    <div class="card mb-3">
        <h4 class="card-header">
            4. Click the &ldquo;Google API Survey&rdquo; tab to return to the survey.
        </h4>
        <img class="card-img-bottom" src="images/EdgeAllowWithRedArrow.png"
             alt="Edge's allow other store">
    </div>
    <div class="card mb-3">
        <h4 class="card-header">
            2. Click the &ldquo;Add to Chrome&rdquo; button.
        </h4>
        <img class="card-img-bottom" src="images/EdgeAddToChromeWithRedArrow.png"
             alt="Edge's add extension">
    </div>
    <div class="card mb-3">
        <h4 class="card-header">
            3. Click the &ldquo;Add Extension&rdquo; button.
        </h4>
        <img class="card-img-bottom" src="images/EdgeAddExtensionWithRedArrow.png"
             alt="Edge's add extension dialog">
    </div>
    <div class="card mb-3">
        <h4 class="card-header">
            4. Click the &ldquo;Google API Survey&rdquo; tab to return to the survey.
        </h4>
        <img class="card-img-bottom" src="images/EdgeSurveyTabWithRedArrow.png"
             alt="Edge's tab bar">
    </div>
    <div class="card mb-3">
        <h4 class="card-header">
            Click now the &ldquo;Install Extension&rdquo; button.
        </h4>
        <div class="card-body text-center">
            <a id="installChromeExtension" class="btn btn-success"
               href="https://chrome.google.com/webstore/detail/api-survey-assistant-exte/fimegjanagioeipcojocgefcepiiiolp" 
               role="button" target="_blank">
                Install Extension
            </a>
        </div>
    </div>
`;

const browserNotSupported = `
    <div class="jumbotron">
        <h4>
            The browser you are using is not supported.
        </h4>
        <br/>
        <ul>
            <li>
                Please use <b><a target="_blank" href="https://www.google.com/chrome/">Chrome</a></b> 
                or <b><a target="_blank" href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a></b> 
                on a computer in order to proceed with this survey.
            </li>
        </ul>
    </div>
`;

const launchMyAccountDescription = `
    <div class="card mb-3">
        <div class="card-body">
            <p>
                In the next part of the study, we will ask you to explore Google's 
                "Apps with access to your account" page for your Google account.
            </p>
            <p>
                You will have an opportunity to interact with your Google's 
                "Apps with access to your account" page for <b>one minute</b> and will then be returned to the survey.
            </p>
            <p>
                We have <b>disabled clicking</b> for various links and buttons on the Google's "Apps with access to your account" 
                page to help you focus better on the access that third party applications have to your Google account.
            </p>
        </div>
    </div>
    <div class="card mb-3">
        <div class="card-header bg-info text-white">Privacy Notice</div>
        <div class="card-body">
            As part of this study, <b>we do not collect data on the name of applications on the 
            "Apps with access to your account" page. We only collect the total number of applications 
            you have authorized and permissions each application has.</b>
            At no time do the researchers have access to your Google account or collect specific details
            about any permissions displayed on your "Apps with access to your account" page.
        </div>
    </div>
`;

const launchMyAccountButton = `
    <div>
        <p>
            Click the button below to visit your <b>"Apps with access to your account" page</b> in a new browser tab.
        </p>
        <button class="btn btn-success" type="button"
               onclick="launchMyAccountPageInNewTab()" id="launchMyAccountPageButton">
               Visit \"Apps with access to your account\" Page
        </button>
   </div>
`;

const launchMyAccountProceed = `
    <div class="jumbotron">
        <h4>
            Please proceed to the next page. 
        </h4>
    </div>
`;

const SSOPerceptionContext = `
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
    <img class="card-img-bottom" src="./images/GoogleSSOContextImg.png" id="SSOContextImg" style="display:none;">

    <div class="hyMrOd " id="SSOContextList">
        <div class="ktqbFd">
            <div class="LIN9We" id="third-party"></div>
            <div role="heading" aria-level="2" class="RaBvue">Signing in with Google</div>
            <div role="heading" aria-level="2" class="ow0aJf">
                You use your Google Account to sign in to these sites and apps. 
                They can view your name, email address, and profile picture. 
            </div>
        </div>
    </div>
</div>


`;

const TPPerceptionContext = `
<div class="card mb-3">
    <h4 class="card-header">
        Manage third-party apps & services with access to your Google Account
    </h4>
    <div class="card-body">
        <p class="card-text">
            Google lets you give third-party apps and services access to different parts of 
            your Google Account. Third-party apps and services are created by companies or 
            developers that aren’t Google.
        </p>
        <p class="card-text">
            For example, you may download an app that helps you schedule workouts with friends. 
            This app may request access to your Google Calendar and Contacts to suggest times 
            and friends for you to meet up with.
        </p>
    </div>
    <img class="card-img-bottom" src="./images/GoogleThirdPartyContextImg.png" id="TPContextImg" style="display:none;">

    <div class="hyMrOd " id="TPContextList">
        <div class="ktqbFd">
            <div class="LIN9We" id="third-party"></div>
            <div role="heading" aria-level="2" class="RaBvue">Third-party apps with account access</div>
            <div role="heading" aria-level="2" class="ow0aJf">
                You gave these sites and apps access to some of your Google Account data, 
                including info that may be sensitive. Remove access for those you no longer trust or use.
            </div>
        </div>
    </div>
</div>
`;

const ReflectionPageContext = `
<div class="card mb-3">
    <h4 class="card-header">
        Manage third-party apps & services with access to your Google Account
    </h4>
    <div class="card-body">
        <p class="card-text">
        By now, you have seen information about apps and websites drawn from the 
        "Apps with access to your account" 
        page on your Google account (similar to the example below). You can refer to that page when answering the 
        following questions.
        </p>
    </div>
    <img class="card-img-bottom" id="reflectionPageImg" src="./images/ReflectionPageContextImgWhole.png" style="display:none;">
    <div id = "reflectionPageContextDiv">
        <img class="card-img-bottom" src="./images/ReflectionPageContextImg.png">
        <div class="hyMrOd " id="TPContextList">
            <div class="ktqbFd">
                <div class="LIN9We" id="third-party"></div>
                <div role="heading" aria-level="2" class="RaBvue">Third-party apps with account access</div>
                <div role="heading" aria-level="2" class="ow0aJf">
                    You gave these sites and apps access to some of your Google Account data, 
                    including info that may be sensitive. Remove access for those you no longer trust or use.
                </div>
            </div>
        </div>
        </br>
        <div class="hyMrOd " id="SSOContextList">
            <div class="ktqbFd">
                <div class="LIN9We" id="third-party"></div>
                <div role="heading" aria-level="2" class="RaBvue">Signing in with Google</div>
                <div role="heading" aria-level="2" class="ow0aJf">
                    You use your Google Account to sign in to these sites and apps. 
                    They can view your name, email address, and profile picture. 
                </div>
            </div>
        </div>
    </div>

</div>
`;

const uninstallBrowserExtension = `
    <div id="uninstallBrowserExtensionDiv" class="card mb-4">
        <div class="card-header bg-info text-white">Uninstall Web Browser Extension</div>
        <div class="card-body">
            Click the following button to uninstall the web browser extension.
        </div>
        <div class="card-footer">
            <input type="button" value="Uninstall Extension" onclick="uninstallExtension()" class="btn btn-danger">
        </div>
    </div>
    <div id="browserExtensionRemovedDiv" class="d-none">Web browser extension uninstalled.</div>
    
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

const OldestAppContext = `
    <div class="hyMrOd ">
        <div class="ulZjrf">
            <div jscontroller="eaLETb" data-id="678783785621" aria-hidden="false" tabindex="0">
                <div jsname="PBWx0c" class="DyEs4" style="" aria-hidden="false">
                    <div jsname="e6W9rf" class="WRlqaf">
                        <div class="ShbWnb" aria-hidden="true">
                            <img id="appIcon" class="BUooTd Z6d4Dd v0j8P " data-iml="219.53500000017812" data-atf="false">
                        </div>
                        <div class="ymEM2d">
                            <div class="Lp8iaf">
                                <h2 class="CMEZce" id="appName"></h2>
                                <div jsname="GczRad" class="doPudb" id="appAcce"></div>
                            </div>
                        </div>
                    </div>
                    <span jsslot="">
                        <div class="xoz9O">
                            <div class="pR6rKf" role="row">
                                <div class="pOUX7" role="rowheader">Has access to:</div>
                                <div class="w3DLae" role="gridcell">
                                    <div class="AFqoge" role="list" id="accelist">
                                    </div>
                                </div>
                            </div>
                            <div class="pR6rKf" role="row">
                                <div class="pOUX7" role="rowheader">Access given on:</div>
                                <div class="w3DLae" role="gridcell">
                                    <div class="AFqoge" role="list">
                                        <div class="sPOj5c" role="listitem">
                                            <div class="hMZdhd" id="appTime"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </span>
                </div>                
            </div>
        </div>
    </div>
`;

const NewestAppContext = `
    <div class="hyMrOd ">
        <div class="ulZjrf">
            <div jscontroller="eaLETb" data-id="678783785621" aria-hidden="false"
                tabindex="0">
                <div jsname="PBWx0c" class="DyEs4" style="" aria-hidden="false">
                    <div jsname="e6W9rf" class="WRlqaf">
                        <div class="ShbWnb" aria-hidden="true"><img id="appIcon" class="BUooTd Z6d4Dd v0j8P " data-iml="219.53500000017812" data-atf="false"></div>
                        <div class="ymEM2d">
                            <div class="Lp8iaf">
                                <h2 class="CMEZce" id="appName"></h2>
                                <div jsname="GczRad" class="doPudb" id="appAcce"></div>
                            </div>
                        </div>
                    </div>
                    <span jsslot="">
                        <div class="xoz9O">
                            <div class="pR6rKf" role="row">
                                <div class="pOUX7" role="rowheader">Has access to:</div>
                                <div class="w3DLae" role="gridcell">
                                    <div class="AFqoge" role="list" id="accelist">
                                    </div>
                                </div>
                            </div>
                            <div class="pR6rKf" role="row">
                                <div class="pOUX7" role="rowheader">Access given on:</div>
                                <div class="w3DLae" role="gridcell">
                                    <div class="AFqoge" role="list">
                                        <div class="sPOj5c" role="listitem">
                                            <div class="hMZdhd" id="appTime"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </span>
                </div>                
            </div>
        </div>
    </div>
`;

const RandomAppContext = `
    <div class="hyMrOd ">
        <div class="ulZjrf">
            <div jscontroller="eaLETb" data-id="678783785621" aria-hidden="false"
                tabindex="0">
                <div jsname="PBWx0c" class="DyEs4" style="" aria-hidden="false">
                    <div jsname="e6W9rf" class="WRlqaf">
                        <div class="ShbWnb" aria-hidden="true"><img id="appIcon" class="BUooTd Z6d4Dd v0j8P " data-iml="219.53500000017812" data-atf="false"></div>
                        <div class="ymEM2d">
                            <div class="Lp8iaf">
                                <h2 class="CMEZce" id="appName"></h2>
                                <div jsname="GczRad" class="doPudb" id="appAcce"></div>
                            </div>
                        </div>
                    </div>
                    <span jsslot="">
                        <div class="xoz9O">
                            <div class="pR6rKf" role="row">
                                <div class="pOUX7" role="rowheader">Has access to:</div>
                                <div class="w3DLae" role="gridcell">
                                    <div class="AFqoge" role="list" id="accelist">
                                    </div>
                                </div>
                            </div>
                            <div class="pR6rKf" role="row">
                                <div class="pOUX7" role="rowheader">Access given on:</div>
                                <div class="w3DLae" role="gridcell">
                                    <div class="AFqoge" role="list">
                                        <div class="sPOj5c" role="listitem">
                                            <div class="hMZdhd" id="appTime"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </span>
                </div>                
            </div>
        </div>
    </div>
`;

const basicAccountInfoIcon = `
    <svg width="16" height="16" viewBox="0 0 24 24" focusable="false" class="klq2Rc NMm5M">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.95 7.95 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83z">
        </path>
        <path d="M12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z">
        </path>
    </svg>
`;