# User Journeys

## Data

### Meals

- I want to be able to add a meal ✓
  - I cannot add a meal if no text in the input ✓
  - button should show I cannot add a meal yet (disabled) ✓
- I want to be able view my meals in a list ✓
  - I can filter the meals ✓
- I want to be able to view a meal ✓
- I want to be able to edit a meal ✓
- I want to be able to delete a meal ✓
  - should change meal used in mealplan to custom meal ✓
  - should append the old book and page into the note of the custom meal

### Books

- I want to be able to add a book ✓
- I want to be able view my books in a list ✓
- I want to be able to view a book ✓
- I want to see a list of meals in a book ✓
- I want to add meals to a book from the book view ✓
  - I should be able to set the page when adding from this view ✓
- I want to be able to edit a book ✓
- I want to be able to delete a book ✓
  - should confirm and delete meals associated with books ✓
  - should change meals from this book in mealplan to custom meal ✓
  - should append the old book and page into the note of the custom meal

### Mealplan

- I want to be able to generate a mealplan ✓
  - I can preserve existing entries when generating ✓
  - I can add a new entry to a specific date
  - I can clear the date range
- I want to be able view my mealplan ✓
- I want to be able to edit a mealplan entry ✓
  - I should see the book information when selecting a meal
- I want to be able to delete a mealplan entry ✓
- I want to be able reorder my mealplan ✓

## Unauthenticated

- I want to be able to open the app to try it out without an account ✓
- I should be able to do all data actions without an account ✓

## Account

- I want to be able to sign up ✓
  - I want feedback when signup request is pending ✓
- I want to be able to sign in ✓
  - I want feedback while sign in is pending ✓
- I want to stay logged in after closing and reopening app ✓
- I want to be able to sign out ✓
  - I want feedback while sign out is pending ✓
- I should be able to subscribe ✓
  - Should highlight that data will not be synced without a subscription
- I should be able to manage my subscription (view, change, cancel) ✓
  - See if sub is active, and until when ✓
  - What sub type?
  - If not active, when was it cancelled
  - link to play/apple store for history, managing ✓
- I want to be able to reset my password ✓
  - I want feedback while reset is pending ✓
  - 500 screen when reset link out of date/invalid
- I want to recover account if password lost ✓
- I want to be able to change my email address ✓
  - I want feedback while email change request is pending ✓
  - I want to see the change without needing to sign out and in to app ✓
  - How will this work with purchases (play, apple store etc)
- I want to be able to delete my account
  - Delete data from DB (cascade in DB) ✓
  - handle subscription
  - Logout
  - Delete user
  - Send email confirming account deleted

## Info

- I want a link to the privacy policy ✓
- I want a link to the acknowledgements
- I want to see the app version number ✓

## Edge Cases

- If I cancel my subscription, my data should be deleted from the remote DB, but the powersync queue should reset so it can all be reuploaded if I sign up again
- I want to be able to change light/dark theme
- Support section
  - help, faq
  - getting started
  - I want a tutorial?
- if no meal/book, show button for picking examples
- Whats new
- Rate on store
