import ShowTimes from '../models/ShowTimes.js';
import Movies from '../models/Movies.js';

export default {
	async getMovies(req, res) {
		try {
			const movies = await Movies.findAll({ raw: true });
			if (!movies) {
				res.status(422).json({ message: 'not movies' });
			}
			res.status(200).json({ movies });
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	},
	async createMovies(req, res) {
		try {
			const { title, genre, releaseDate } = req.body;

			await Movies.create({
				title,
				genre,
				releaseDate,
			});
			res.status(200).json({ message: 'new movies created' });
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	},
	async createShowTimes(req, res) {
		try {
			const { movieId: movie_id, showTime } = req.body;

			await ShowTimes.create({
				movie_id,
				showTime,
			});
			res.status(200).json({ message: 'new Show Times created' });
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	},
};
