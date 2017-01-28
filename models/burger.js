module.exports = function(sequelize, DataTypes) {
  var burgerList = sequelize.define("burgerList", {
    text: DataTypes.STRING
  });
  return burgerList;
};
