"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        return await queryInterface.addColumn("Message", "chatId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Chat",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        });
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.removeColumn("Message", "chatId");
    },
};
