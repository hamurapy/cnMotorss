/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('PhotoCars', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        img: {
          type: Sequelize.TEXT,
        },
        carId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Cars',
            key: 'id',
          },
          onDelete: 'CASCADE',
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
      await queryInterface.dropTable('PhotoCars');
    },
  };
