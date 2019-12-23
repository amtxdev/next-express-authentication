'use strict';
module.exports = (sequelize, DataTypes) => {
  const level_status = sequelize.define('level_status', {
    // id: DataTypes.INTEGER,
    detail: DataTypes.STRING
  }, {});
  level_status.associate = function(models) {
    // associations can be defined here
  };
  return level_status;
};