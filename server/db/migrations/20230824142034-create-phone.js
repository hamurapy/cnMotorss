/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Phones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      phoneNumber: {
        type: Sequelize.TEXT,
      },
      adres: {
        type: Sequelize.TEXT,
      },
      whatsapp: {
        type: Sequelize.TEXT,
      },
      telegram: {
        type: Sequelize.TEXT,
      },
      yandex: {
        type: Sequelize.TEXT,
      },
      google: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Phones');
  },
};
