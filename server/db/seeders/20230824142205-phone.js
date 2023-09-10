/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const phoneData = [
      {
        phoneNumber: '79123456789',
        yandex: '111',
        google: '222',
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
