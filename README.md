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

## Known Issues

- If a user logs out, then logs in, without restarting the app, powersync doesn't connect.
  It will connect when the app is closed and reopened.
