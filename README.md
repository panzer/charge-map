### Charger Map Challenge

## Developer Set-up

1. `npm install`
1.

## Design Choices

- Using expo's default app for ease of set up
- Added Redux for ease of state management
- Redux toolbox used for easy defaults
- Redux slices used for minimal syntax
- Storing the displayed locations in a flat list, since that was the fasted to get something on the screen. Would like to change this (see below)
- Hard coded in the API key because that was fastest
- Hard limit on the number of locations pulled from the query because trying not to overburden the device
-

## TODOs

- Use some data structure (like an R-Tree: https://github.com/mourner/rbush) to load in the data and group it by location for 1. caching results and 2. managing the huge number of results

- Add some testing and automate it. Especially the utility functions.

- Add a login screen so that the app API key doesnt need to be hard coded. At the very least, make an env file to provide the API key

- Allow the user to click and see more information about a charger

- Make the app look nice
