var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _event = require("./event");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var event = _event(sequelize, DataTypes);


  return {
    admin,
    event,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
