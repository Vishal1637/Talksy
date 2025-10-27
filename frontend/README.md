# Talksy Frontend

A modern, responsive frontend for Talksy, a language learning chat application built with React. This app enables users to connect with language learners worldwide, practice conversations, and engage in real-time chats and video calls.

## Features

- **User Authentication**: Secure login and signup with JWT-based authentication.
- **Onboarding**: Personalized setup for native and learning languages, bio, and location.
- **Real-time Chat**: Integrated with Stream Chat for instant messaging with language learners.
- **Video/Voice Calls**: Seamless video and voice calling using Stream Video SDK.
- **Friend System**: Send and receive friend requests, manage friends list.
- **Notifications**: Real-time notifications for friend requests, messages, and calls.
- **Theme Customization**: Multiple themes with DaisyUI and Tailwind CSS.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Animations**: Smooth transitions and micro-animations using Framer Motion.
- **Loading States**: Skeleton loaders and page transitions for better UX.

## Tech Stack

- **Frontend Framework**: React 19 with Hooks (useState, useEffect, useQuery)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with DaisyUI components
- **State Management**: Zustand
- **Routing**: React Router v7
- **Real-time Chat**: Stream Chat React SDK
- **Video Calls**: Stream Video React SDK
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **Query Management**: TanStack React Query

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/talksy.git
   cd talksy/frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the frontend directory with the following variables:
   ```
   VITE_API_BASE_URL=http://localhost:5001/api
   VITE_STREAM_API_KEY=your_stream_api_key
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173`.

## Usage

- **Development**: `npm run dev` - Starts the Vite development server.
- **Build**: `npm run build` - Builds the app for production.
- **Preview**: `npm run preview` - Previews the production build locally.
- **Linting**: `npm run lint` - Runs ESLint to check for code issues.

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Layout.jsx      # Main layout with sidebar and navbar
│   │   ├── Navbar.jsx      # Top navigation bar
│   │   ├── Sidebar.jsx     # Side navigation menu
│   │   ├── FriendCard.jsx  # User card component
│   │   ├── ThemeSelector.jsx # Theme selection dropdown
│   │   └── ...             # Other components
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx    # Dashboard with friends and recommendations
│   │   ├── ChatPage.jsx    # Chat interface
│   │   ├── CallPage.jsx    # Video/voice call page
│   │   ├── LoginPage.jsx   # Login form
│   │   ├── SignUpPage.jsx  # Signup form
│   │   └── ...             # Other pages
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   ├── store/              # Zustand state stores
│   ├── constants/          # App constants (themes, languages)
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles and Stream Chat customizations
├── package.json
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── README.md
```

## Key Components

- **App.jsx**: Handles routing, authentication checks, and theme application.
- **Layout.jsx**: Wraps pages with sidebar and navbar based on authentication and onboarding status.
- **ChatPage.jsx**: Integrates Stream Chat for real-time messaging.
- **CallPage.jsx**: Uses Stream Video SDK for calls.
- **ThemeSelector.jsx**: Allows users to switch between light, dark, and custom themes.

## API Integration

The frontend communicates with the backend via RESTful APIs:

- **Authentication**: `/api/auth/login`, `/api/auth/signup`, `/api/auth/logout`, `/api/auth/onboard`
- **Users**: `/api/users/friends`, `/api/users/friend-requests`
- **Chat**: `/api/chat/create-channel`

All API calls are handled through Axios in `src/lib/api.jsx`.

## Environment Variables

- `VITE_API_BASE_URL`: Base URL for the backend API (default: `http://localhost:5001/api`)
- `VITE_STREAM_API_KEY`: Stream Chat API key for real-time features

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
