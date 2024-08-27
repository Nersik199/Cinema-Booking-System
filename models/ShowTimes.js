import sequelize from '../clients/sequelize.mysql.js';
import { DataTypes, Model } from 'sequelize';
import Movies from './Movies.js';

class ShowTimes extends Model {}

ShowTimes.init(
	{
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		movie_id: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull: false,
			references: {
				model: Movies,
				key: 'id',
			},
		},
		showTime: {
			type: DataTypes.TIME,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'showTime',
		tableName: 'showTimes',
	}
);

ShowTimes.belongsTo(Movies, {
	foreignKey: 'movie_id',
	onDelete: 'cascade',
});

export default ShowTimes;
