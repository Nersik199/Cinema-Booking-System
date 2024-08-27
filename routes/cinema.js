import { Router } from 'express';

import controllers from '../controllers/controllers.Cinema.js';
import checkToken from '../middleware/checkToken.js';
import validate from '../middleware/validate.js';
import cinemaSchema from '../schemas/cinema.js';

const router = Router();

//views
router.get('/views/reservation', (req, res) => {
	res.render('showReservation');
});

//API
router.get('/movies/data', checkToken, controllers.getMovieOnShowTimes);
router.get('/seats/status', checkToken, controllers.getSeatsByShowtime);
router.post(
	'/reserve',
	validate(cinemaSchema.createReservation, 'body'),
	checkToken,
	controllers.createReservation
);

export default router;
