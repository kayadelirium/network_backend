"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Message", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
                unique: true,
            },
            text: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            date: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            authorId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "User",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
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
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Message");
    },
};
