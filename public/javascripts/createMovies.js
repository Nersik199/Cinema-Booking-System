const moviesContainer = document.querySelector('.movies_container');
const adminForm = document.querySelector('.movies-form');
const token = localStorage.getItem('token');

const API_CREATE_MOVIES = '/admin/create/movies';
const API_GET_MOVIES = '/admin/movies';
const API_CREATE_TIMES = '/admin/create/times';

adminForm.addEventListener('submit', async event => {
	event.preventDefault();

	const data = {
		title: document.querySelector('#title').value,
		genre: document.querySelector('#genre').value,
		releaseDate: document.querySelector('#releaseDate').value,
	};

	if (!token) {
		alert('No token found. Please login first.');
		location.href = '/users/login';
		return;
	}

	try {
		await axios.post(API_CREATE_MOVIES, data, {
			headers: {
				authorization: token,
			},
		});
		alert('Movie created successfully!');
		location.reload();
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
});

async function getMovies() {
	try {
		const response = await axios.get(API_GET_MOVIES, {
			headers: {
				authorization: token,
			},
		});

		const movies = response.data.movies;
		if (movies.length === 0) {
			const movieElement = document.createElement('span');
			movieElement.innerHTML = `<span>No movies found</span>`;
			moviesContainer.append(movieElement);
		} else {
			movies.forEach(data => {
				const movieElement = document.createElement('div');
				movieElement.classList = 'movie_content';
				movieElement.innerHTML = `
                    <img src="/images/img.png" alt="">
                    <p class="hidden" data-id="${data.id}"></p>
                    <p>Title <br> ${data.title}</p>
                    <p>Genre<br> ${data.genre}</p>
                    <p>Release Date<br> ${new Date(
											data.releaseDate
										).toLocaleDateString()}</p>
                    <button class="timeBtn" data-id="${
											data.id
										}">create time</button>
                `;
				moviesContainer.append(movieElement);
			});

			const movieContents = document.querySelectorAll('.movie_content');
			movieContents.forEach(movieContent => {
				showModalTimes(movieContent);
			});
		}
	} catch (error) {
		console.error('Error fetching movies:', error);
		alert('Failed to fetch movies. Please try again.');
	}
}

getMovies();

function showModalTimes(element) {
	let modalOpen = false;

	element.addEventListener('click', e => {
		if (e.target.tagName === 'BUTTON') {
			const movieId = e.target.getAttribute('data-id');

			if (!modalOpen) {
				const htmlElement = document.createElement('div');
				htmlElement.classList = 'modal_content';
				e.target.innerText = 'close';
				htmlElement.innerHTML = `
                    <form class="form-time">
                        <input type="time" id="showTime" />
                        <input type="hidden"  id="movieId" name="movieId" value="${movieId}" />
                        <input type="submit"  value="Create time" />
                    </form>
                `;
				element.append(htmlElement);
				modalOpen = true;
				createTime();
			} else {
				const modalContent = document.querySelector('.modal_content');
				if (modalContent) {
					modalContent.remove();
				}
				e.target.innerText = 'create time';
				modalOpen = false;
			}
		}
	});
}

function createTime() {
	const formTime = document.querySelector('.form-time');

	formTime.addEventListener('submit', async e => {
		e.preventDefault();
		const data = {
			movieId: document.querySelector('#movieId').value,
			showTime: document.querySelector('#showTime').value,
		};
		console.log(data);

		try {
			const response = await axios.post(API_CREATE_TIMES, data, {
				headers: {
					authorization: token,
				},
			});
			alert('TIME created successfully!');
			console.log(response);
		} catch (e) {
			console.error('Error creating movie:', e);
			alert('Failed to create movie. Please try again.');
		}
	});
}
