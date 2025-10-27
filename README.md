# Talksy

A modern language learning chat application that connects people worldwide to practice conversations in their target languages. Built with React, Node.js, Express, MongoDB, and integrated with Stream Chat for real-time messaging and video calls.

## 🚀 Features

- **Real-time Chat**: Instant messaging with language learners using Stream Chat
- **Video/Voice Calls**: Seamless video and voice calling with Stream Video SDK
- **Friend System**: Connect with learners, send friend requests, build your network
- **User Onboarding**: Personalized setup with native/learning languages and bio
- **Theme Customization**: Multiple themes with DaisyUI and Tailwind CSS
- **Responsive Design**: Optimized for desktop and mobile devices
- **Secure Authentication**: JWT-based auth with password hashing
- **Notifications**: Real-time notifications for messages, calls, and friend requests
- **Smooth Animations**: Framer Motion for page transitions and micro-animations

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS + DaisyUI** - Utility-first CSS with component library
- **React Router v7** - Client-side routing
- **Zustand** - Lightweight state management
- **TanStack React Query** - Data fetching and caching
- **Stream Chat React SDK** - Real-time messaging UI
- **Stream Video React SDK** - Video calling functionality
- **Framer Motion** - Animations and transitions
- **React Hot Toast** - Notification system
- **Axios** - HTTP client

### Backend
- **Node.js + Express** - Server-side JavaScript framework
- **MongoDB + Mongoose** - NoSQL database and ODM
- **JWT + bcryptjs** - Authentication and password hashing
- **Stream Chat SDK** - Real-time messaging backend
- **CORS + cookie-parser** - Cross-origin and cookie handling
- **Nodemon** - Development auto-restart

## 📁 Project Structure

```
talksy/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── store/          # Zustand state stores
│   │   ├── constants/      # App constants
│   │   └── ...
│   ├── package.json
│   └── README.md
├── backend/                # Node.js backend API
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── lib/            # Database and utilities
│   ├── package.json
│   └── README.md
├── package.json            # Root package.json
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Stream Chat account (for API keys)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/talksy.git
   cd talksy
   ```

2. **Install root dependencies** (optional, for monorepo management):
   ```bash
   npm install
   ```

3. **Set up the backend**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the backend directory:
   ```
   MONGO_URI=mongodb://localhost:27017/talksy
   JWT_SECRET_KEY=your_jwt_secret_key_here
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   NODE_ENV=development
   ```

4. **Set up the frontend**:
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the frontend directory:
   ```
   VITE_API_BASE_URL=http://localhost:5001/api
   VITE_STREAM_API_KEY=your_stream_api_key
   ```

5. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

6. **Start the backend server**:
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on `http://localhost:5001`

7. **Start the frontend development server**:
   ```bash
   cd frontend
   npm run dev
   ```
   App runs on `http://localhost:5173`

## 📖 Usage

1. **Sign Up**: Create an account with email and password
2. **Onboarding**: Set up your profile with languages and bio
3. **Explore**: Browse recommended users and send friend requests
4. **Chat**: Start conversations with friends in real-time
5. **Call**: Make video or voice calls to practice speaking
6. **Customize**: Switch themes and personalize your experience

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/onboard` - Complete onboarding

### Users
- `GET /api/users/friends` - Get friends list
- `GET /api/users/friend-requests` - Get friend requests
- `POST /api/users/friend-request` - Send friend request
- `POST /api/users/accept-friend-request` - Accept request
- `GET /api/users/recommended` - Get recommendations

### Chat
- `POST /api/chat/create-channel` - Create chat channel

## 🎨 Themes

Talksy supports multiple themes:
- Light
- Dark
- Custom themes via DaisyUI

Themes are managed through Zustand store and applied globally.

## 🔒 Security

- JWT authentication with HTTP-only cookies
- Password hashing with bcryptjs
- CORS configuration for frontend access
- Input validation and sanitization
- Secure environment variable management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact the development team

## 🙏 Acknowledgments

- [Stream Chat](https://getstream.io/chat/) for real-time messaging
- [Stream Video](https://getstream.io/video/) for video calling
- [DaisyUI](https://daisyui.com/) for UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
