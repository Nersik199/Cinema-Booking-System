import Joi from 'joi';

export default {
	createMovies: Joi.object({
		title: Joi.string().min(3).max(50).required(),
		genre: Joi.string().min(3).max(50).required(),
		releaseDate: Joi.date().iso().greater('now').required(),
	}),
};
