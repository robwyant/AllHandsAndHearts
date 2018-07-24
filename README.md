# HappyHandsHearts

FFG project for HappyHandsHearts client

Pre-Req:

1.  [NodeJS and NPM](https://nodejs.org/en/)
2.  [React Native](https://facebook.github.io/react-native/)
3.  [create-react-native-app](https://github.com/react-community/create-react-native-app)
4.  [expo _exp_](https://docs.expo.io/versions/latest/workflow/exp-cli)
5.  [expo _xde_ -- exp equivalent in a GUI (optional)](https://expo.io/tools#xde)

Post-req:

1.  Download this folder and `cd` or go to this folder
2.  run `npm install` or run `yarn` if you use yarn
3.  when installation completes run `exp start` or use XDE to navigate to project folder -> select device
    #dir overview

### Folder Structure

`/screens` All of the main screens including LoginScreen, MapScreen, HomeScreen.

`/components` All of reusable components should go here i.e a styled button/view
`/components/componentName/componentName.styles.js` Have style in a separate file for each components

`/assets` All of static assets such as images should go here

`/constants/Colors` All of Theme style
<br/>`/constans/apiuri` All of API URL should reside here
<br/>`/constants/actionTypes` All of redux types should persis here

`/utils` All of utility such as Permission, PushNotification and Fetch wrappers
<br/>`/actions` Redux actions should go here
<br/>`/reducers` Reducers should go here
<br/>`/sagas` Redux-Sagas should go here
<br/>`/containers` Redux containers that wraps screen and components should go here. i.e mapStateToProps, mapDispatchToProps

`/services` All service code that communicates with the backend (Salesforce API) should go here
<br/>`/services/apexClasses` All Apex class code from Salesforce should be created here in parallel for reference.

### High Level Application Architecture

GOTO: [Architecture](HAD.png)

### Notes On Salesforce API

GOTO: [Note on salesforce API calls.](API_Notes.md)

#Build process:

0.  [Make sure you have an expo account and signed in](https://expo.io/signup)
1.  Run `expo build:ios / build:android` and follow the instructions. YouTube walk-through https://www.youtube.com/watch?v=6IPr7oOugTs

    1.  Enter `kris.c@allhandsandhearts.org` and password. Note: if you have two-step authentication enabled, you will need to enter the code that you recieve on your phone. Note 2: Since CLI doesn't support recieving 2FA code via text, go to developer.apple.com -> sing in -> Click on Didn’t get a verification code? -> Text me. And use that recieved code for CLI.
    2.  Then follow the instructions on CLI. Use "Let Expo handle the process" for all the steps. So Expo does all the certifications!
    3.  When you go through all the process, expo will show a link to the build status on terminal ex: `https://expo.io/builds` -> Follow to that link from terminal to see the build status. When the build is complete (which may take a very long time), you can download the .IPA/.APK from that link and upload to App/Google store. App store link: https://itunesconnect.apple.com/login YouTube video with walk-through: https://www.youtube.com/watch?v=R-62gUat0Bc

1.  More on: https://docs.expo.io/versions/latest/guides/app-stores.html and https://docs.expo.io/versions/latest/guides/building-standalone-apps.html
1.  Note 2: Since we're using Google Maps, make sure Google Maps API is enabled for iOS and Android. More on: https://developers.google.com/maps/documentation/javascript/get-api-key
