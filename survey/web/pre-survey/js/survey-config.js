let preSurveyJson = {
    title: "Google API Survey",
    focusFirstQuestionAutomatic: false,
    completedHtml: successfulCompletionMessagePreSurvey + feedbackForm + redirectToProlific,
    completedHtmlOnCondition: [{
        expression: "{hasWithdrawn} = true",
        html: withdrawnCompletionMessage + feedbackForm
    }],
    pages: [{
            name: "consentPage",
            elements: [{
                    type: "html",
                    name: "informedConsentText",
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
        },
        {
            name: "HaveGmailPage",
            elements: [{
                type: "radiogroup",
                name: "haveGmail",
                title: "Do you have a Gmail (Google) account?",
                isRequired: true,
                choices: [{
                        value: "Yes",
                        text: "Yes"
                    },
                    {
                        value: "No",
                        text: "No"
                    }
                ]
            }]
        },
        {
            name: "GoogleSSOPage",
            elements: [{
                type: "html",
                name: "Single Sign On",
                html: googleLoginPage
            }, {
                type: "radiogroup",
                name: "PrimaryEmail",
                title: `Do you use {SSOEmailAddress} as your primary Gmail (Google) account`,
                isRequired: true,
                choices: [{
                        value: "Yes",
                        text: "Yes"
                    },
                    {
                        value: "No, I use a different Gmail (Google) account as my primary account",
                        text: "No, I use a different Gmail (Google) account as my primary account"
                    }
                ],
                visibleIf: "{isSignedIn}='true'",
                enableIf: "{isSignedIn} = 'true'",
            }],
            visibleIf: "{haveGmail}='Yes'"
        },
        {
            name: "GAcctVerificationPage",
            elements: [{
                    type: "radiogroup",
                    name: "whoseGmail",
                    title: "Whose Gmail address is it?",
                    isRequired: true,
                    choices: [{
                            value: "Own Account",
                            text: "It is my own account / I have sole ownership of this account."
                        },
                        {
                            value: "Institutional Account",
                            text: "It is an institutional account / A business, school, or organization gave it to me."
                        },
                        {
                            value: "Shared Account",
                            text: "It is my shared account / I share the account with someone else (e.g., a partner or family member)."
                        },
                        {
                            value: "Someone Else",
                            text: "It is someone else’s account / someone else has sole ownership of this account."
                        }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "howLongGmail",
                    title: "How long have you had this Gmail address as your primary Gmail (Google) account?",
                    isRequired: true,
                    choices: [{
                            value: "Less than 1 month",
                            text: "Less than 1 month"
                        },
                        {
                            value: "Less than or about 1 year",
                            text: "Less than or about 1 year"
                        },
                        {
                            value: "Less than or about 5 years",
                            text: "Less than or about 5 years"
                        },
                        {
                            value: "Less than or about 10 years",
                            text: "Less than or about 10 years"
                        },
                        {
                            value: "More than 10 years",
                            text: "More than 10 years"
                        },
                        {
                            value: "Unsure",
                            text: "Unsure"
                        }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "RedBallRed",
                    title: "What is the color of a red ball?",
                    isRequired: true,
                    choices: [{
                            value: "Red",
                            text: "Red"
                        },
                        {
                            value: "Round",
                            text: "Round"
                        },
                        {
                            value: "Blue",
                            text: "Blue"
                        },
                        {
                            value: "Square",
                            text: "Square"
                        }
                    ]
                }
            ],
            visibleIf: "{PrimaryEmail} = 'Yes'"
        },
        {
            name: "GoogleSSOContextPage",
            elements: [{
                    type: "html",
                    name: "GoogleSSOContext",
                    html: googleSSOContext
                },
                {
                    type: "radiogroup",
                    name: "GRecallThirdPartySSO",
                    title: "Do you recall ever using your Google Account to sign in to third-party apps or services as described above?",
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
            ],
            visibleIf: "{PrimaryEmail} = 'Yes'"
        },
        {
            name: "GoogleSSOContextPage2",
            elements: [{
                    type: "comment",
                    name: "GThirdPartySSO",
                    visibleIf: "{GRecallThirdPartySSO} = 'Yes'",
                    title: "Thinking about the last time you used your Google Account to sign into a third-party app or service, what app or service did you use your Google Account to sign into?",
                    isRequired: true
                },
                {
                    type: "comment",
                    name: "GConsideredBeforeSSO",
                    visibleIf: "{GRecallThirdPartySSO} = 'Yes'",
                    title: " Thinking about the last time you used your Google Account to sign into a third-party app or service, what did you consider before signing in using your Google Account?",
                    isRequired: true
                },
                {
                    type: "comment",
                    name: "GFactorsToConsiderSSO",
                    visibleIf: "{GRecallThirdPartySSO} = 'No' or {GRecallThirdPartySSO} = 'Unsure'",
                    title: "If you were given the option to use your Google account to sign into a third-party app or service, what would you consider before using this feature?",
                    isRequired: true
                }
            ],
            visibleIf: "{PrimaryEmail} = 'Yes'"
        },
        {
            name: "GoogleThirdPartyContextPage",
            elements: [{
                    type: "html",
                    name: "GoogleThirdPartyContext",
                    html: googleThirdPartyContext
                },
                {
                    type: "radiogroup",
                    name: "GRecallThirdPartyAccess",
                    title: "Do you recall ever granting a third-party app access your Google Account as described above?",
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
            ],
            visibleIf: "{PrimaryEmail} = 'Yes'"
        },
        {
            name: "GoogleThirdPartyContextPage2",
            elements: [{
                    type: "comment",
                    name: "GAccessPurpose",
                    visibleIf: "{GRecallThirdPartyAccess} = 'Yes'",
                    title: "Thinking about the last time you granted a third-party app access to your Google Account, what was the purpose of allowing that access?",
                    isRequired: true
                },
                {
                    type: "comment",
                    name: "GConsideredBeforeAccess",
                    visibleIf: "{GRecallThirdPartyAccess} = 'Yes'",
                    title: "Thinking about the last time you granted a third-party app access to your Google Account, what did you consider before granting a third-party app access to your Google account?",
                    isRequired: true
                },
                {
                    type: "comment",
                    name: "GFactorsToConsiderAccess",
                    visibleIf: "{GRecallThirdPartyAccess} = 'No' or {GRecallThirdPartyAccess} = 'Unsure'",
                    title: "If you were given the option to grant a third-party app access to your Google Account, what would you consider before granting access?",
                    isRequired: true
                }
            ],
            visibleIf: "{PrimaryEmail} = 'Yes'"
        },
        {
            name: "GenericSSOContextPage",
            elements: [{
                    type: "html",
                    name: "GenericSSOContext",
                    html: genericSSOContext
                },
                {
                    type: "radiogroup",
                    name: "GenericRecallThirdPartySSO",
                    title: "Do you recall ever using an existing online account to sign in to a third-party app or service as described above?",
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
            ],
            visibleIf: "{haveGmail} = 'No'"
        },
        {
            name: "GenericSSOContextPage2",
            elements: [{
                type: "comment",
                name: "GenericThirdPartySSO",
                visibleIf: "{GenericRecallThirdPartySSO} = 'Yes'",
                title: "Thinking about the last time you used an existing online account to sign into a third-party app or service, what app or service did you sign into?",
                isRequired: true
            }, {
                type: "comment",
                name: "GenericWhatAccountSSO",
                visibleIf: "{GenericRecallThirdPartySSO} = 'Yes'",
                title: "Thinking about the last time you used an existing online account to sign into a third-party app or service, what online account did you use?",
                isRequired: true
            }, {
                type: "comment",
                name: "GenericConsideredBeforeSSO",
                visibleIf: "{GenericRecallThirdPartySSO} = 'Yes'",
                title: "Thinking about the last time you used an existing online account to sign into a third-party app or service, what did you consider before signing in using that existing online account?",
                isRequired: true
            }, {
                type: "comment",
                name: "GenericWhatAccountToUse",
                visibleIf: "{GenericRecallThirdPartySSO} = 'No' or {GenericRecallThirdPartySSO} = 'Unsure'",
                title: "If you were given the option to use an existing online account to sign into a third-party app or service, what online account would you use?",
                isRequired: true
            }, {
                type: "comment",
                name: "GenericFactorsToConsiderSSO",
                visibleIf: "{GenericRecallThirdPartySSO} = 'No' or {GenericRecallThirdPartySSO} = 'Unsure'",
                title: "If you were given the option to use an existing online account to sign into a third-party app or service, what would you consider before using this feature?",
                isRequired: true
            }],
            visibleIf: "{haveGmail} = 'No'"
        },
        {
            name: "GenericThirdPartyContextPage",
            elements: [{
                    type: "html",
                    name: "GenericThirdPartyContext",
                    html: genericThirdPartyContext
                },
                {
                    type: "radiogroup",
                    name: "GenericRecallThirdPartyAccess",
                    title: "Do you recall ever granting a third-party app access to one of your online accounts as described above?",
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
            ],
            visibleIf: "{haveGmail} = 'No'"
        },
        {
            name: "GenericThirdPartyContextPage2",
            elements: [{
                    type: "comment",
                    name: "GenericAccessPurpose",
                    visibleIf: "{GenericRecallThirdPartyAccess} = 'Yes'",
                    title: "Thinking about the last time you granted a third-party app access to one of your online accounts, what was the purpose of allowing that access?",
                    isRequired: true
                },
                {
                    type: "comment",
                    name: "GenericConsideredBeforeAccess",
                    visibleIf: "{GenericRecallThirdPartyAccess} = 'Yes'",
                    title: "Thinking about the last time you granted a third-party app access to one of your online accounts, what did you consider before granting a third-party app access to one of your online accounts?",
                    isRequired: true
                },
                {
                    type: "comment",
                    name: "GenericFactorsToConsiderAccess",
                    visibleIf: "{GenericRecallThirdPartyAccess} = 'No' or {GenericRecallThirdPartyAccess} = 'Unsure'",
                    title: "If you were given the option to grant a third-party app access to one of your online accounts, what would you consider before granting access?",
                    isRequired: true
                }
            ],
            visibleIf: "{haveGmail} = 'No'"
        },
        {
            name: "IUIPCPage1",
            elements: [{
                    type: "radiogroup",
                    name: "IUIPC_controlAndAutonomy",
                    title: "Consumer online privacy is really a matter of consumers' right to exercise control and autonomy over decisions about how their information is collected, used, and shared.",
                    isRequired: true,
                    choices: [{
                            value: "Strongly disagree",
                            text: "<nobr>Strongly disagree</nobr>"
                        },
                        {
                            value: "Disagree",
                            text: "<nobr>Disagree</nobr>"
                        },
                        {
                            value: "Somewhat disagree",
                            text: "<nobr>Somewhat disagree</nobr>"
                        },
                        {
                            value: "Neither agree nor disagree",
                            text: "<nobr>Neither agree nor disagree</nobr>"
                        },
                        {
                            value: "Somewhat agree",
                            text: "<nobr>Somewhat agree</nobr>"
                        },
                        {
                            value: "Agree",
                            text: "<nobr>Agree</nobr>"
                        },
                        {
                            value: "Strongly agree",
                            text: "<nobr>Strongly agree</nobr>"
                        }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "IUIPC_controlLiesAtHeart",
                    title: "Consumer control of personal information lies at the heart of consumer privacy.",
                    isRequired: true,
                    choices: [{
                            value: "Strongly disagree",
                            text: "<nobr>Strongly disagree</nobr>"
                        },
                        {
                            value: "Disagree",
                            text: "<nobr>Disagree</nobr>"
                        },
                        {
                            value: "Somewhat disagree",
                            text: "<nobr>Somewhat disagree</nobr>"
                        },
                        {
                            value: "Neither agree nor disagree",
                            text: "<nobr>Neither agree nor disagree</nobr>"
                        },
                        {
                            value: "Somewhat agree",
                            text: "<nobr>Somewhat agree</nobr>"
                        },
                        {
                            value: "Agree",
                            text: "<nobr>Agree</nobr>"
                        },
                        {
                            value: "Strongly agree",
                            text: "<nobr>Strongly agree</nobr>"
                        }
                    ]
                }
            ],
            'title': 'Please indicate to what extent you agree with each of the following statements.'
        },
        {
            name: "IUIPCPage2",
            elements: [{
                    type: "radiogroup",
                    name: "IUIPC_awarenessDisclose",
                    title: "Companies seeking information online should disclose the way the data are collected, processed, and used.",
                    isRequired: true,
                    choices: [{
                            value: "Strongly disagree",
                            text: "<nobr>Strongly disagree</nobr>"
                        },
                        {
                            value: "Disagree",
                            text: "<nobr>Disagree</nobr>"
                        },
                        {
                            value: "Somewhat disagree",
                            text: "<nobr>Somewhat disagree</nobr>"
                        },
                        {
                            value: "Neither agree nor disagree",
                            text: "<nobr>Neither agree nor disagree</nobr>"
                        },
                        {
                            value: "Somewhat agree",
                            text: "<nobr>Somewhat agree</nobr>"
                        },
                        {
                            value: "Agree",
                            text: "<nobr>Agree</nobr>"
                        },
                        {
                            value: "Strongly agree",
                            text: "<nobr>Strongly agree</nobr>"
                        }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "IUIPC_awarenessClearDisclosure",
                    title: "A good consumer online privacy policy should have a clear and conspicuous disclosure.",
                    isRequired: true,
                    choices: [{
                            value: "Strongly disagree",
                            text: "<nobr>Strongly disagree</nobr>"
                        },
                        {
                            value: "Disagree",
                            text: "<nobr>Disagree</nobr>"
                        },
                        {
                            value: "Somewhat disagree",
                            text: "<nobr>Somewhat disagree</nobr>"
                        },
                        {
                            value: "Neither agree nor disagree",
                            text: "<nobr>Neither agree nor disagree</nobr>"
                        },
                        {
                            value: "Somewhat agree",
                            text: "<nobr>Somewhat agree</nobr>"
                        },
                        {
                            value: "Agree",
                            text: "<nobr>Agree</nobr>"
                        },
                        {
                            value: "Strongly agree",
                            text: "<nobr>Strongly agree</nobr>"
                        }
                    ]
                }
            ],
            'title': 'Please indicate to what extent you agree with each of the following statements.'
        },
        {
            name: "IUIPCPage3",
            elements: [{
                    type: "radiogroup",
                    name: "IUIPC_collectionBotherWhenever",
                    title: "It usually bothers me when online companies ask me for personal information.",
                    isRequired: true,
                    choices: [{
                            value: "Strongly disagree",
                            text: "<nobr>Strongly disagree</nobr>"
                        },
                        {
                            value: "Disagree",
                            text: "<nobr>Disagree</nobr>"
                        },
                        {
                            value: "Somewhat disagree",
                            text: "<nobr>Somewhat disagree</nobr>"
                        },
                        {
                            value: "Neither agree nor disagree",
                            text: "<nobr>Neither agree nor disagree</nobr>"
                        },
                        {
                            value: "Somewhat agree",
                            text: "<nobr>Somewhat agree</nobr>"
                        },
                        {
                            value: "Agree",
                            text: "<nobr>Agree</nobr>"
                        },
                        {
                            value: "Strongly agree",
                            text: "<nobr>Strongly agree</nobr>"
                        }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "IUIPC_collectionThinkTwice",
                    title: "When online companies ask me for personal information, I sometimes think twice before providing it.",
                    isRequired: true,
                    choices: [{
                            value: "Strongly disagree",
                            text: "<nobr>Strongly disagree</nobr>"
                        },
                        {
                            value: "Disagree",
                            text: "<nobr>Disagree</nobr>"
                        },
                        {
                            value: "Somewhat disagree",
                            text: "<nobr>Somewhat disagree</nobr>"
                        },
                        {
                            value: "Neither agree nor disagree",
                            text: "<nobr>Neither agree nor disagree</nobr>"
                        },
                        {
                            value: "Somewhat agree",
                            text: "<nobr>Somewhat agree</nobr>"
                        },
                        {
                            value: "Agree",
                            text: "<nobr>Agree</nobr>"
                        },
                        {
                            value: "Strongly agree",
                            text: "<nobr>Strongly agree</nobr>"
                        }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "IUIPC_collectionBothersSoMany",
                    title: "It bothers me to give personal information to so many online companies.",
                    isRequired: true,
                    choices: [{
                            value: "Strongly disagree",
                            text: "<nobr>Strongly disagree</nobr>"
                        },
                        {
                            value: "Disagree",
                            text: "<nobr>Disagree</nobr>"
                        },
                        {
                            value: "Somewhat disagree",
                            text: "<nobr>Somewhat disagree</nobr>"
                        },
                        {
                            value: "Neither agree nor disagree",
                            text: "<nobr>Neither agree nor disagree</nobr>"
                        },
                        {
                            value: "Somewhat agree",
                            text: "<nobr>Somewhat agree</nobr>"
                        },
                        {
                            value: "Agree",
                            text: "<nobr>Agree</nobr>"
                        },
                        {
                            value: "Strongly agree",
                            text: "<nobr>Strongly agree</nobr>"
                        }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "IUIPC_collectionTooMuch",
                    title: "I'm concerned that online companies are collecting too much personal information about me.",
                    isRequired: true,
                    choices: [{
                            value: "Strongly disagree",
                            text: "<nobr>Strongly disagree</nobr>"
                        },
                        {
                            value: "Disagree",
                            text: "<nobr>Disagree</nobr>"
                        },
                        {
                            value: "Somewhat disagree",
                            text: "<nobr>Somewhat disagree</nobr>"
                        },
                        {
                            value: "Neither agree nor disagree",
                            text: "<nobr>Neither agree nor disagree</nobr>"
                        },
                        {
                            value: "Somewhat agree",
                            text: "<nobr>Somewhat agree</nobr>"
                        },
                        {
                            value: "Agree",
                            text: "<nobr>Agree</nobr>"
                        },
                        {
                            value: "Strongly agree",
                            text: "<nobr>Strongly agree</nobr>"
                        }
                    ]
                }
            ],
            'title': 'Please indicate to what extent you agree with each of the following statements.'
        },
        {
            name: "DemographicsPage",
            elements: [{
                    type: "radiogroup",
                    name: "Demo_gender",
                    title: "What is your gender?",
                    isRequired: true,
                    choices: [{
                            value: "Woman",
                            text: "Woman"
                        },
                        {
                            value: "Man",
                            text: "Man"
                        },
                        {
                            value: "Non-binary",
                            text: "Non-binary"
                        },
                        {
                            value: "Prefer not to disclose",
                            text: "Prefer not to disclose"
                        }
                    ],
                    hasOther: true,
                    otherText: "Prefer to self-describe"
                },
                {
                    type: "radiogroup",
                    name: "Demo_age",
                    title: "How old are you?",
                    isRequired: true,
                    choices: [{
                            value: "18 - 24",
                            text: "18 - 24"
                        },
                        {
                            value: "25 - 34",
                            text: "25 - 34"
                        },
                        {
                            value: "35 - 44",
                            text: "35 - 44"
                        },
                        {
                            value: "45 - 54",
                            text: "45 - 54"
                        },
                        {
                            value: "55 - 64",
                            text: "55 - 64"
                        },
                        {
                            value: "65 or older",
                            text: "65 or older"
                        },
                        {
                            value: "Prefer not to disclose",
                            text: "Prefer not to disclose"
                        }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "Demo_edu",
                    title: "What is the highest degree or level of school you have completed?",
                    isRequired: true,
                    choices: [{
                            value: "No schooling completed",
                            text: "No schooling completed"
                        },
                        {
                            value: "Some high school",
                            text: "Some high school"
                        },
                        {
                            value: "High school",
                            text: "High school"
                        },
                        {
                            value: "Some college",
                            text: "Some college"
                        },
                        {
                            value: "Trade, technical, or vocational training",
                            text: "Trade, technical, or vocational training"
                        },
                        {
                            value: "Associate's Degree",
                            text: "Associate's Degree"
                        },
                        {
                            value: "Bachelor's Degree",
                            text: "Bachelor's Degree"
                        },
                        {
                            value: "Master's Degree",
                            text: "Master's Degree"
                        },
                        {
                            value: "Professional degree",
                            text: "Professional degree"
                        },
                        {
                            value: "Doctorate",
                            text: "Doctorate"
                        },
                        {
                            value: "Prefer not to disclose",
                            text: "Prefer not to disclose"
                        }
                    ],
                    hasOther: true,
                    otherText: "Other (please specify)"
                },
                {
                    type: "radiogroup",
                    name: "Demo_background",
                    title: "Which of the following best describes your educational background or job field?",
                    isRequired: true,
                    choices: [{
                            value: "I have an education in, or work in, the field of computer science, computer engineering or IT.",
                            text: "I have an education in, or work in, the field of computer science, computer engineering or IT."
                        },
                        {
                            value: "I do not have an education in, nor do I work in, the field of computer science, computer engineering or IT.",
                            text: "I do not have an education in, nor do I work in, the field of computer science, computer engineering or IT."
                        },
                        {
                            value: "Prefer not to disclose",
                            text: "Prefer not to disclose"
                        }
                    ]
                }
            ]
        }
    ],
    cookieName: "api-priv-pre-survey",
    sendResultOnPageNext: true,
    showPrevButton: false,
    showQuestionNumbers: "off",
    showProgressBar: "off",
    firstPageIsStarted: true
};