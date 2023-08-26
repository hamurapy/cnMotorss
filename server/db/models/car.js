const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate({ PhotoCar }) {
      this.hasMany(PhotoCar, { foreignKey: 'carId' });
    }
  }
  Car.init(
    {
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
      color: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      liters: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      wheel: {
        type: DataTypes.TEXT,
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
