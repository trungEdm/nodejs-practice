const express = require("express"),
    app = express(),
    fs = require("fs"),
    hbs = require("hbs");

app.listen(3000, () => {
    console.log("Trung, Express.js HTTP server on port 3000.");
});

hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

app.set("view engine", "hbs");
app.use(express.static(__dirname + '/public')); // use default if other routes unavailable



app.use( (req, res, next) => {
    let now = new Date().toString();

    let log = `Time: ${now} \n method: ${req.method} \n url: ${req.url}`;
    console.log(log);
    next();

    fs.appendFile("server.log", log + "/n", (err) => {
        if (err) {
            console.log("Unable to append file to server.");
        }
    } );
});

app.use( (req, res, next) => {
    res.render("maintenance.hbs");
});

app.get("/", (req, res) => {
    //res.send("<h1>Hello, Trung. foodnode!</h1>");
    res.render("home.hbs", { // you can res.send any datatype
        pageTitle: "Home page, Trung",
        welcomeMessage: "Welcome to foodnode"
        
      
    });
});

app.get('/about', (req, res) => { //if file doesn't exist, it's created by Express.js
    res.render("about.hbs", {
        pageTitle: "About page"
        
    });
});

app.get("/bad", (req, res) => {
    res.send({
        "errorMessage": "Unable to handle request."
    });
});