const orm = require("../config/orm.js");

const burger = {
  // select all burgers
  selectAll(cb) {
    orm.selectAll("burgers", (res) => cb(res));
  },
  // create a burger and insert in db
  insertOne(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, (res) => cb(res));
  },
  //update a burger
  updateOne(ObjColVals, condition, cb) {
    orm.updateOne("burgers", ObjColVals, condition, (res) => cb(res));
  },
  delete(condition, cb) {
    orm.delete("burgers", condition, cb, (res) => cb(res));
  },
};
module.exports = burger;
