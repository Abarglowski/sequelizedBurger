var express = require("express");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller.js");

app.use(routes);

app.get('*', function(req,res){
  res.json({
    status: 404,
    message: "Page not found."
  });
});

db.sequelize.sync().then(function(){
  app.listen(PORT, function() {
    console.log("Server listening on: http://localhost: " + PORT);
});
});