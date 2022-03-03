# R data

This folder contains tabular survey data for analysis in R.

## Pre-survey

### PreSurveyDataR.csv

This file contains data for the non-free-response questions in the pre-survey.

| Header label | Survey question                                                                                                                                                                            |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `participant_id`      | _(automatically generated participant identifier)_                                                                                                                                |
| `have_gmail`          | Q<sub>1</sub>1 Do you have a Gmail (Google) account?                                                                                                                              |
| `google_primary`      | Q<sub>1</sub>2 Do you use {participant email address} as your primary Gmail (Google) account?                                                                                     |
| `google_owner`        | Q<sub>1</sub>3 Whose Gmail address is it?                                                                                                                                         |
| `google_how_long`     | Q<sub>1</sub>4 How long have you had this Gmail address as your primary Gmail (Google) account?                                                                                   |
| `google_recall_app`   | Q<sub>1</sub>10 (**Fig. 1**) Do you recall ever granting a third-party app access to your Google Account as described above?                                                                   |
| `google_recall_sso`   | Q<sub>1</sub>6 (**Fig. 1**) Do you recall ever using your Google Account to sign in to third-party apps or services as described above?                                                        |
| `generic_recall_app`  | _(blank because all participants were Google users)_                                                                                                                              |
| `generic_recall_sso`  | _(blank because all participants were Google users)_                                                                                                                              |
| `iuipcQ1`             | IUIPC1 Consumer online privacy is really a matter of consumers' right to exercise control and autonomy over decisions about how their information is collected, used, and shared. |
| `iuipcQ2`             | IUIPC2 Consumer control of personal information lies at the heart of consumer privacy.                                                                                            |
| `iuipcQ3`             | IUIPC3 Companies seeking information online should disclose the way the data are collected, processed, and used.                                                                  |
| `iuipcQ4`             | IUIPC4 A good consumer online privacy policy should have a clear and conspicuous disclosure.                                                                                      |
| `iuipcQ5`             | IUIPC5 It usually bothers me when online companies ask me for personal information.                                                                                               |
| `iuipcQ6`             | IUIPC6 When online companies ask me for personal information, I sometimes think twice before providing it.                                                                        |
| `iuipcQ7`             | IUIPC7 It bothers me to give personal information to so many online companies.                                                                                                    |
| `iuipcQ8`             | IUIPC8 I'm concerned that online companies are collecting too much personal information about me.                                                                                 |
| `gender`              | D1 What is your gender?                                                                                                                                                           |
| `age`                 | D2 What is your age?                                                                                                                                                              |
| `education`           | D3 What is the highest degree or level of school you have completed?                                                                                                              |
| `background`          | D4 Which of the following best describes your educational background or job field?                                                                                                |

## Main survey

### MainSurveyDataR.csv and MainSurveyExtendedDataR.csv

This file contains data for the non-free-response questions in the main survey.

| Header label                              | Survey question |
|-------------------------------------------|---|
| `participant_id`                          | _(automatically generated participant identifier)_ |
| `sso_how_secure`                          | Q<sub>2</sub>1 (**Fig. 8**) You have {n} third-party apps and services that you can **sign into using your Google account**. Before using my Google account to sign into a website or third-party app, I consider how secure an app or website is. |
| `sso_how_data_used`                       | Q<sub>2</sub>1 (**Fig. 8**) _(same as above)_ ...I consider how the app or website will use your data. |
| `sso_whether_delete`                      | Q<sub>2</sub>1 (**Fig. 8**) _(same as above)_ ...I consider whether you can delete your data from the app or website. |
| `sso_whether_tell_change`                 | Q<sub>2</sub>1 (**Fig. 8**) _(same as above)_ ...I consider whether the app or website will tell you if something changes. |
| `sso_who_else`                            | Q<sub>2</sub>1 (**Fig. 8**) _(same as above)_ ...I consider who else can see your data on the app or website. |
| `sso_how_often_review`                    | Q<sub>2</sub>2 (**Fig. 9**) How often do you review what services you can sign into using your Google account? |
| `app_how_secure`                          | Q<sub>2</sub>3 (**Fig. 8**) You have {n} third-party apps and services that **have access to your Google account data**. Before granting a website or third-party app access to my Google account, I consider how secure the app or website is. |
| `app_how_data_used`                       | Q<sub>2</sub>3 (**Fig. 8**) _(same as above)_ ...I consider how the app or website will use your data. |
| `app_whether_delete`                      | Q<sub>2</sub>3 (**Fig. 8**) _(same as above)_ ...I consider whether you can delete your data from the app or website. |
| `app_whether_tell_change`                 | Q<sub>2</sub>3 (**Fig. 8**) _(same as above)_ ...I consider whether the app or website will tell you if something changes. |
| `app_who_else`                            | Q<sub>2</sub>3 (**Fig. 8**) _(same as above)_ ...I consider who else can see your data on the app or website. |
| `app_what_part_access`                    | Q<sub>2</sub>3 (**Fig. 8**) _(same as above)_ ...I consider what parts of your account the app or website can access. |
| `app_how_often_review`                    | Q<sub>2</sub>4 (**Fig. 9**) How often do you review what services have access to your Google account? |
| `keep_choice_newest_app`                  | _(if the participant has at least 1 app, then for the newest app...)_ Q<sub>2</sub>5 (**Fig. 2**) The following apps are authorized to access various parts of your Google account. Which of these apps would you prefer to keep on your account? Which would you prefer to remove? |
| `recall_newest_app`                       | _(if the participant has at least 1 app, then for the newest app...)_ Q<sub>2</sub>7 (**Fig. 2**) Do you recall authorizing {app name}? |
| `last_use_newest_app`                     | _(if the participant has at least 1 app, then for the newest app...)_ Q<sub>2</sub>8 (**Fig. 3**) When was the last time you recall using {app name}? |
| `aware_prior_newest_app`                  | _(if the participant has at least 1 app, then for the newest app...)_ Q<sub>2</sub>9 (**Fig. 2**) Prior to seeing the details about {app name}, were you aware this app had permission to access parts of your Google account data? |
| `access_beneficial_newest_app`            | _(if the participant has at least 1 app, then for the newest app...)_ Q<sub>2</sub>10 (**Fig. 4**) It's beneficial for {app name} to have access to my Google account. |
| `access_concerned_newest_app`             | _(if the participant has at least 1 app, then for the newest app...)_ Q<sub>2</sub>10 (**Fig. 4**) I'm concerned with {app name} having access to my Google account. |
| `access_change_newest_app`                | _(if the participant has at least 1 app, then for the newest app...)_ Q<sub>2</sub>10 (**Fig. 4**) I want to change which parts of my Google account that {app name} can access. |
| `keep_choice_random_app`                  | _(if the participant has at least 3 apps, then for a randomly selected app...)_ Q<sub>2</sub>5 (**Fig. 2**) |
| `recall_random_app`                       | _(if the participant has at least 3 apps, then for a randomly selected app...)_ Q<sub>2</sub>7 (**Fig. 2**) |
| `last_use_random_app`                     | _(if the participant has at least 3 apps, then for a randomly selected app...)_ Q<sub>2</sub>8 (**Fig. 3**)  |
| `aware_prior_random_app`                  | _(if the participant has at least 3 apps, then for a randomly selected app...)_ Q<sub>2</sub>9 (**Fig. 2**) |
| `access_beneficial_random_app`            | _(if the participant has at least 3 apps, then for a randomly selected app...)_ Q<sub>2</sub>10 (**Fig. 4**) |
| `access_concerned_random_app`             | _(if the participant has at least 3 apps, then for a randomly selected app...)_ Q<sub>2</sub>10 (**Fig. 4**) |
| `access_change_random_app`                | _(if the participant has at least 3 apps, then for a randomly selected app...)_ Q<sub>2</sub>10 (**Fig. 4**) |
| `keep_choice_oldest_app`                  | _(if the participant has at least 2 apps, then for the oldest app...)_ Q<sub>2</sub>5  (**Fig. 2**) |
| `recall_oldest_app`                       | _(if the participant has at least 2 apps, then for the oldest app...)_ Q<sub>2</sub>7  (**Fig. 2**) |
| `last_use_oldest_app`                     | _(if the participant has at least 2 apps, then for the oldest app...)_ Q<sub>2</sub>8 (**Fig. 3**)  |
| `aware_prior_oldest_app`                  | _(if the participant has at least 2 apps, then for the oldest app...)_ Q<sub>2</sub>9  (**Fig. 2**) |
| `access_beneficial_oldest_app`            | _(if the participant has at least 2 apps, then for the oldest app...)_ Q<sub>2</sub>10 (**Fig. 4**) |
| `access_concerned_oldest_app`             | _(if the participant has at least 2 apps, then for the oldest app...)_ Q<sub>2</sub>10 (**Fig. 4**) |
| `access_change_oldest_app`                | _(if the participant has at least 2 apps, then for the oldest app...)_ Q<sub>2</sub>10 (**Fig. 4**) |
| `rfl_understand_link`                     | Q<sub>2</sub>15 The "Apps with access to your account" page helps me to better understand which third-party apps and websites are linked to my Google account. |
| `rfl_understand_access`                   | Q<sub>2</sub>16 The "Apps with access to your account" page helps me to better understand what parts of my Google account third-party apps can access. |
| `rfl_change_settings`                     | Q<sub>2</sub>17 (**Fig. 10**) After completing this survey, do you see yourself changing any settings on your "Apps with access to your account" page? |
| `rfl_six_month_review`                    | Q<sub>2</sub>18 (**Fig. 10**) In six months do you see yourself reviewing third-party apps from your "Apps with access to your account" page? |
| `fut_remind`                              | Q<sub>2</sub>22 (**Fig. 11**) Suppose Google sent an email reminder to review your "Apps with access to your account" page. How often would you like to be reminded? |
| `fut_reapprove`                           | Q<sub>2</sub>23 (**Fig. 11**) Suppose Google required you to reapprove the third-party apps on your Google account. How often would you like to reapprove apps? |
| `fut_approve_every`                       | Q<sub>2</sub>25 (**Fig. 12**) Rather than approve all permissions when installing third-party apps, I would want third-party apps to seek my approval each time they access my Google account. |
| `fut_block_data`                          | Q<sub>2</sub>26 (**Fig. 12**) I would want to designate specific data (eg. certain emails, individual contacts, particular calendar events) as private and inaccessible to third-party apps. |

The following are fields appended to the above in `MainSurveyExtendedDataR.csv`.

| Header label                              | Survey question |
|-------------------------------------------|---|
| `app_install_count`                       | _(from browser extension and database: how many apps this participant has)_ | 
| `app_keep_count`                          | _(from browser extension and database: how many apps this participant wants to keep)_ |
| `app_remove_count`                        | _(from browser extension and database: how many apps this participant wants to remove)_ |
| `permission_count`                        | _(from browser extension and database: how many app permissions this participant was asked about)_ |
| `permission_not_necessary_count`          | _(from browser extension and database: this participant's "not necessary" responses to Q<sub>2</sub>12 (**Fig. 6**))_ |
| `permission_slightly_necessary_count`     | _(from browser extension and database: this participant's "slightly necessary" responses to Q<sub>2</sub>12 (**Fig. 6**))_ |
| `permission_moderately_necessary_count`   | _(from browser extension and database: this participant's "moderately necessary" responses to Q<sub>2</sub>12 (**Fig. 6**))_ |
| `permission_necessary_count`              | _(from browser extension and database: this participant's "necessary" responses to Q<sub>2</sub>12 (**Fig. 6**))_ |
| `permission_very_necessary_count`         | _(from browser extension and database: this participant's "very necessary" responses to Q<sub>2</sub>12 (**Fig. 6**))_ |
| `permission_low_necessary_count`          | _(`permission_not_necessary_count` + `permission_slightly_necessary_count`)_ |
| `permission_high_necessary_count`         | _(`permission_necessary_count` + `permission_very_necessary_count`)_ |
| `permission_not_concerned_count`          | _(from browser extension and database: this participant's "not concerned" responses to Q<sub>2</sub>13 (**Fig. 7**))_ |
| `permission_slightly_concerned_count`     | _(from browser extension and database: this participant's "slightly concerned" responses to Q<sub>2</sub>13 (**Fig. 7**))_ |
| `permission_moderately_concerned_count`   | _(from browser extension and database: this participant's "moderately concerned" responses to Q<sub>2</sub>13 (**Fig. 7**))_ |
| `permission_concerned_count`              | _(from browser extension and database: this participant's "concerned" responses to Q<sub>2</sub>13 (**Fig. 7**))_ |
| `permission_very_concerned_count`         | _(from browser extension and database: this participant's "very concerned" responses to Q<sub>2</sub>13 (**Fig. 7**))_ |
| `permission_low_concerned_count`          | _(`permission_not_concerned_count` + `permission_slightly_concerned_count`)_ |
| `permission_high_concerned_count`         | _(`permission_concerned_count` + `permission_very_concerned_count`)_ |
| `permission_not_confident_count`          | _(from browser extension and database: this participant's "not confident" responses to Q<sub>2</sub>11 (**Fig. 5**))_ |
| `permission_slightly_confident_count`     | _(from browser extension and database: this participant's "slightly confident" responses to Q<sub>2</sub>11 (**Fig. 5**))_ |
| `permission_moderately_confident_count`   | _(from browser extension and database: this participant's "moderately confident" responses to Q<sub>2</sub>11 (**Fig. 5**))_ |
| `permission_confident_count`              | _(from browser extension and database: this participant's "confident" responses to Q<sub>2</sub>11 (**Fig. 5**))_ |
| `permission_very_confident_count`         | _(from browser extension and database: this participant's "very confident" responses to Q<sub>2</sub>11 (**Fig. 5**))_ |
| `permission_low_confident_count`          | _(`permission_not_confident_count` + `permission_slightly_confident_count`)_ |
| `permission_high_confident_count`         | _(`permission_confident_count` + `permission_very_confident_count`)_ |
| `distinct_permission_count`               | _(from browser extension and database: how many unique app permissions this participant was asked about)_ |
| `distinct_permission_category_count`      | _(from browser extension and database: how many unique permission categories (e.g., Gmail) this participant was asked about)_ |

### AppData.csv and AppAndSurveyDataR.csv

This file contains data for the app-specific non-free-response questions in the main survey.

| Header label              | Survey question |
|---------------------------|---|
| `id`                      | _(automatically generated identifier for this app-participant pair)_ |
| `participant_id`          | _(automatically generated participant identifier)_ |
| `installed_on`            | _(from browser extension: when the participant installed the app)_ |
| `keep_choice`             | Q<sub>2</sub>5  (**Fig. 2**) |
| `selection`               | _(automatic generated tag denoting whether this was the participant's newest, oldest, or random app)_ |
| `recall`                  | Q<sub>2</sub>7  (**Fig. 2**) |
| `last_use`                | Q<sub>2</sub>8  (**Fig. 3**) |
| `aware_prior`             | Q<sub>2</sub>9  (**Fig. 2**) |
| `access_beneficial`       | Q<sub>2</sub>10 (**Fig. 4**) |
| `access_concerned`        | Q<sub>2</sub>10 (**Fig. 4**) |
| `access_change`           | Q<sub>2</sub>10 (**Fig. 4**) |
| `name`                    | _(from browser extension: the app's name)_ |
| `install_count`           | _(from browser extension and database: how many participants have this app)_ |
| `permissions_count`       | _(from browser extension: the number of permissions the app requests)_ |
| `days_since_install`      | _(from browser extension: the number number of days between when the participant installed the app and when the participant took part in this survey)_ |
| `rfl_understand_access`   | _(only in AppAndSurveyDataR.csv)_ Q<sub>2</sub>16  |

### AppDaysSinceInstallDataR.csv

This file contains data for how long all observed apps (i.e., **not** just the newest/oldest/random apps)
have been installed for each participant.

| Header label              | Survey question |
|---------------------------|---|
| `app`                     | _(just "app")_ |
| `days_since_install`      | _(from browser extension: the number number of days between when the participant installed the app and when the participant took part in this survey)_ |

### AppInstallDateDataR.csv

This file contains data for when all observed apps (i.e., **not** just the newest/oldest/random apps)
were installed on each participant's account.

| Header label             | Survey question |
|--------------------------|---|
| `app_install_date`       | _(from browser extension: installation date as taken from the participant's Google dashboard)_ |

### LinkTableDataR.csv

| Header label                  | Survey question |
|-------------------------------|---|
| `pre_survey_participant_id`   | _(participant identifier)_ |
| `main_survey_participant_id`  | _(same value as above)_    |

### PermissionAppDataR.csv

This file contains data for the permission-specific non-free-response questions in the main survey.

| Header label          | Survey question |
|-----------------------|---|
| `id`                  | _(automatically generated identifier for this permission-app-participant triplet)_ |
| `survey_app_id_id`    | _(corresponds to `id` in `AppData.csv`)_ |
| `necessary`           | Q<sub>2</sub>12 (**Fig. 6**) {app name} holds the following permissions to access parts of your Google account. How **necessary** do you think each permission is for the app to function in a way that benefits you? |
| `concerned`           | Q<sub>2</sub>13 (**Fig. 7**) {app name} holds the following permissions to access parts of your Google account. How **concerned** are you about the app accessing your account using these permissions? |
| `understand`          | Q<sub>2</sub>11 (**Fig. 5**) {app name} holds the following permissions to access parts of your Google account. How **confident** are you that you understand what each permission allows the app to do? |
| `category`            | _(from browser extension: the high-level service or category of this permission (e.g., Gmail, Contacts, Drive, etc.))_ |
| `permission`          | _(from browser extension: the text describing this permission)_ |
| `keep_choice`         | Q<sub>2</sub>5 (**Fig. 2**) |
| `selection`           | _(automatic generated tag denoting whether this was the participant's newest, oldest, or random app)_ |
| `recall`              | Q<sub>2</sub>7 (**Fig. 2**) |
| `last_use`            | Q<sub>2</sub>8 (**Fig. 3**) |
| `aware_prior`         | Q<sub>2</sub>9  (**Fig. 2**) |
| `access_beneficial`   | Q<sub>2</sub>10 (**Fig. 4**) |
| `access_concerned`    | Q<sub>2</sub>10 (**Fig. 4**) |
| `access_change`       | Q<sub>2</sub>10 (**Fig. 4**) |
| `installed_on`        | _(from browser extension: when the participant installed the app)_ |
| `days_since_install`  | _(from browser extension: the number number of days between when the participant installed the app and when the participant took part in this survey)_ |

### PermissionCategoryDataR.csv

This file contains data for the permission-specific non-free-response questions in the main survey,
for the category of a given permission.

| Header label                      | Survey question |
|-----------------------------------|---|
| `id`                              | _(corresponds to `id` in `PermissionAppDataR.csv`)_ |
| `basic_account_info_concerned`    | _(for "Basic account info" permissions)_ Q<sub>2</sub>12 (**Fig. 6**) |
| `basic_account_info_necessary`    | _(for "Basic account info" permissions)_ Q<sub>2</sub>13 (**Fig. 7**) |
| `basic_account_info_understand`   | _(for "Basic account info" permissions)_ Q<sub>2</sub>11 (**Fig. 5**) |
| `gmail_concerned`                 | _(for "Gmail" permissions)_ Q<sub>2</sub>12 (**Fig. 6**) |
| `gmail_necessary`                 | _(for "Gmail" permissions)_ Q<sub>2</sub>13 (**Fig. 7**) |
| `gmail_understand`                | _(for "Gmail" permissions)_ Q<sub>2</sub>11 (**Fig. 5**) |
| `google_drive_concerned`          | _(for "Google Drive" permissions)_ Q<sub>2</sub>12 (**Fig. 6**) |
| `google_drive_necessary`          | _(for "Google Drive" permissions)_ Q<sub>2</sub>13 (**Fig. 7**) |
| `google_drive_understand`         | _(for "Google Drive" permissions)_ Q<sub>2</sub>11 (**Fig. 5**) |
| `additional_access_concerned`     | _(for "Additional access" permissions)_ Q<sub>2</sub>12 (**Fig. 6**) |
| `additional_access_necessary`     | _(for "Additional access" permissions)_ Q<sub>2</sub>13 (**Fig. 7**) |
| `additional_access_understand`    | _(for "Additional access" permissions)_ Q<sub>2</sub>11 (**Fig. 5**) |
| `google_contacts_concerned`       | _(for "Google Contacts" permissions)_ Q<sub>2</sub>12 (**Fig. 6**) |
| `google_contacts_necessary`       | _(for "Google Contacts" permissions)_ Q<sub>2</sub>13 (**Fig. 7**) |
| `google_contacts_understand`      | _(for "Google Contacts" permissions)_ Q<sub>2</sub>11 (**Fig. 5**) |
| `google_calendar_concerned`       | _(for "Google Calendar" permissions)_ Q<sub>2</sub>12 (**Fig. 6**) |
| `google_calendar_necessary`       | _(for "Google Calendar" permissions)_ Q<sub>2</sub>13 (**Fig. 7**) |
| `google_calendar_understand`      | _(for "Google Calendar" permissions)_ Q<sub>2</sub>11 (**Fig. 5**) |

### SSODaysSinceInstallDataR.csv

This file contains data for how long all SSOs have been authorized for each participant.

| Header label              | Survey question |
|---------------------------|---|
| `sso`                     | _(just "sso")_ |
| `days_since_install`      | _(from browser extension: the number number of days between when the participant authorized the SSO and when the participant took part in this survey)_ |

