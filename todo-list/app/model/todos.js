'use strict';

module.exports = app => {
	console.log('0-------------------------------------')
	console.log(app)
	const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

	const status = ['待办', '进行中', '已完成']

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
		status: {
			type: INTEGER,
			get() {
				return  status[this.getDataValue('status')]
			},
		},
	});

	Todos.associate = function () {
		Todos.belongsTo(app.model.Users, { foreignKey: 'user_id' });
	};


	return Todos;
}; 
