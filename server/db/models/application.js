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
    carID: {
      type: DataTypes.INTEGER,
    },
    carPhoto: {
      type: DataTypes.TEXT,
    },
    car: {
      type: DataTypes.TEXT,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    color: {
      type: DataTypes.TEXT,
    },
    mileage: {
      type: DataTypes.INTEGER,
    },
    wheel: {
      type: DataTypes.TEXT,
    },
    engine: {
      type: DataTypes.TEXT,
    },
    driveUnit: {
      type: DataTypes.TEXT,
    },
    transmission: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};
