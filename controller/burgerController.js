const express = require("express");
const router = express.Router();

//Import the model (burger.js) to use its database functions
const burger = require("../models/burger");

// create all the routes

// gets all the burgers from data base when page hit
router.get("/", (req, res) => {
  burger.selectAll((data) => {
    const hbsObject = {
      burgers: data,
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

// posts burgers to the page when created
router.post("/api/burgers", (req, res) => {
  burger.insertOne(
    ["name", "devoured"],
    [req.body.name, req.body.devoured],
    (result) => {
      res.json({ id: result.insertID });
    }
  );
});

// changes the truth or flase property of the burger when devoured
router.put("/api/burgers/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;

  console.log("condition", condition);

  burger.updateOne(
    {
      devoured: req.body.devoured,
    },
    condition,
    (result) => {
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

// inserts the updated burger to the page
router.post("api/burgers/:id", (req, res) => {
  burger.insertOne(
    ["name", "devoured"],
    [req.body.name, req.body.devoured],
    (result) => {
      res.json({ id: result.insertId });
    }
  );
});

//deletes from data base when selected
router.delete("/api/burgers/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;
  console.log("condition", condition);
  burger.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
