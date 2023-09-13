/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Applications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT,
      },
      email: {
        type: Sequelize.TEXT,
      },
      phone: {
        type: Sequelize.TEXT,
      },
      message: {
        type: Sequelize.TEXT,
      },
      carID: {
        type: Sequelize.INTEGER,
      },
      carPhoto: {
        type: Sequelize.TEXT,
      },
      car: {
        type: Sequelize.TEXT,
      },
      year: {
        type: Sequelize.INTEGER,
      },
      color: {
        type: Sequelize.TEXT,
      },
      mileage: {
        type: Sequelize.INTEGER,
      },
      wheel: {
        type: Sequelize.TEXT,
      },
      engine: {
        type: Sequelize.TEXT,
      },
      driveUnit: {
        type: Sequelize.TEXT,
      },
      transmission: {
        type: Sequelize.TEXT,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      status: {
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
    await queryInterface.dropTable('Applications');
  },
};
