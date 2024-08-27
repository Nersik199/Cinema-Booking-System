import { Router } from 'express';

import controllers from '../controllers/controllers.Admin.js';

import checkToken from '../middleware/checkToken.js';
import validate from '../middleware/validate.js';

import adminSchema from '../schemas/admin.js';

const router = Router();

router.get('/admin', (req, res) => {
	res.render('admin');
});

// API
router.get('/movies', checkToken, controllers.getMovies);
router.post(
	'/create/movies',
	validate(adminSchema.createMovies, 'body'),
	checkToken,
	controllers.createMovies
);
router.post('/create/times', checkToken, controllers.createShowTimes);

export default router;
