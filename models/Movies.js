import sequelize from '../clients/sequelize.mysql.js';
import { DataTypes, Model } from 'sequelize';

class Movies extends Model {}

Movies.init(
	{
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		genre: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		releaseDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'movie',
		tableName: 'movies',
	}
);

export default Movies;
