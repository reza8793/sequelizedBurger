// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
//console.log("i'm at html-routes");
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
  	console.log("i'm at app.get");
    res.sendFile(path.join(__dirname + "/../public/view.html"));
    console.log(__dirname);
  });

};
