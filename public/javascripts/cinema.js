const token = localStorage.getItem('token');
const movieShow = document.querySelector('.movie_show_times');
const historyContainer = document.getElementById('bookingHistory');
const closeModal = document.getElementById('closeModal');
const bookingModal = document.getElementById('bookingModal');
const modalOverlay = document.getElementById('modalOverlay');

async function createSeats() {
	const seatData = [];

	for (let row = 1; row <= 5; row++) {
		for (let seatNumber = 1; seatNumber <= 5; seatNumber++) {
			seatData.push({
				seatRow: row,
				seatNumber: seatNumber,
			});
		}
	}
	return seatData;
}

async function getMovieOnShowTimes() {
	try {
		const response = await axios.get('/cinema/movies/data', {
			headers: {
				authorization: token,
			},
		});

		const movies = response.data.movies;
		const showTimes = response.data.showTimes;
		console.log(movies);

		if (!movies || !showTimes) {
			return false;
		}

		movies.forEach(movie => {
			const movieShowTimes = showTimes.filter(
				showTime => showTime.movie_id === movie.id
			);
			const movieElement = document.createElement('div');
			movieElement.innerHTML = `
				<h3>${movie.title}</h3>
				<p>${new Date(movie.releaseDate).getFullYear()}</p>
			`;
			movieShow.append(movieElement);

			if (movieShowTimes.length > 0) {
				movieShowTimes.forEach(showTime => {
					const showTimeElement = document.createElement('button');
					showTimeElement.innerText = `Show Time: ${showTime.showTime}`;
					showTimeElement.addEventListener('click', () => {
						displaySeats(showTime.id);
					});
					movieElement.append(showTimeElement);
				});
			}
		});
	} catch (e) {
		console.log(e);
	}
}

async function getSeatsStatus(showTimeId) {
	try {
		const response = await axios.get(
			`/cinema/seats/status?showtime_id=${showTimeId}`,
			{
				headers: {
					authorization: token,
				},
			}
		);

		return response.data.seat;
	} catch (error) {
		console.error('Error fetching seat status:', error);
		return [];
	}
}
async function displaySeats(showTimeId) {
	try {
		const seatData = await createSeats();
		const seatStatus = await getSeatsStatus(showTimeId);
		historyContainer.innerHTML = '';
		console.log(showTimeId);

		const seatStatusMap = seatStatus.reduce((map, seat) => {
			map[`${seat.seatRow}-${seat.seatNumber}`] = seat.isAvailable;
			return map;
		}, {});

		seatData.forEach(seat => {
			const seatElement = document.createElement('div');
			seatElement.className = 'seat';
			seatElement.innerHTML = `<span>Row ${seat.seatRow} Seat ${seat.seatNumber}</span>`;

			const isAvailable = seatStatusMap[`${seat.seatRow}-${seat.seatNumber}`];

			if (isAvailable === 0) {
				seatElement.style.backgroundColor = 'red';
				seatElement.style.color = 'black';

				seatElement.addEventListener('click', () => {
					alert('Seat is already reserved');
				});
			} else {
				seatElement.addEventListener('click', () => {
					openBookingModal(seat.seatRow, seat.seatNumber, showTimeId);
				});
			}

			historyContainer.append(seatElement);
		});
		fetchBookingHistory(seatStatus);
	} catch (error) {
		console.error('Error displaying seats:', error);
	}
}

function openBookingModal(seatRow, seatNumber, showtimeId) {
	bookingModal.style.display = 'block';

	const bookingForm = document.getElementById('bookingForm');
	bookingForm.onsubmit = async function (e) {
		e.preventDefault();
		const data = {
			firstName: document.getElementById('firstName').value,
			lastName: document.getElementById('lastName').value,
			phone: document.getElementById('phone').value,
		};

		try {
			await axios.post(
				'/cinema/reserve',
				{
					seatRow,
					seatNumber,
					showtimeId,
					...data,
				},
				{
					headers: {
						authorization: localStorage.getItem('token'),
					},
				}
			);
			alert('Reservation successful!');
			displaySeats(showtimeId);
			bookingModal.style.display = 'none';
			modalOverlay.style.display = 'none';
		} catch (error) {
			const fields = error.response.data.fields;
			if (fields) {
				Object.keys(fields).forEach(key => {
					const messages = fields[key];
					const errorSpan = document.querySelector(`#${key}-error`);
					if (errorSpan) {
						errorSpan.textContent = messages;
					}
				});
			}
		}
	};
}

async function fetchBookingHistory(bookings) {
	try {
		console.log(bookings);

		bookings.forEach(booking => {
			const bookingElement = document.createElement('div');
			const bookingDate = new Date(booking.reservationTime);
			const formattedDate = `${bookingDate.toLocaleDateString()} ${bookingDate.toLocaleTimeString()}`;
			bookingElement.textContent = `
       ${booking.firstName} ${booking.lastName} booked seat
       ${booking.seatRow}/${booking.seatNumber} on ${formattedDate}`;
			historyContainer.append(bookingElement);
		});
	} catch (error) {
		if (error.response && error.response.status === 404) {
			const elementH2 = document.createElement('h2');
			elementH2.innerText = error.response.data.message;
			historyContainer.append(elementH2);
		}
		console.error('Error fetching booking history:', error);
	}
}

closeModal.addEventListener('click', () => {
	bookingModal.style.display = 'none';
	modalOverlay.style.display = 'none';
});

getMovieOnShowTimes();
