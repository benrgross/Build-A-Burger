const orm = require("../config/orm.js");

const burger = {
  // select all burgers
  all(cb) {
    orm.all("burgers", (res) => cb(res));
  },
  // create a burger and insert in db
  create(cols, vals, cb) {
    orm.create("burgers", cols, vals, (res) => cb(res));
  },
};
