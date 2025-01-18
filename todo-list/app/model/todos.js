'use strict';

module.exports = app => {
	console.log('0-------------------------------------')
	console.log(app)
	const { STRING, INTEGER, DATE, TEXT, ENUM } = app.Sequelize;

	ENUM('status', ['未完成', '已完成']);

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
		status: INTEGER,
	});

	Todos.associate = function () {
		Todos.belongsTo(app.model.Users, { foreignKey: 'user_id' });
	};


	return Todos;
}; 
