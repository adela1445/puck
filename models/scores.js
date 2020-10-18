const { sequelize } = require(".");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const Scores = sequelize.define("Scores", {
    // The email cannot be null, and must be a proper email before creation
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return Scores;
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
};
