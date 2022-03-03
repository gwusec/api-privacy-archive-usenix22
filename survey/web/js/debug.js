// Function to change the survey to the page number provided as an argument.
function updatePage(page_num) {
    // If survey not running ...
    if (survey.state === 'starting') {
        // Auto-fill informed consent form and start survey.
        survey.setValue('informedConsent', {
            age: { confirmation: true },
            participation: { confirmation: true },
            read: { confirmation: true }
        });
        survey.start();
    }
    // Set the current page survey page to the page number argument.
    survey.currentPageNo = page_num;
    // Re-render the survey after page change.
    survey.render();
}

// Function to update parameters in the URL.
function updateURL(paramName, value) {
    let url = new URL(document.URL);
    let url_params = new URLSearchParams(url.search);
    url_params.set(paramName, value);
    url.search = url_params.toString();
    window.history.replaceState({}, null, url.toString());
}

// Function to update GUI of the debug mode.
function updateDebugGUI(survey) {
    // Create options for the go to page dropdown menu.
    let index = 0;
    document.getElementById('pages').innerHTML = survey.pages.map((page) => {
        let disabled, pageIndex, pageIndexString;
        if (page.isVisible === true) {
            disabled = '';
            pageIndex = index++;
            pageIndexString = pageIndex;
        } else if (page.isVisible === false) {
            disabled = 'disabled';
            pageIndex = -1;
            pageIndexString = '#';
        }
        return `<button class="dropdown-item" type="button" ${disabled} value="${pageIndex}"
                        onclick="updatePage(${pageIndex})">
                    ${pageIndexString} - ${page.name}
                </button>`;
    }).join('\n');
    setSelect('pages', survey.currentPageNo);
    // Set state of go to page button
    document.getElementById('debugNavPagesMenuButton').disabled = survey.isCompleted;

    // Update buttons
    // Set state of prev page button
    document.getElementById('debugSurveyPrev').disabled = survey.isStartedState || survey.isFirstPage || survey.isCompleted;
    // Set state of next page button
    document.getElementById('debugSurveyNext').disabled = survey.isCompleted;

    // Set state of show invisible elements button
    let showInvisibleElements = document.getElementById('debugShowInvisibleElements');
    if (survey.showInvisibleElements) {
        showInvisibleElements.classList.add('active');
        showInvisibleElements.setAttribute('aria-pressed', 'true');
    } else {
        showInvisibleElements.classList.remove('active');
        showInvisibleElements.setAttribute('aria-pressed', 'false');
    }
    showInvisibleElements.disabled = survey.isCompleted;

    // Set state of complete button
    document.getElementById('debugSurveyComplete').disabled = survey.isCompleted;
    // Set state of complete button
    document.getElementById('debugSurveyRestart').disabled = survey.state === 'starting';
}

// Function to set select element.
function setSelect(id, value) {
    let dropDown = $('#' + id);
    dropDown.children('button.active').removeClass('active');
    dropDown.children(`button[value=${value}]`).addClass('active');
}

function registerDebugListeners(survey) {
    let updateDebugModeCallback = function() {
        if (param_debug === true) {
            // Update debug banner, selected page, and page parameter in URL.
            updateDebugGUI(survey);
            updateURL('page', survey.currentPageNo);
        }
    };
    // Register listener for page changes to show new page number in the debug banner and the URL.
    survey.onCurrentPageChanged.add(updateDebugModeCallback);
    // Register listener for visibility changes of survey pages.
    survey.onPageVisibleChanged.add(updateDebugModeCallback);

    survey.onComplete.add(updateDebugModeCallback);

    // Register listener for visibility changes of survey pages.
    survey.registerFunctionOnPropertyValueChanged('showInvisibleElements', function() {
        if (param_debug === true) {
            updateDebugGUI(survey);
            updateURL('showInv', survey.showInvisibleElements);
        }
    });

    let surveyArticle = document.getElementById('surveyArticle');
    if (surveyArticle !== null) {
        // Create an observer for surveyArticle.dataset.browserExtensionVersion
        const observer = new MutationObserver(function(mutationsList, observer) {
            mutationsList
                .forEach(mutation => {
                    let uninstallButton = document.getElementById('debugUninstallExtension');
                    if (uninstallButton !== undefined || null) {
                        uninstallButton.disabled = mutation.target.dataset.browserExtensionVersion === undefined ||
                            mutation.target.dataset.browserExtensionVersion === '0';
                    }
                });
        });
        observer.observe(surveyArticle, { attributeFilter: ['data-browser-extension-version'] });
    }
}

function createDebugBanner(survey) {
    // Create a new div element for the debug banner.
    // Create and set the content of the banner.
    let debugMenu = `
        <span id="timeout" class="navbar-text mr-2">
            <b>DEBUG MODE</b>
        </span>
        <form class="form-inline">
            <div class="form-group ml-2 mb-3 mb-xl-0">
                <button id="debugSurveyPrev" type="button" class="btn btn-primary navbar-btn btn-sm mr-2"
                        onclick="survey.prevPage()">
                        Prev Page
                </button>
                <button id="debugSurveyNext" type="button" class="btn btn-primary navbar-btn btn-sm mr-2"
                        onclick="updatePage(survey.currentPageNo + 1)">
                        Next Page
                </button>
                <div class="btn-group">                
                    <button id="debugNavPagesMenuButton" class="btn btn-outline-primary btn-sm dropdown-toggle mr-2" type="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Go to page
                    </button>
                    <div class="dropdown-menu" id="pages" aria-labelledby="debugNavPagesMenuButton"
                         style="overflow-y: auto; max-height: 80vh;">
                    </div>
                </div>
            </div>
            <div class="form-group ml-2 mb-3 mb-xl-0">
                <button type="button" id="debugShowInvisibleElements"
                        class="btn btn-info navbar-btn btn-sm mr-2"
                        data-toggle="button" aria-pressed="false"
                        onclick="survey.showInvisibleElements = !survey.showInvisibleElements;">
                        Show invisible elements
                </button>
            </div>
            <div class="form-group ml-2 mb-3 mb-xl-0">
                <button id="debugSurveyComplete" type="button" class="btn btn-warning navbar-btn btn-sm mr-2"
                        onclick="survey.doComplete()">
                        Complete
                </button>
                <button id="debugSurveyRestart" type="button" class="btn btn-warning navbar-btn btn-sm mr-2"
                        onclick="restartSurvey(survey); updateDebugGUI(survey);">
                        Restart Survey
                </button>
            </div>
            <div class="form-group ml-2 mb-3 mb-xl-0">
                <button id="debugUninstallExtension" type="button" class="btn btn-danger navbar-btn btn-sm mr-2"
                        disabled 
                        onclick="uninstallExtension()">
                        Uninstall Extension
                </button>
            </div>
        </form>
    `;
    // Append the banner div element to the Google My Account page.
    $($.parseHTML(debugMenu)).appendTo('div.navbar-collapse');
    $('nav.navbar').removeClass('navbar-expand-sm').addClass('navbar-expand-xl');
    // Create option elements for pages select element.
    updateDebugGUI(survey);
}

// Get the url vars and put them in a map of variables.
const url_params = new URLSearchParams(new URL(document.URL).search);
// Variable that determines if we are in debug mode.
const param_debug = url_params.get('debug') === 'true';
const param_page = parseInt(url_params.get('page'), 10);
const param_showInv = url_params.get('showInv') === 'true';

// If the debug variable is true, turn on the debug mode options.
if (param_debug === true && survey !== undefined) {

    // Auto-fill informed consent form.
    survey.setValue('informedConsent', {
        age: { confirmation: true },
        participation: { confirmation: true },
        read: { confirmation: true }
    });

    if (param_showInv === true) {
        survey.showInvisibleElements = true;
    }
    registerDebugListeners(survey);
    createDebugBanner(survey);
    // Check if param_page is an integer.
    if (isNaN(param_page) === false && !(param_page === 0 && param_showInv === true)) {
        document.getElementById('pages').value = param_page;
        updatePage(param_page);
    }
}

// Disable window management for local testing.
const param_local = url_params.get('local') === 'true';
if (param_local === true) {
    isUuidCookieAvailable = function() { return true };
    decideEnableDisable();
}