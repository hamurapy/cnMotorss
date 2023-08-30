const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    static associate() {
    }
  }
  Application.init({
    name: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.TEXT,
    },
    message: {
      type: DataTypes.TEXT,
    },
    car: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};
