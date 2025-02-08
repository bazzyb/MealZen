# MealZen

## Get started

1. Prepare the environment

   ```bash
   npm install
   npm run prebuild # prepares native elements of app, ie. database
   ```

2. Start the app

   ```bash
   npm run ios
   # OR
   npm run android
   ```

## Devices

### Setting up devices

#### Android

To open the list of devices in Android Studio:
Android Studio -> Tools -> Device Manager

#### iOS

To open the list of devices in Xcode:
Xcode -> Window -> Devices and Simulators

In here, setup the ios devices listed below, named exactly the same, with the same specs

You'll then need to open each device via `expo run:ios`, to install the app on the simulated device.

### Device list

#### Android

3 android devices have been setup for local development.

- Local_Pixel_8_API_35
- Local_Pixel_4_API_35
- Local_Pixel_Tablet_API_35

3 android devices have been setup for local E2E testing.

- E2E_Pixel_8_API_35
- E2E_Pixel_4_API_35
- E2E_Pixel_Tablet_API_35

#### iOS

3 ios devices have been setup for local development.

- Local iphone 16 ios 18
- Local iphone SE ios 17.5
- Local ipad air ios 18

3 ios devices have been setup for local E2E testing.

- E2E iphone 13 ios 18
- E2E iphone SE ios 17.5
- E2E iPad ios 18

## Debugging in Prod

Connect to device via wifi in Android Studio

- on device, go to settings -> system -> developer options -> wireless debugging
- in android studio, in the devices window, click "Pair Devices using WiFi"

Once connected, run the following to output error logs
`adb logcat --buffer=crash > logs.txt`
Note: command might not exit, so check if txt file is there

## Tests

### E2E Tests

E2E tests are run using [Maestro](https://maestro.mobile.dev/getting-started/installing-maestro).

You'll need to run the required device, before running the e2e tests

## TODO

### testing

- mobile accessibility (screen readers? tabbing equivalent? accessibility testing?)
- E2E test which writes to db for unauthed user, then checks it's not persistent on new device?
- As above, but for authed user, and data is persisted

### SYNC TWEAKS

- ensure all reads and writes use userId ✓
- logged out users use LOCAL_USER_ID ✓
- logged in users use their id ✓

- when premium user logs in, or opens app and already logged in, check if data in non-synced db ✓

  - if so, use copyLocalChangesToSyncedTable ✓

- when free user logs in, or opens app and already logged in, check if data in synced db ✓

  - if so, use copySyncedChangesToLocalTable ✓

- when logging in, and have data for LOCAL_USER_ID, offer to merge

  - if merge, change user id in local db to logged in user id
  - if not merge, leave local data alone

- premium user sub expires
  - delete some stuff
  - add some stuff
  - edit some stuff
  - resubscribe
  - check supabase is sensible
  - ideally, find a pattern for deleting user data from tables when sub expires

### Prod release TODO steps

- CHANGE APP ACCESS and DATA SAFETY IN GOOGLE PLAY CONSOLE ONCE SUBSCRIPTION STUFF ADDED
- Email content and styles
- Allow cancelling email change request
- sign up
  - redirect from email back to app?
  - confirm and sign up styles
- account view
  - delete account
  - forgot password
  - manage subscription
- convert mealzen.co.uk to store page
- setup apple store
- Maestro cloud CI - https://console.mobile.dev/quickstart?teamId=36513706-3609-41ab-a5e9-e28339db6964
