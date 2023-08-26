
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const phoneData = [
      {
        number: '79123456789',
      },
    ];

    const phones = phoneData.map((phone) => ({
      ...phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Phones', phones);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Phones');
  },
};
