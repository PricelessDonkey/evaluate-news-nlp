const index = require("./index");

const app = index.app;

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('App listening on port 8080!')
})

