// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const VericationToken = sequelize.define('VericationToken', {
//     userId: DataTypes.INTEGER,
//     token: DataTypes.STRING
//   }, {});
//   VericationToken.associate = function(models) {
//     // verificationtoken.belongsTo(models.User, {
//     //   as: "user",
//     //   foreignKey: "userId",
//     //   foreignKeyConstraint: true
//     // });
//   };
//   return VericationToken;
// };

module.exports = function(sequelize, DataTypes) {
  var VerificationToken = sequelize.define('VerificationToken', {
      userId: DataTypes.STRING,
      token: DataTypes.STRING
    }, {
    classMethods: {
      associate: function(models) {
        // verificationtoken.belongsTo(models.User, {
        //   as: "user",
        //   foreignKey: "userId",
        //   foreignKeyConstraint: true
        // });
      }
    }
  });
  return VerificationToken;
  };