/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      brand: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      model: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      year: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mileage: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      engine: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      power: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      price: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      driveUnit: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      transmission: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
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
    await queryInterface.dropTable('Cars');
  },
};
