const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    static associate() {
    }
  }
  Phone.init({
    phoneNumber: {
      type: DataTypes.TEXT,
    },
    adres: {
      type: DataTypes.TEXT,
    },
    whatsapp: {
      type: DataTypes.TEXT,
    },
    telegram: {
      type: DataTypes.TEXT,
    },
    yandex: {
      type: DataTypes.TEXT,
    },
    google: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Phone',
  });
  return Phone;
};
