'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE, TEXT, ENUM } = app.Sequelize;

    const Todos = app.model.define('todos', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        user_id: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        title: {
            type: STRING,
        },
        description: TEXT,
        status: ENUM('pending', 'in_progress', 'completed', 'cancelled'),
        createdAt: DATE,
        updatedAt: DATE,
    });

    Todos.associate = function (models) {
        Todos.belongsTo(app.model.Users, { foreignKey: 'user_id' });
    };

    return Todos;
}; 
