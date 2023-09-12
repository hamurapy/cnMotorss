/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const phoneData = [
      {
        phoneNumber: '79123456789',
        adres: 'г. Уcсурийск, ул. Резервная д.6Г',
        whatsapp: '99999999',
        telegram: '99999999',
        yandex: 'yandex',
        google: 'google',
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
