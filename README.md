# npm install
- `npm i connect-mongo cookie-parser dotenv ejs express express-session express-validator mongoose morgan passport passport-local-mongoose`
- `npm i -D nodemon`
- `npm i github-slugger`
- `npm i connect-flash`
- `npm install bootstrap@5.3.6`

# Notes App

A simple and secure note-taking application built with Node.js, Express, and MongoDB.

## Features

- User Authentication (Register/Login)
- Create, Read, Update, Delete Notes
- Secure Data Storage
- Responsive Design
- Modern UI with Bootstrap

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DB_CONN=your_mongodb_connection_string
PASSPORT_SECRET=your_session_secret
PASSPORT_COOKIE_KEY=notes_app_cookie
```

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`
4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

This app can be deployed to Render.com:

1. Create a Render account at https://render.com
2. Create a new Web Service
3. Connect your GitHub repository
4. Add the environment variables in Render's dashboard
5. Deploy!

## Tech Stack

- Node.js
- Express.js
- MongoDB
- EJS Templates
- Bootstrap
- Passport.js for Authentication

## API Endpoints

### Authentication
- `GET /register` - Registration form
- `POST /register` - Create new user
- `GET /login` - Login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

### Notes
- `GET /notes` - List all notes (requires authentication)
- `GET /notes/add` - Display note creation form
- `POST /notes/add` - Create new note
- `GET /notes/:id/edit` - Display note edit form
- `POST /notes/:id/edit` - Update note
- `GET /notes/:id/delete` - Delete note

## Data Models

### User
- username: String (required, unique)
- email: String (required, unique)
- password: Hashed string (required)

### Note
- title: String (required)
- content: String (required)
- author: ObjectId (reference to User)
- createdAt: Date
- updatedAt: Date

## Security Features

- Password hashing using Passport.js
- Session-based authentication
- CSRF protection
- Input validation and sanitization
- MongoDB injection protection

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
