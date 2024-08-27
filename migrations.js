import Users from './models/Users.js';
import Movies from './models/Movies.js';
import ShowTimes from './models/ShowTimes.js';
import Reservations from './models/Reservations.js';

const models = {
	Users,
	Movies,
	ShowTimes,
	Reservations,
};

(async () => {
	for (const model of Object.values(models)) {
		await model.sync({ alter: true });
		console.log(model.name, 'created table');
	}
})();
