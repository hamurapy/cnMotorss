const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PhotoCar extends Model {
    static associate({ Car }) {
      this.belongsTo(Car, { foreignKey: 'carId' });
    }
  }
  PhotoCar.init(
    {
      img: {
        type: DataTypes.TEXT,
      },
      carId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Cars',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'PhotoCar',
    },
  );
  return PhotoCar;
};
