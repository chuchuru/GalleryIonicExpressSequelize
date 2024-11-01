const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
var path = require('path');


var corsOptions = {
  origin: "http://localhost:8100"
};

app.use (cors(corsOptions));


// parse request of content-type - aplication/json

app.use(express.json());

// parse request of content-type - application/x-www-form-urlencode
app.use(express.urlencoded({ extended: true}));

// public directory
app.use(express.static(path.join(__dirname,'public')));




// // ionicnormal use. Doesn't delete the database data
  // db.sequelize.sync();

// In development, you may need to drop existing tables and re-sync database
    db.sequelize.sync ({ force: true}).then (() => {
    console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res)=> {
    res.json ({message: "Welcome to Gallery application."});
});

require ("./routes/picture.routes")(app);
require ("./routes/artist.routes")(app);
require ("./routes/gallery.routes")(app);
require ("./routes/user.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
