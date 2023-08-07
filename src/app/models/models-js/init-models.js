var DataTypes = require("sequelize").DataTypes;
var _order = require("./order");
var _product = require("./product");
var _transaction = require("./transaction");
var _user = require("./user");

function initModels(sequelize) {
  var order = _order(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var transaction = _transaction(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    order,
    product,
    transaction,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
