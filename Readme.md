# Worklogger Doc

### Release
[Download the latest v3.0 release here] : http://www.reddit.com

### Setting up

You require npm and node installed; node must be greater than v6.

Navigate to the directory and run the following commands

`npm install electron --save-dev`
`npm install`

Then run
`npm start`
To start the application.

### Working with the code

The bulk of the logic resides in main.js, it is fired when runninng npm start. Node-cron is used to display notifications when open a window when clicked.
No window opens by default when running the app.
###
