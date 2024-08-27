const form = document.querySelector('#login-form');

form.addEventListener('submit', async event => {
	event.preventDefault();

	const data = {
		email: document.getElementById('email').value,
		password: document.getElementById('password').value,
	};
	if (data.email === '' && data.password === '') {
		const spanElement = document.createElement('p');
		spanElement.style.textAlign = 'center';
		spanElement.innerText = 'pleas required email of password';
		form.append(spanElement);
		setTimeout(() => {
			spanElement.innerText = '';
		}, 2000);
	}

	const error = document.querySelectorAll('.error');
	error.forEach(span => {
		span.textContent = '';
	});

	try {
		const response = await axios.post('/users/login', data);
		const token = response.data.token;
		const admin = response.data.isAdmin;
		if (admin) {
			localStorage.setItem('token', token);
			location.href = '/admin/admin';
		} else {
			localStorage.setItem('token', token);
			location.href = '/users/profile';
		}
		console.log('Login failed, no token received.');
	} catch (error) {
		if (error.response && error.response.status === 401) {
			const spanElement = document.createElement('p');
			spanElement.style.textAlign = 'center';
			spanElement.innerText = error.response.data.message;
			form.append(spanElement);
			setInterval(() => {
				spanElement.innerText = '';
			}, 2000);
		} else {
			console.error('Error without response:', error.message);
		}
	}
});
