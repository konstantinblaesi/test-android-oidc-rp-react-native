# Purpose

- Provide a native mobile app functioning as an OpenID Connect Relying Party
- Integrate with an OpenID Connect compliant Identity Provider
- Demonstrate successful authentication with current best practices

# Basis

This repository was based on / forked of from https://github.com/FormidableLabs/react-native-app-auth/tree/main/examples/expo-cng

# Starting the app

## Tools preparation (usually once)

- Setup typical Android Dev Tools, the easiest way is by installing Android Studio
- Connect a phone via USB C (needs to be a data cable, not charging only)
- Enable Developer mode and USB Debugging
- Setup trust between mobile phone and PC and ensure `adb devices` lists your phone. If you have issues go to android developer settings and reset trust to get the "do you trust this device" prompt again when connecting to your PC.
- Connect phone to PC via USB C cable
- install dependencies using `npm install` (NodeJS is required)

## Configuration

Edit the file `App.tsx`: Add your OP and RP configuration

- issuer
- client_id
- pkce
- scopes
- maybe authorization and token endpoint if you do not use metadata discovery
- if you want to change the redirect URI search for `de.amiconsult.demo` in the repository, you will find it in a few places.

## Running

`npm run android`

This will build, install and start the application on your phone. The first build takes very long, but following builds are much quicker.


# Good Reads

https://github.com/openid/AppAuth-Android/blob/27b62d5da94023941db545b70036a742a52b7070/README.md#capturing-the-authorization-redirect