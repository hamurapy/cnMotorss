const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate() {}
  }
  Car.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      img: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      brand: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      model: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mileage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      engine: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      power: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      driveUnit: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      transmission: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Car',
    },
  );
  return Car;
};
