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

## Tests

### E2E Tests

E2E tests are run using [Maestro](https://maestro.mobile.dev/getting-started/installing-maestro).

You'll need to run the required device, before running the e2e tests

## Known Issues

- If a user logs out, then logs in, without restarting the app, powersync doesn't connect.
  It will connect when the app is closed and reopened.

## Prod release TODO steps

- EAS Build - https://docs.expo.dev/build/setup/
- Maestro cloud CI - https://console.mobile.dev/quickstart?teamId=36513706-3609-41ab-a5e9-e28339db6964
