let mainSurveyJSON = {
    title: "Google API Survey",
    focusFirstQuestionAutomatic: false,
    completedHtml: successfulCompletionMessage + feedbackForm + uninstallBrowserExtension + redirectToProlific,
    completedHtmlOnCondition: [{
        expression: "{hasWithdrawn} = true",
        html: withdrawnCompletionMessage + uninstallBrowserExtension + feedbackForm
    }],
    pages: [{
            name: "consentPage",
            elements: [{
                    type: "html",
                    name: "consentText",
                    html: informedConsentText
                },
                {
                    type: "matrixdropdown",
                    name: "informedConsent",
                    title: "Statement by person agreeing to participate in this study",
                    hideNumber: true,
                    isRequired: true,
                    requiredErrorText: "Please answer the following questions.",
                    validators: [{
                        type: "expression",
                        text: "Not all requirements for participation are fulfilled.",
                        expression: "{informedConsent.age.confirmation} = true and {informedConsent.read.confirmation} = true and {informedConsent.participation.confirmation} = true"
                    }],
                    showHeader: false,
                    columns: [{
                        name: "confirmation"
                    }],
                    cellType: "boolean",
                    rows: [{
                            value: "age",
                            text: "I am 18 years of age, or older"
                        },
                        {
                            value: "read",
                            text: "I have read and understand the informed consent"
                        },
                        {
                            value: "participation",
                            text: "I consent to participate in the research"
                        }
                    ]
                }
            ]
        },
        {
            name: "surveyInstructionsPage",
            elements: [{
                type: "html",
                name: "surveyInstructions",
                html: surveyInstructions
            }]
        }, {
            name: "extensionInstructionsPage",
            elements: [{
                type: "html",
                name: "extensionInstructions",
                html: extensionInstructions
            }]
        },
        {
            name: "beginMainSurveyMessagePage",
            elements: [{
                type: "html",
                name: "beginMainSurveyMessage",
                html: beginMainSurveyMessagePage
            }]
        },
        {
            name: "beginMainSurveyContextPage",
            elements: [{
                type: "html",
                name: "participantContext",
                html: participantContext
            }]
        },
        {
            name: "GoogleSSOPage",
            elements: [{
                type: "html",
                name: "Single Sign On",
                html: googleLoginPage
            }]
        }, {
            name: "launchMyAccountPageContext",
            elements: [{
                type: "html",
                name: "launchMyAccountDescription",
                html: launchMyAccountDescription
            }]
        },
        {
            name: "launchMyAccountPage",
            elements: [{
                    type: "html",
                    name: "launchMyAccountButton",
                    html: launchMyAccountButton
                },
                {
                    type: 'html',
                    name: 'launchMyAccountTimer',
                    visibleIf: '{launchMyAccountTimer} = "true"',
                    html: '00:00 are left for exploring "Apps with access to your account" page.'
                }
            ]
        },
        {
            name: "launchMyAccountProceedPage",
            elements: [{
                type: 'html',
                name: 'launchMyAccountProceed',
                html: launchMyAccountProceed
            }],
            visibleIf: '{launchMyAccountProceed} = "true"'
        },
        {
            name: "SSOPerceptionPage",
            elements: [{
                    type: "html",
                    name: "SSOPerceptionContext",
                    html: SSOPerceptionContext
                },
                {
                    type: "matrix",
                    name: "SSOConsiderations",
                    title: "You have <span style=\"color: red;\">{NumSSOApps} third-party apps</span> and services that you can <b>sign into using your Google account</b>.<br/>Before using my Google account to sign into a website or third-party app, I consider:",
                    columns: [{
                            value: "Strongly disagree",
                            text: "<nobr>Strongly</nobr> <nobr>disagree</nobr>"
                        },
                        {
                            value: "Disagree",
                            text: "<nobr>Disagree</nobr>"
                        },
                        {
                            value: "Neither agree nor disagree",
                            text: "<nobr>Neither</nobr> <nobr>agree</nobr> <nobr>nor</nobr> <nobr>disagree</nobr>"
                        },
                        {
                            value: "Agree",
                            text: "<nobr>Agree</nobr>"
                        },
                        {
                            value: "Strongly agree",
                            text: "<nobr>Strongly</nobr> <nobr>agree</nobr>"
                        }
                    ],
                    rows: [{
                            value: "SSOHowSecure",
                            text: "...how secure the app or website is."
                        },
                        {
                            value: "SSOHowDataUsed",
                            text: "...how the app or website will use your data."
                        },
                        {
                            value: "SSOWhetherDelete",
                            text: "...whether you can delete your data from the app or website."
                        },
                        {
                            value: "SSOWhetherTellChange",
                            text: "...whether the app or website will tell you if something changes."
                        },
                        {
                            value: "SSOWhoElse",
                            text: "...who else can see your data on the app or website."
                        }
                    ],
                    isRequired: true,
                    isAllRowRequired: true
                },
                {
                    type: "radiogroup",
                    name: "SSOHowOftenReview",
                    title: "How often do you review what services you can sign into using your Google account?",
                    isRequired: true,
                    choices: [{
                            value: "Never",
                            text: "Never"
                        },
                        {
                            value: "Rarely",
                            text: "Rarely"
                        },
                        {
                            value: "Daily",
                            text: "Daily"
                        },
                        {
                            value: "Weekly",
                            text: "Weekly"
                        },
                        {
                            value: "Monthly",
                            text: "Monthly"
                        },
                        {
                            value: "Yearly",
                            text: "Yearly"
                        }
                    ]
                }
            ],
            visibleIf: "{SSOPageVisible} = 'true'"
        },
        {
            name: "TPPerceptionPage",
            elements: [{
                    type: "html",
                    name: "TPPerceptionContext",
                    html: TPPerceptionContext
                },
                {
                    type: "matrix",
                    name: "TPConsiderations",
                    title: "You have <span style=\"color: red;\">{NumTPApps} third-party apps</span> and services that <b>have access to your Google account data</b>. <br>Before granting a website or third-party app access to my Google account, I consider:",
                    columns: [{
                            value: "Strongly disagree",
                            text: "<nobr>Strongly</nobr> <nobr>disagree</nobr>"
                        },
                        {
                            value: "Disagree",
                            text: "<nobr>Disagree</nobr>"
                        },
                        {
                            value: "Neither agree nor disagree",
                            text: "<nobr>Neither</nobr> <nobr>agree</nobr> <nobr>nor</nobr> <nobr>disagree</nobr>"
                        },
                        {
                            value: "Agree",
                            text: "<nobr>Agree</nobr>"
                        },
                        {
                            value: "Strongly agree",
                            text: "<nobr>Strongly</nobr> <nobr>agree</nobr>"
                        }
                    ],
                    rows: [{
                            value: "TPHowSecure",
                            text: "...how secure the app or website is."
                        },
                        {
                            value: "TPHowDataUsed",
                            text: "...how the app or website will use your data."
                        },
                        {
                            value: "TPWhetherDelete",
                            text: "...whether you can delete your data from the app or website."
                        },
                        {
                            value: "TPWhetherTellChange",
                            text: "...whether the app or website will tell you if something changes."
                        },
                        {
                            value: "TPWhoElse",
                            text: "...who else can see your data on the app or website."
                        },
                        {
                            value: "TPWhatPartAccess",
                            text: "...what parts of your account the app or website can access."
                        }
                    ],
                    isRequired: true,
                    isAllRowRequired: true
                },
                {
                    type: "radiogroup",
                    name: "TPHowOftenReview",
                    title: "How often do you review what services have access to your Google account?",
                    isRequired: true,
                    choices: [{
                            value: "Never",
                            text: "Never"
                        },
                        {
                            value: "Rarely",
                            text: "Rarely"
                        },
                        {
                            value: "Daily",
                            text: "Daily"
                        },
                        {
                            value: "Weekly",
                            text: "Weekly"
                        },
                        {
                            value: "Monthly",
                            text: "Monthly"
                        },
                        {
                            value: "Yearly",
                            text: "Yearly"
                        }
                    ]
                }
            ],
            visibleIf: "{RecallThirdPartyAuthPageVisible} = 'true'"
        },
        {
            name: "RecallThirdPartyAuthPage",
            elements: [{
                    type: "matrix",
                    name: "AppsAuthorizedMatrix",
                    title: "The following apps are authorized to access various parts of your Google account. Which of these apps would you prefer to keep on your account? Which would you prefer to remove?",
                    columns: [{
                            value: "Keep",
                            text: "<nobr>Keep</nobr>"
                        },
                        {
                            value: "Remove",
                            text: "<nobr>Remove</nobr>"
                        },
                        {
                            value: "Unsure",
                            text: "<nobr>Unsure</nobr>"
                        }
                    ],
                    rows: [],
                    isRequired: true,
                    isAllRowRequired: true
                },
                {
                    type: "radiogroup",
                    name: "WhichIsSport",
                    title: "Which of these is a sport?",
                    isRequired: true,
                    choices: [{
                            value: "Hamburger",
                            text: "Hamburger"
                        },
                        {
                            value: "Basketball",
                            text: "Basketball"
                        },
                        {
                            value: "Bathroom",
                            text: "Bathroom"
                        },
                        {
                            value: "Skyscraper",
                            text: "Skyscraper"
                        }
                    ]
                }
            ],
            visibleIf: "{RecallThirdPartyAuthPageVisible} = 'true'"
        },
        {
            name: "AppsToRemove",
            elements: [{
                type: "panel",
                name: "AppsRemovePanel"
            }]
        },
        {
            name: "OldestAppPage1",
            elements: [{
                    type: "html",
                    name: "OldestAppContext1",
                    html: OldestAppContext
                },
                {
                    type: "radiogroup",
                    name: "OldestappRecall",
                    title: "Do you recall authorizing <b>{OldestappName}</b>?",
                    isRequired: true,
                    choices: [{
                            value: "Yes",
                            text: "Yes"
                        },
                        {
                            value: "No",
                            text: "No"
                        },
                        {
                            value: "Unsure",
                            text: "Unsure"
                        }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "OldestappLastUse",
                    title: "When was the last time you recall using <b>{OldestappName}</b>?",
                    isRequired: true,
                    choices: [{
                            value: "Today",
                            text: "Today"
                        },
                        {
                            value: "In the previous week",
                            text: "In the previous week"
                        },
                        {
                            value: "In the previous month",
                            text: "In the previous month"
                        },
                        {
                            value: "In the previous year",
                            text: "In the previous year"
                        },
                        {
                            value: "More than a year ago",
                            text: "More than a year ago"
                        },
                        {
                            value: "Unsure",
                            text: "Unsure"
                        }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "OldestappAwarePrior",
                    title: "Prior to seeing the details about <b>{OldestappName}</b>, were you aware this app had permission to access parts of your Google account data?",
                    isRequired: true,
                    choices: [{
                            value: "Yes",
                            text: "Yes"
                        },
                        {
                            value: "No",
                            text: "No"
                        },
                        {
                            value: "Unsure",
                            text: "Unsure"
                        }
                    ]
                },
                {
                    type: "matrix",
                    name: "OldestappAgreeMat",
                    title: "Please indicate how strongly you agree or disagree with the following:",
                    isRequired: true,
                    columns: [{
                            value: "Strongly disagree",
                            text: "<nobr>Strongly</nobr> <nobr>disagree</nobr>"
                        },
                        {
                            value: "Disagree",
                            text: "<nobr>Disagree</nobr>"
                        },
                        {
                            value: "Neither agree nor disagree",
                            text: "<nobr>Neither</nobr> <nobr>agree</nobr> <nobr>nor</nobr> <nobr>disagree</nobr>"
                        },
                        {
                            value: "Agree",
                            text: "<nobr>Agree</nobr>"
                        },
                        {
                            value: "Strongly agree",
                            text: "<nobr>Strongly</nobr> <nobr>agree</nobr>"
                        }
                    ],
                    rows: [{
                            value: "appBeneficialAccess",
                            text: "It's beneficial to me for <b>{OldestappName}</b> to have access to my Google account."
                        },
                        {
                            value: "appConcernAccess",
                            text: "I'm concerned with <b>{OldestappName}</b> having access to my Google account."
                        },
                        {
                            value: "appChangeAccess",
                            text: "I want to change which parts of my Google account that <b>{OldestappName}</b> can access."
                        },
                    ],
                    isRequired: true,
                    isAllRowRequired: true
                },
            ],
            visibleIf: "{OldestPageVisible} = 'true'"
        },
        {
            name: "OldestAppPage2Understand",
            elements: [{
                    type: "html",
                    name: "OldestAppContext2U",
                    html: OldestAppContext
                },
                {
                    type: "matrix",
                    name: "OldestappPermUnderstand",
                    title: "<b>{OldestappName}</b> holds the following permissions to access parts of your Google account. How **confident** are you that you understand what each permission allows the app to do?.",
                    isRequired: true,
                    columns: [{
                            value: "Not confident",
                            text: "Not <nobr>confident</nobr>"
                        },
                        {
                            value: "Slightly confident",
                            text: "<nobr>Slightly</nobr> <nobr>confident</nobr>"
                        },
                        {
                            value: "Moderately confident",
                            text: "<nobr>Moderately</nobr> <nobr>confident</nobr>"
                        },
                        {
                            value: "Confident",
                            text: "<nobr>Confident</nobr>"
                        },
                        {
                            value: "Very confident",
                            text: "Very <nobr>confident</nobr>"
                        }
                    ],
                    rows: [],
                    isRequired: true,
                    isAllRowRequired: true
                }
            ],
            visibleIf: "{OldestPageVisible} = 'true'"
        },
        {
            name: "OldestAppPage2",
            elements: [{
                    type: "html",
                    name: "OldestAppContext2",
                    html: OldestAppContext
                },
                {
                    type: "matrix",
                    name: "OldestappPermNece",
                    title: "<b>{OldestappName}</b> holds the following permissions to access parts of your Google account. How **necessary** do you think each permission is for the app to function in a way that benefits you?",
                    isRequired: true,
                    columns: [{
                            value: "Not necessary",
                            text: "Not <nobr>necessary</nobr>"
                        },
                        {
                            value: "Slightly necessary",
                            text: "<nobr>Slightly</nobr> <nobr>necessary</nobr>"
                        },
                        {
                            value: "Moderately necessary",
                            text: "<nobr>Moderately</nobr> <nobr>necessary</nobr>"
                        },
                        {
                            value: "Necessary",
                            text: "<nobr>Necessary</nobr>"
                        },
                        {
                            value: "Very necessary",
                            text: "Very <nobr>necessary</nobr>"
                        }
                    ],
                    rows: [],
                    isRequired: true,
                    isAllRowRequired: true
                }
            ],
            visibleIf: "{OldestPageVisible} = 'true'"
        }, {
            name: "OldestAppPage3",
            elements: [{
                    type: "html",
                    name: "OldestAppContext3",
                    html: OldestAppContext
                },
                {
                    type: "matrix",
                    name: "OldestappPermConc",
                    title: "<b>{OldestappName}</b> holds the following permissions to access parts of your Google account. How **concerned** are you about the app accessing your account using these permissions?",
                    isRequired: true,
                    columns: [{
                            value: "Not concerned",
                            text: "Not <nobr>concerned</nobr>"
                        },
                        {
                            value: "Slightly concerned",
                            text: "<nobr>Slightly</nobr> <nobr>concerned</nobr>"
                        },
                        {
                            value: "Moderately concerned",
                            text: "<nobr>Moderately</nobr> <nobr>concerned</nobr>"
                        },
                        {
                            value: "Concerned",
                            text: "<nobr>Concerned</nobr>"
                        },
                        {
                            value: "Very concerned",
                            text: "<nobr>Very</nobr> <nobr>concerned</nobr>"
                        }
                    ],
                    rows: [],
                    isRequired: true,
                    isAllRowRequired: true
                }
            ],
            visibleIf: "{OldestPageVisible} = 'true'"
        }, {
            name: "OldestAppPage4",
            elements: [{
                    type: "html",
                    name: "OldestAppContext4",
                    html: OldestAppContext
                },
                {
                    type: "comment",
                    name: "OldestappDescribeConcern",
                    title: "Please describe any concerns you have about <b>{OldestappName}</b> holding these permissions.",
                    isRequired: true
                }
            ],
            visibleIf: "{OldestPageVisible} = 'true'"
        }, {
            name: "NewestAppPage1",
            elements: [{
                    type: "html",
                    name: "NewestAppContext1",
                    html: NewestAppContext
                },
                {
                    type: "radiogroup",
                    name: "NewestappRecall",
                    title: "Do you recall authorizing <b>{NewestappName}</b>?",
                    isRequired: true,
                    choices: [{
                            value: "Yes",
                            text: "Yes"
                        },
                        {
                            value: "No",
                            text: "No"
                        },
                        {
                            value: "Unsure",
                            text: "Unsure"
                        }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "NewestappLastUse",
                    title: "When was the last time you recall using <b>{NewestappName}</b>?",
                    isRequired: true,
                    choices: [{
                            value: "Today",
                            text: "Today"
                        },
                        {
                            value: "In the previous week",
                            text: "In the previous week"
                        },
                        {
                            value: "In the previous month",
                            text: "In the previous month"
                        },
                        {
                            value: "In the previous year",
                            text: "In the previous year"
                        },
                        {
                            value: "More than a year ago",
                            text: "More than a year ago"
                        },
                        {
                            value: "Unsure",
                            text: "Unsure"
                        }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "NewestappAwarePrior",
                    title: "Prior to seeing the details about <b>{NewestappName}</b>, were you aware this app had permission to access parts of your Google account data?",
                    isRequired: true,
                    choices: [{
                            value: "Yes",
                            text: "Yes"
                        },
                        {
                            value: "No",
                            text: "No"
                        },
                        {
                            value: "Unsure",
                            text: "Unsure"
                        }
                    ]
                },
                {
                    type: "matrix",
                    name: "NewestappAgreeMat",
                    title: "Please indicate how strongly you agree or disagree with the following:",
                    isRequired: true,
                    columns: [{
                            value: "Strongly disagree",
                            text: "<nobr>Strongly</nobr> <nobr>disagree</nobr>"
                        },
                        {
                            value: "Disagree",
                            text: "<nobr>Disagree</nobr>"
                        },
                        {
                            value: "Neither agree nor disagree",
                            text: "<nobr>Neither</nobr> <nobr>agree</nobr> nor <nobr>disagree</nobr>"
                        },
                        {
                            value: "Agree",
                            text: "<nobr>Agree</nobr>"
                        },
                        {
                            value: "Strongly agree",
                            text: "<nobr>Strongly</nobr> <nobr>agree</nobr>"
                        }
                    ],
                    rows: [{
                            value: "appBeneficialAccess",
                            text: "It's beneficial to me for <b>{NewestappName}</b> to have access to my Google account."
                        },
                        {
                            value: "appConcernAccess",
                            text: "I'm concerned with <b>{NewestappName}</b> having access to my Google account."
                        },
                        {
                            value: "appChangeAccess",
                            text: "I want to change which parts of my Google account that <b>{NewestappName}</b> can access."
                        },
                    ],
                    isRequired: true,
                    isAllRowRequired: true
                },
            ],
            visibleIf: "{NewestPageVisible} = 'true'"
        },
        {
            name: "NewestAppPage2Understand",
            elements: [{
                    type: "html",
                    name: "NewestAppContext2U",
                    html: NewestAppContext
                },
                {
                    type: "matrix",
                    name: "NewestappPermUnderstand",
                    title: "<b>{NewestappName}</b> holds the following permissions to access parts of your Google account. How **confident** are you that you understand what each permission allows the app to do?",
                    isRequired: true,
                    columns: [{
                            value: "Not confident",
                            text: "Not <nobr>confident</nobr>"
                        },
                        {
                            value: "Slightly confident",
                            text: "<nobr>Slightly</nobr> <nobr>confident</nobr>"
                        },
                        {
                            value: "Moderately confident",
                            text: "<nobr>Moderately</nobr> <nobr>confident</nobr>"
                        },
                        {
                            value: "Confident",
                            text: "<nobr>Confident</nobr>"
                        },
                        {
                            value: "Very confident",
                            text: "Very <nobr>confident</nobr>"
                        }
                    ],
                    rows: [],
                    isRequired: true,
                    isAllRowRequired: true
                }
            ],
            visibleIf: "{NewestPageVisible} = 'true'"
        },
        {
            name: "NewestAppPage2",
            elements: [{
                    type: "html",
                    name: "NewestAppContext2",
                    html: NewestAppContext
                },
                {
                    type: "matrix",
                    name: "NewestappPermNece",
                    title: "<b>{NewestappName}</b> holds the following permissions to access parts of your Google account. How **necessary** do you think each permission is for the app to function in a way that benefits you?",
                    isRequired: true,
                    columns: [{
                            value: "Not necessary",
                            text: "Not <nobr>necessary</nobr>"
                        },
                        {
                            value: "Slightly necessary",
                            text: "<nobr>Slightly</nobr> <nobr>necessary</nobr>"
                        },
                        {
                            value: "Moderately necessary",
                            text: "<nobr>Moderately</nobr> <nobr>necessary</nobr>"
                        },
                        {
                            value: "Necessary",
                            text: "<nobr>Necessary</nobr>"
                        },
                        {
                            value: "Very necessary",
                            text: "Very <nobr>necessary</nobr>"
                        }
                    ],
                    rows: [],
                    isRequired: true,
                    isAllRowRequired: true
                }
            ],
            visibleIf: "{NewestPageVisible} = 'true'"
        }, {
            name: "NewestAppPage3",
            elements: [{
                    type: "html",
                    name: "NewestAppContext3",
                    html: NewestAppContext
                },
                {
                    type: "matrix",
                    name: "NewestappPermConc",
                    title: "<b>{NewestappName}</b> holds the following permissions to access parts of your Google account. How **concerned** are you about the app accessing your account using these permissions?",
                    isRequired: true,
                    columns: [{
                            value: "Not concerned",
                            text: "Not <nobr>concerned</nobr>"
                        },
                        {
                            value: "Slightly concerned",
                            text: "<nobr>Slightly</nobr> <nobr>concerned</nobr>"
                        },
                        {
                            value: "Moderately concerned",
                            text: "<nobr>Moderately</nobr> <nobr>concerned</nobr>"
                        },
                        {
                            value: "Concerned",
                            text: "<nobr>Concerned</nobr>"
                        },
                        {
                            value: "Very concerned",
                            text: "<nobr>Very</nobr> <nobr>concerned</nobr>"
                        }
                    ],
                    rows: [],
                    isRequired: true,
                    isAllRowRequired: true
                }
            ],
            visibleIf: "{NewestPageVisible} = 'true'"
        }, {
            name: "NewestAppPage4",
            elements: [{
                    type: "html",
                    name: "NewestAppContext4",
                    html: NewestAppContext
                },
                {
                    type: "comment",
                    name: "NewestappDescribeConcern",
                    title: "Please describe any concerns you have about <b>{NewestappName}</b> holding these permissions.",
                    isRequired: true
                }
            ],
            visibleIf: "{NewestPageVisible} = 'true'"
        },
        {
            name: "RandomAppPage1",
            elements: [{
                    type: "html",
                    name: "RandomAppContext1",
                    html: RandomAppContext
                },
                {
                    type: "radiogroup",
                    name: "RandomappRecall",
                    title: "Do you recall authorizing <b>{RandomappName}</b>?",
                    isRequired: true,
                    choices: [{
                            value: "Yes",
                            text: "Yes"
                        },
                        {
                            value: "No",
                            text: "No"
                        },
                        {
                            value: "Unsure",
                            text: "Unsure"
                        }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "RandomappLastUse",
                    title: "When was the last time you recall using <b>{RandomappName}</b>?",
                    isRequired: true,
                    choices: [{
                            value: "Today",
                            text: "Today"
                        },
                        {
                            value: "In the previous week",
                            text: "In the previous week"
                        },
                        {
                            value: "In the previous month",
                            text: "In the previous month"
                        },
                        {
                            value: "In the previous year",
                            text: "In the previous year"
                        },
                        {
                            value: "More than a year ago",
                            text: "More than a year ago"
                        },
                        {
                            value: "Unsure",
                            text: "Unsure"
                        }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "RandomappAwarePrior",
                    title: "Prior to seeing the details about <b>{RandomappName}</b>, were you aware this app had permission to access parts of your Google account data?",
                    isRequired: true,
                    choices: [{
                            value: "Yes",
                            text: "Yes"
                        },
                        {
                            value: "No",
                            text: "No"
                        },
                        {
                            value: "Unsure",
                            text: "Unsure"
                        }
                    ]
                },
                {
                    type: "matrix",
                    name: "RandomappAgreeMat",
                    title: "Please indicate how strongly you agree or disagree with the following:",
                    isRequired: true,
                    columns: [{
                            value: "Strongly disagree",
                            text: "<nobr>Strongly</nobr> <nobr>disagree</nobr>"
                        },
                        {
                            value: "Disagree",
                            text: "<nobr>Disagree</nobr>"
                        },
                        {
                            value: "Neither agree nor disagree",
                            text: "<nobr>Neither</nobr> <nobr>agree nor</nobr> <nobr>disagree</nobr>"
                        },
                        {
                            value: "Agree",
                            text: "<nobr>Agree</nobr>"
                        },
                        {
                            value: "Strongly agree",
                            text: "<nobr>Strongly</nobr> <nobr>agree</nobr>"
                        }
                    ],
                    rows: [{
                            value: "appBeneficialAccess",
                            text: "It's beneficial to me for <b>{RandomappName}</b> to have access to my Google account."
                        },
                        {
                            value: "appConcernAccess",
                            text: "I'm concerned with <b>{RandomappName}</b> having access to my Google account."
                        },
                        {
                            value: "appChangeAccess",
                            text: "I want to change which parts of my Google account that <b>{RandomappName}</b> can access."
                        },
                    ],
                    isRequired: true,
                    isAllRowRequired: true
                },
            ],
            visibleIf: "{RandomPageVisible} = 'true'"
        },
        {
            name: "RandomAppPage2Understand",
            elements: [{
                    type: "html",
                    name: "RandomAppContext2U",
                    html: RandomAppContext
                },
                {
                    type: "matrix",
                    name: "RandomappPermUnderstand",
                    title: "<b>{RandomappName}</b> holds the following permissions to access parts of your Google account. How **confident** are you that you understand what each permission allows the app to do?",
                    isRequired: true,
                    columns: [{
                            value: "Not confident",
                            text: "Not <nobr>confident</nobr>"
                        },
                        {
                            value: "Slightly confident",
                            text: "<nobr>Slightly</nobr> <nobr>confident</nobr>"
                        },
                        {
                            value: "Moderately confident",
                            text: "<nobr>Moderately</nobr> <nobr>confident</nobr>"
                        },
                        {
                            value: "Confident",
                            text: "<nobr>Confident</nobr>"
                        },
                        {
                            value: "Very confident",
                            text: "Very <nobr>confident</nobr>"
                        }
                    ],
                    rows: [],
                    isRequired: true,
                    isAllRowRequired: true
                }
            ],
            visibleIf: "{RandomPageVisible} = 'true'"
        },
        {
            name: "RandomAppPage2",
            elements: [{
                    type: "html",
                    name: "RandomAppContext2",
                    html: RandomAppContext
                },
                {
                    type: "matrix",
                    name: "RandomappPermNece",
                    title: "<b>{RandomappName}</b> holds the following permissions to access parts of your Google account. How **necessary** do you think each permission is for the app to function in a way that benefits you?",
                    isRequired: true,
                    columns: [{
                            value: "Not necessary",
                            text: "Not <nobr>necessary</nobr>"
                        },
                        {
                            value: "Slightly necessary",
                            text: "<nobr>Slightly</nobr> <nobr>necessary</nobr>"
                        },
                        {
                            value: "Moderately necessary",
                            text: "<nobr>Moderately</nobr> <nobr>necessary</nobr>"
                        },
                        {
                            value: "Necessary",
                            text: "<nobr>Necessary</nobr>"
                        },
                        {
                            value: "Very necessary",
                            text: "Very <nobr>necessary</nobr>"
                        }
                    ],
                    rows: [],
                    isRequired: true,
                    isAllRowRequired: true
                }
            ],
            visibleIf: "{RandomPageVisible} = 'true'"
        }, {
            name: "RandomAppPage3",
            elements: [{
                    type: "html",
                    name: "RandomAppContext3",
                    html: RandomAppContext
                },
                {
                    type: "matrix",
                    name: "RandomappPermConc",
                    title: "<b>{RandomappName}</b> holds the following permissions to access parts of your Google account. How **concerned** are you about the app accessing your account using these permissions?",
                    isRequired: true,
                    columns: [{
                            value: "Not concerned",
                            text: "Not <nobr>concerned</nobr>"
                        },
                        {
                            value: "Slightly concerned",
                            text: "<nobr>Slightly</nobr> <nobr>concerned</nobr>"
                        },
                        {
                            value: "Moderately concerned",
                            text: "<nobr>Moderately</nobr> <nobr>concerned</nobr>"
                        },
                        {
                            value: "Concerned",
                            text: "<nobr>Concerned</nobr>"
                        },
                        {
                            value: "Very concerned",
                            text: "<nobr>Very</nobr> <nobr>concerned</nobr>"
                        }
                    ],
                    rows: [],
                    isRequired: true,
                    isAllRowRequired: true
                }
            ],
            visibleIf: "{RandomPageVisible} = 'true'"
        }, {
            name: "RandomAppPage4",
            elements: [{
                    type: "html",
                    name: "RandomAppContext4",
                    html: RandomAppContext
                },
                {
                    type: "comment",
                    name: "RandomappDescribeConcern",
                    title: "Please describe any concerns you have about <b>{RandomappName}</b> holding these permissions.",
                    isRequired: true
                }
            ],
            visibleIf: "{RandomPageVisible} = 'true'"
        },
        {
            name: "ReflectionPage",
            elements: [{
                    type: "html",
                    name: "ReflectionPageContext",
                    html: ReflectionPageContext
                },
                {
                    type: "radiogroup",
                    name: "BetterUnderstandLink",
                    title: "The \"Apps with access to your account\" page helps me to better understand which third-party apps and websites are linked to my Google account.",
                    isRequired: true,
                    choices: [{
                            value: "Strongly disagree",
                            text: "Strongly disagree"
                        },
                        {
                            value: "Disagree",
                            text: "Disagree"
                        },
                        {
                            value: "Neither agree nor disagree",
                            text: "Neither agree nor disagree"
                        },
                        {
                            value: "Agree",
                            text: "Agree"
                        },
                        {
                            value: "Strongly agree",
                            text: "Strongly agree"
                        }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "BetterUnderstandAccess",
                    title: "The \"Apps with access to your account\" page helps me to better understand what parts of my Google account third-party apps can access.",
                    isRequired: true,
                    choices: [{
                            value: "Strongly disagree",
                            text: "Strongly disagree"
                        },
                        {
                            value: "Disagree",
                            text: "Disagree"
                        },
                        {
                            value: "Neither agree nor disagree",
                            text: "Neither agree nor disagree"
                        },
                        {
                            value: "Agree",
                            text: "Agree"
                        },
                        {
                            value: "Strongly agree",
                            text: "Strongly agree"
                        }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "ChangeSettings",
                    title: "After completing this survey, do you see yourself changing any settings on your \"Apps with access to your account\" page?",
                    isRequired: true,
                    choices: [{
                            value: "Yes",
                            text: "Yes"
                        },
                        {
                            value: "No",
                            text: "No"
                        },
                        {
                            value: "Unsure",
                            text: "Unsure"
                        }
                    ]
                }, {
                    type: "radiogroup",
                    name: "SixMonthReview",
                    title: "In six months do you see yourself reviewing  third-party apps from your \"Apps with access to your account\" page?",
                    isRequired: true,
                    choices: [{
                            value: "Yes",
                            text: "Yes"
                        },
                        {
                            value: "No",
                            text: "No"
                        },
                        {
                            value: "Unsure",
                            text: "Unsure"
                        }
                    ]
                }
            ]
        },
        {
            name: "ChangeSettingsFeedbackPage",
            elements: [{
                type: "comment",
                name: "ChangeSettingsWhich",
                title: "You have indicated that you would change settings on your \"Apps with access to your account\" page. Please describe which settings would you change.",
                isRequired: true,
                visibleIf: "{ChangeSettings} = 'Yes'"
            }, {
                type: "comment",
                name: "SixMonthLookFor",
                title: "What would you look for when you review the \"Apps with access to your account\" page in six months? ",
                isRequired: true,
                visibleIf: "{SixMonthReview} = 'Yes'"
            }],
            visibleIf: "{ChangeSettings} = 'Yes' or {SixMonthReview} = 'Yes'"
        },
        {
            name: "FutureDesignPage1",
            elements: [{
                    type: "html",
                    name: "ReflectionPageContext2",
                    html: ReflectionPageContext
                }, {
                    type: "comment",
                    name: "AddFeatures",
                    title: "What new features (if any) would you like to add to the \"Apps with access to your account\" page?",
                    isRequired: true
                },
                {
                    type: "radiogroup",
                    name: "OftenRemind",
                    title: "Suppose Google sent an email reminder to review your \"Apps with access to your account\" page. How often would you like to be reminded?",
                    choices: [
                        "Once a week",
                        "Once a month",
                        "Once a year",
                        "Once every three years",
                        "I do not want to be reminded"
                    ],
                    isRequired: true
                },
                {
                    type: "radiogroup",
                    name: "OftenReapprove",
                    title: "Suppose Google required you to reapprove the third-party apps on your Google account. How often would you like to reapprove apps?",
                    choices: [
                        "Once a week",
                        "Once a month",
                        "Once a year",
                        "Once every three years",
                        "I do not want to reapprove apps"
                    ],
                    isRequired: true
                },
                {
                    type: "radiogroup",
                    name: "WhichIsCold",
                    title: "Which of these is cold?",
                    isRequired: true,
                    choices: [{
                            value: "Fire",
                            text: "Fire"
                        },
                        {
                            value: "Summer",
                            text: "Summer"
                        },
                        {
                            value: "Lava",
                            text: "Lava"
                        },
                        {
                            value: "Ice cream",
                            text: "Ice cream"
                        }
                    ]
                }
            ]
        },
        {
            name: "FutureDesignPage2",
            elements: [{
                    type: "radiogroup",
                    name: "SeekApproval",
                    title: "Rather than approve all permissions when installing third-party apps, I would want third-party apps to seek my approval each time they access my Google account. ",
                    choices: [
                        "Strongly disagree",
                        "Disagree",
                        "Neither agree nor disagree",
                        "Agree",
                        "Strongly agree"
                    ],
                    isRequired: true
                },
                {
                    type: "radiogroup",
                    name: "BlockSpecificData",
                    title: "I would want to designate specific data (eg. certain emails, individual contacts, particular calendar events) as private and inaccessible to third-party apps.",
                    choices: [
                        "Strongly disagree",
                        "Disagree",
                        "Neither agree nor disagree",
                        "Agree",
                        "Strongly agree"
                    ],
                    isRequired: true
                }
            ]
        }
    ],
    cookieName: "api-priv-main-survey",
    sendResultOnPageNext: true,
    showPrevButton: false,
    showQuestionNumbers: "off",
    showProgressBar: "both",
    firstPageIsStarted: true
};