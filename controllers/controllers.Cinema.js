import Movies from '../models/Movies.js';
import ShowTimes from '../models/ShowTimes.js';
import Reservations from '../models/Reservations.js';

export default {
	async getMovieOnShowTimes(req, res) {
		try {
			const movies = await Movies.findAll({ raw: true });
			const showTimes = await ShowTimes.findAll({ raw: true });
			if (!movies || !showTimes) {
				return res.status(404).json({ message: 'No booking history found' });
			}
			res.status(200).json({ movies, showTimes });
		} catch (error) {
			console.error('Error fetching reserved seats:', error);
			res.status(500).json({ message: 'Internal server error' });
		}
	},

	async getSeatsByShowtime(req, res) {
		try {
			const { showtime_id } = req.query;

			if (!showtime_id) {
				return res.status(400).json({ message: 'Showtime ID is required' });
			}

			const seatStatus = await Reservations.findAll({
				where: { showtime_id },
				raw: true,
			});

			res.json({ seat: seatStatus });
		} catch (error) {
			console.error('Error fetching seats:', error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	},

	async createReservation(req, res) {
		try {
			const { id } = req.user;
			const {
				seatRow,
				seatNumber,
				showtimeId: showtime_id,
				firstName,
				lastName,
				phone,
			} = req.body;

			await Reservations.create({
				user_id: id,
				seatRow,
				isAvailable: false,
				seatNumber,
				showtime_id,
				firstName,
				lastName,
				phone,
			});

			res.status(201).json({ message: 'Reservation created successfully' });
		} catch (e) {
			console.error(e);
			res.status(500).json({ message: 'Internal server error' });
		}
	},
};
