const express = require("express");
const router = express.Router();

//Import the model (burger.js) to use its database functions
const burger = require("../models/burger");

// create all the routes
router.get("/", (req, res) => {
  burger.all((data) => {
    const hbsObject = {
      burgers: data,
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", (req, res) => {
  burger.create(
    ["name", "devoured"],
    [req.body.name, req.body.sleepy],
    (result) => {
      res.json({ id: result.insertID });
    }
  );
});

module.exports = router;
