var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res) {
res.redirect('/index');
});

router.get("/index" , function (req,res){
  db.burgers.findAll({})
  .then(function(data) {
    hbsObject = {
      burgers : data
    };
    res.render("index", hbsObject)
  })
  .catch(err => {
    console.log(err);
    res.json(err);
  });
});
  
  router.post("/burgers", function(req, res) {
    db.burgers.create(req.body)
    .then(dbBurgerData => res.json(dbBurgerData))
    .catch(err => {
      console.log(err);
      res.json(err);
    })
    res.redirect("/index");
  });
  
  router.put("/burgers/:id", function(req, res) {
    db.burgers.update(
      req.body,
      {
        where :
        {
          id : req.params.id
        }
      })
      .then(dbBurgerData => res.json(dbBurgerData))
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  });

  module.exports = router;