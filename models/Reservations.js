import sequelize from '../clients/sequelize.mysql.js';
import { DataTypes, Model } from 'sequelize';

import ShowTimes from './ShowTimes.js';
import Users from './Users.js';

class Reservations extends Model {}

Reservations.init(
	{
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		firstName: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING(80),
			allowNull: false,
		},
		seatRow: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		seatNumber: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		reservationTime: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		showtime_id: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull: false,
			references: {
				model: ShowTimes,
				key: 'id',
			},
		},
		isAvailable: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
		user_id: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull: false,
			references: {
				model: Users,
				key: 'id',
			},
		},
	},
	{
		sequelize,
		modelName: 'reservation',
		tableName: 'reservation',
	}
);
Reservations.belongsTo(ShowTimes, {
	foreignKey: 'showtime_id',
	onDelete: 'cascade',
});
Reservations.belongsTo(Users, {
	foreignKey: 'user_id',
	onDelete: 'cascade',
});
export default Reservations;
