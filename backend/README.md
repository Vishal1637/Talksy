# Talksy Backend

A robust Node.js backend for Talksy, a language learning chat application. This API server handles user authentication, friend management, chat functionality, and integrates with Stream Chat for real-time messaging and video calls.

## Features

- **User Authentication**: JWT-based authentication with secure password hashing.
- **User Management**: Profile creation, onboarding, and user data management.
- **Friend System**: Send, accept, and manage friend requests.
- **Real-time Chat**: Integration with Stream Chat for messaging channels.
- **Video/Voice Calls**: Support for real-time communication via Stream Video.
- **Database**: MongoDB with Mongoose for data persistence.
- **Security**: CORS, cookie-based authentication, and input validation.
- **Error Handling**: Comprehensive error handling and logging.

## Tech Stack

- **Runtime**: Node.js with ES modules
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) with bcryptjs for password hashing
- **Real-time Communication**: Stream Chat SDK
- **Middleware**: CORS, cookie-parser
- **Development**: Nodemon for hot reloading
- **Environment**: dotenv for configuration management

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/talksy.git
   cd talksy/backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the backend directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/talksy
   JWT_SECRET_KEY=your_jwt_secret_key
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   NODE_ENV=development
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5001`.

## Usage

- **Development**: `npm run dev` - Starts the server with Nodemon for auto-restart.
- **Production**: `npm start` - Starts the server in production mode.

## Project Structure

```
backend/
├── src/
│   ├── controllers/        # Route handlers
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── user.controller.js    # User management
│   │   └── chat.controller.js    # Chat functionality
│   ├── lib/                # Utility libraries
│   │   ├── db.js           # Database connection
│   │   └── stream.js       # Stream Chat utilities
│   ├── middleware/         # Express middleware
│   │   └── auth.middleware.js   # JWT authentication middleware
│   ├── models/             # Mongoose models
│   │   ├── User.js         # User schema
│   │   └── FriendRequest.js # Friend request schema
│   ├── routes/             # API routes
│   │   ├── auth.route.js   # Authentication routes
│   │   ├── user.route.js   # User-related routes
│   │   └── chat.route.js   # Chat routes
│   └── server.js           # Main server file
├── package.json
├── .env                    # Environment variables (not in repo)
└── README.md
```

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /signup` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /onboard` - Complete user onboarding

### User Routes (`/api/users`)
- `GET /friends` - Get user's friends list
- `GET /friend-requests` - Get pending friend requests
- `POST /friend-request` - Send friend request
- `POST /accept-friend-request` - Accept friend request
- `POST /reject-friend-request` - Reject friend request
- `GET /recommended` - Get recommended users for friendship
- `GET /profile/:id` - Get user profile

### Chat Routes (`/api/chat`)
- `POST /create-channel` - Create a chat channel between two users

## Database Models

### User Model
- `email`: String (unique, required)
- `fullName`: String (required)
- `password`: String (hashed, required)
- `profilePic`: String (default avatar URL)
- `bio`: String
- `nativeLanguage`: String
- `learningLanguage`: String
- `location`: String
- `isOnboarded`: Boolean (default: false)
- `friends`: Array of ObjectIds (references to other users)
- `timestamps`: createdAt, updatedAt

### FriendRequest Model
- `sender`: ObjectId (reference to User)
- `receiver`: ObjectId (reference to User)
- `status`: String (enum: 'pending', 'accepted', 'rejected')
- `timestamps`: createdAt, updatedAt

## Stream Chat Integration

The backend integrates with Stream Chat for real-time messaging:

- **User Creation**: Automatically creates Stream users during signup and onboarding.
- **Channel Creation**: Creates private channels for direct messaging between friends.
- **Token Generation**: Generates client-side tokens for authenticated users.

## Middleware

- **CORS**: Configured to allow requests from frontend origins (`localhost:5173`, `localhost:5175`).
- **Authentication**: JWT middleware to protect routes and attach user data to requests.
- **Cookie Parser**: Handles HTTP-only cookies for JWT storage.

## Environment Variables

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET_KEY`: Secret key for JWT token signing
- `STREAM_API_KEY`: Stream Chat API key
- `STREAM_API_SECRET`: Stream Chat API secret
- `NODE_ENV`: Environment mode (development/production)

## Error Handling

The API includes comprehensive error handling:
- Validation errors for required fields
- Authentication errors for invalid credentials
- Database connection errors
- Stream Chat integration errors
- Generic 500 errors for unexpected issues

## Security Features

- Password hashing with bcryptjs
- JWT tokens with expiration (7 days)
- HTTP-only cookies for token storage
- CORS configuration for frontend access
- Input validation and sanitization

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request.

## License

This project is licensed under the ISC License.

## Support

For issues or questions, please open an issue on GitHub or contact the development team.
