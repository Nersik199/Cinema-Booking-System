
# Cinema Booking System

![Node.js](https://img.shields.io/badge/node.js-v14.17.5-green)
![Express](https://img.shields.io/badge/Express-v4.17.1-blue)
![Sequelize](https://img.shields.io/badge/Sequelize-v6.6.5-yellow)
![MySQL](https://img.shields.io/badge/MySQL-v8.0.26-lightblue)
![JWT](https://img.shields.io/badge/JWT-token-red)
![License](https://img.shields.io/badge/License-MIT-brightgreen)

This is a cinema booking system where users can register, log in, view available movies and showtimes, and book seats for a specific showtime. Admins have the ability to manage movies, showtimes, and reservations.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Setup and Installation](#setup-and-installation)
5. [Database Structure](#database-structure)
6. [API Endpoints](#api-endpoints)
7. [Environment Variables](#environment-variables)
8. [Usage](#usage)
9. [Error Handling](#error-handling)
10. [License](#license)

## Project Overview
The Cinema Booking System allows users to register and book seats for movie showtimes. Admins can add new movies and create showtimes for each movie. It also features a fully functional authentication system, where users can log in and update their profiles.

## Features
### For Users:
- User registration and login
- View available movies and showtimes
- Book seats for a selected showtime
- View booking history
- Profile management (update personal details)

### For Admins:
- Add new movies to the system
- Create showtimes for movies
- View and manage seat reservations

## Technology Stack
**Backend:**
- Node.js
- Express.js
- Sequelize (for database interaction)
- MySQL (as the database)

**Frontend:**
- EJS (for rendering views)
- HTML/CSS (for basic styling)
- JavaScript 

**Middleware:**
- JSON Web Tokens (JWT) for authentication
- Joi for request validation

## Setup and Installation
1. **Clone the repository**
```bash
git clone https://github.com/yourusername/cinema-booking-system.git
cd cinema-booking-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up the database**
Ensure you have MySQL installed and running on your system. Create a new database and update your `.env` file with your database credentials.

4. **Set up environment variables**
Create a `.env` file in the root directory with the following content:
```bash
# Server configuration
PORT=3000

# JWT Secret key
JWT_TOKEN=your_secret_key

# Database configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_DATABASE=cinema_db
```



5. **Start the server**
```bash
npm run dev
```

Your app should now be running on `http://localhost:3000`.

## Database Structure
This project uses MySQL with Sequelize ORM. Here’s the basic structure:

### Users Table
- `id` (primary key)
- `username`
- `password` (hashed)
- `email`
- `role` (either 'user' or 'admin')

### Movies Table
- `id` (primary key)
- `title`
- `genre`
- `releaseDate`

### ShowTimes Table
- `id` (primary key)
- `movieId` (foreign key referencing Movies table)
- `showtime` (datetime of the showtime)

### Seats Table
- `id` (primary key)
- `row` (seat row, e.g., A, B, C)
- `number` (seat number in the row)
- `isAvailable` (boolean indicating seat availability)

### Reservations Table
- `id` (primary key)
- `userId` (foreign key referencing Users table)
- `showtimeId` (foreign key referencing ShowTimes table)
- `seatId` (foreign key referencing Seats table)

## API Endpoints
### User Routes
| Method | Endpoint                   | Description                       | Auth Required |
|--------|----------------------------|-----------------------------------|---------------|
| GET    | /registration               | Render registration form          | No            |
| POST   | /registration               | Register a new user               | No            |
| POST   | /login                      | Log in and get JWT token          | No            |
| GET    | /profile                    | Get logged-in user's profile      | Yes           |
| PUT    | /update/user/profile        | Update user's profile             | Yes           |
| DELETE | /delete/user/:id            | Delete user account               | Yes           |

### Cinema Routes
| Method | Endpoint                   | Description                       | Auth Required |
|--------|----------------------------|-----------------------------------|---------------|
| GET    | /movies/data                | Get all movies with showtimes     | Yes           |
| GET    | /seats/status               | Get seat availability for showtime| Yes           |
| POST   | /reserve                    | Reserve a seat for a showtime     | Yes           |

### Admin Routes
| Method | Endpoint                   | Description                       | Auth Required |
|--------|----------------------------|-----------------------------------|---------------|
| GET    | /admin                      | Render admin dashboard            | Yes (Admin)   |
| GET    | /movies                     | Get all movies                    | Yes (Admin)   |
| POST   | /create/movies              | Add a new movie                   | Yes (Admin)   |
| POST   | /create/times               | Add a showtime for a movie        | Yes (Admin)   |

## Environment Variables
Make sure to configure the following environment variables in the `.env` file:
```bash
PORT=                    # The port on which the server runs
JWT_TOKEN=               # Secret key for JWT token signing
DB_HOST=                 # Host for MySQL (e.g., localhost)
DB_PORT=                 # Port for MySQL (usually 3306)
DB_USER=                 # MySQL user
DB_PASSWORD=             # MySQL password
DB_DATABASE=             # MySQL database name
```

## Usage
### User Registration and Login:
- Users can register on the `/registration` page.
- After registration, users can log in on the `/login` page.
- Once logged in, users can view their profile and booking history.

### Booking a Movie:
- After logging in, users can view all available movies and showtimes on the `/movies` page.
- Users can select a movie, view available seats, and book seats for a specific showtime.

### Admin Features:
- Admins can log in and access the `/admin` dashboard to manage movies and showtimes.

## Error Handling
The application includes basic error handling for:
- Invalid login credentials
- Unauthorized access to restricted routes (JWT-based)
- Validation errors (using Joi for input validation)
- 404 Not Found for unavailable routes

## License
This project is licensed under the MIT License.
