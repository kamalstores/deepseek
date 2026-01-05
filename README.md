# 🤖 DeepSeek AI Chatbot

A full-stack AI-powered chatbot application built with Next. js, featuring Google Gemini AI integration, user authentication, and persistent chat history.

[[Live Demo]](https://deepseek-seven-phi.vercel.app/)


## 📋 Overview

DeepSeek is a modern, feature-rich AI chatbot application that allows users to have conversations with AI, manage multiple chat sessions, and maintain their chat history. The application uses Google's Gemini AI for intelligent responses and Clerk for seamless authentication.

## ✨ Key Features

### 💬 Chat Features
- **AI-Powered Conversations**:  Intelligent responses powered by Google Gemini 2.0 Flash
- **Multi-Chat Support**: Create and manage multiple chat sessions
- **Real-time Streaming**: Animated word-by-word response display
- **Message Actions**: Copy, edit, regenerate, like/dislike messages
- **Syntax Highlighting**: Code blocks with Prism.js syntax highlighting
- **Markdown Support**: Rich text formatting in responses

### 🎨 User Interface
- **Collapsible Sidebar**: Expandable/collapsible navigation with smooth transitions
- **Responsive Design**:  Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Modern dark UI with custom color scheme
- **Smooth Scrolling**: Hidden scrollbars with smooth navigation
- **Toast Notifications**: Real-time feedback for user actions

### 🔐 Authentication & Data
- **User Authentication**: Secure authentication via Clerk
- **Persistent Storage**: Chat history saved to MongoDB
- **User Profiles**: User management with profile pictures
- **Chat Management**:  Rename, delete, and organize chats
- **Auto-save**: Conversations automatically saved

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.3.5** - React framework with App Router
- **React 19.0.0** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Markdown** - Markdown rendering
- **Prism.js** - Syntax highlighting
- **React Hot Toast** - Toast notifications
- **Turbopack** - Fast development builds

### Backend & Services
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** with **Mongoose 8. 16.3** - Database
- **Clerk** - Authentication and user management
- **Google Gemini AI** - AI model integration
- **Svix** - Webhook management
- **Axios 1.10.0** - HTTP client

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Type checking (middleware)

## 📁 Project Structure

```
deepseek/
├── app/
│   ├── api/                    # API routes
│   │   ├── chat/              # Chat management APIs
│   │   │   ├── create/        # Create new chat
│   │   │   ├── get/           # Fetch user chats
│   │   │   ├── rename/        # Rename chat
│   │   │   ├── delete/        # Delete chat
│   │   │   └── ai/            # AI response generation
│   │   └── clerk/             # Clerk webhook handler
│   ├── layout.js              # Root layout with providers
│   ├── page. jsx               # Home page
│   ├── globals.css            # Global styles
│   └── prism.css              # Syntax highlighting styles
│
├── components/
│   ├── Sidebar.jsx            # Navigation sidebar
│   ├── PromptBox.jsx          # Message input component
│   ├── Message.jsx            # Message display component
│   └── ChatLabel.jsx          # Chat list item component
│
├── context/
│   └── AppContext. jsx         # Global state management
│
├── models/
│   ├── User.js                # User MongoDB schema
│   └── Chat.js                # Chat MongoDB schema
│
├── config/
│   └── db.js                  # MongoDB connection
│
├── assets/
│   └── assets.js              # Static assets and icons
│
├── public/                     # Public static files
├── middleware. ts               # Next.js middleware
└── package.json               # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Clerk account
- Google AI API key (Gemini)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kamalstores/deepseek. git
   cd deepseek
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory: 
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   SIGNING_SECRET=your_clerk_signing_secret
   
   # MongoDB
   MONGODB_URI=your_mongodb_connection_string
   
   # Google Gemini AI
   GEMINI_API_KEY=your_gemini_api_key
   
   # Clerk Redirect URLs (for local development)
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   ```

4. **Set up Clerk Webhook**
   - Deploy your application to Vercel (or your hosting platform)
   - In Clerk Dashboard, go to Webhooks
   - Add endpoint: `https://your-domain.com/api/clerk`
   - Select events: `user.created`, `user.updated`, `user.deleted`
   - Copy the signing secret to your `.env` file

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔌 API Endpoints

### Chat Management

#### Create New Chat
```http
POST /api/chat/create
Authorization: Bearer {clerk_token}
```

#### Get User Chats
```http
GET /api/chat/get
Authorization: Bearer {clerk_token}
```

#### Rename Chat
```http
POST /api/chat/rename
Content-Type: application/json

{
  "chatId": "chat_id",
  "name": "New Chat Name"
}
```

#### Delete Chat
```http
POST /api/chat/delete
Content-Type: application/json

{
  "chatId": "chat_id"
}
```

#### Generate AI Response
```http
POST /api/chat/ai
Content-Type: application/json

{
  "chatId": "chat_id",
  "prompt": "Your question here"
}
```

### Webhook

#### Clerk User Events
```http
POST /api/clerk
```
Handles user creation, updates, and deletion from Clerk. 

## 💾 Database Schema

### User Model
```javascript
{
  _id: String,           // Clerk user ID
  email: String,         // User email
  name: String,          // Full name
  image: String,         // Profile picture URL
  createdAt: Date,
  updatedAt: Date
}
```

### Chat Model
```javascript
{
  _id:  ObjectId,
  name: String,          // Chat title
  userId: String,        // Reference to User
  messages: [
    {
      role: String,      // 'user' or 'assistant'
      content: String,   // Message text
      timestamp: Number  // Unix timestamp
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Key Components

### Sidebar Component
- Expandable/collapsible navigation
- New chat button
- Chat history list
- User profile display
- Tooltips on hover

### PromptBox Component
- Multi-line text input
- Enter to send (Shift+Enter for new line)
- Loading state handling
- Prompt validation

### Message Component
- User/AI message differentiation
- Markdown rendering
- Code syntax highlighting
- Action buttons (copy, edit, regenerate, like/dislike)
- Hover interactions

### ChatLabel Component
- Chat selection
- Rename functionality
- Delete functionality
- Three-dot menu

## 🔐 Authentication Flow

1. User signs in via Clerk
2. Clerk webhook fires to `/api/clerk`
3. User data synced to MongoDB
4. JWT token used for API authentication
5. Protected routes check user authentication
6. Chats associated with user ID

## 🤖 AI Integration

The application uses Google's Gemini 2.0 Flash model:
- **Model**: `gemini-2.0-flash`
- **Max Duration**: 60 seconds per request
- **Features**: 
  - Context-aware responses
  - Code generation
  - Multi-turn conversations
  - Fast response times

## 🎯 Features in Detail

### Chat Management
- **Create**:  Automatically creates first chat on signup
- **Read**: Fetches and displays all user chats
- **Update**: Rename chats with custom titles
- **Delete**: Remove unwanted conversations
- **Sort**: Recent chats appear first

### Message Handling
- User messages saved before AI call
- Streaming-like effect with word-by-word display
- Error handling with prompt restoration
- Loading states prevent duplicate sends
- Message timestamps for history

### UI/UX
- Smooth animations with CSS transitions
- Responsive sidebar (desktop/mobile)
- Custom scrollbar styling
- Toast notifications for feedback
- Keyboard shortcuts (Enter, Shift+Enter)
- Hover tooltips

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Desktop**: Full sidebar, expanded layout
- **Tablet**: Collapsible sidebar
- **Mobile**: Overlay sidebar with menu toggle

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- AWS
- Digital Ocean

## 🔧 Configuration

### Tailwind Config
Custom theme colors and styling in `tailwind.config.js`:
- Primary color customization
- Custom scrollbar hiding
- Smooth scroll behavior

### Next.js Config
Turbopack enabled for faster development builds. 

### ESLint Config
Code quality enforcement with Next.js recommended rules.

## 📝 Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🐛 Error Handling

- User authentication checks
- API error responses
- Toast notifications for errors
- Graceful fallbacks
- Loading state management

## 🔒 Security Features

- JWT token authentication
- Clerk's secure authentication
- API route protection
- Environment variable security
- Webhook signature verification
- MongoDB connection security

## 🌟 Future Enhancements

Potential features to add:
- [ ] Voice input/output
- [ ] File upload support
- [ ] Image generation
- [ ] Export chat history
- [ ] Chat sharing
- [ ] Custom AI models
- [ ] Search within chats
- [ ] Chat folders/categories
- [ ] Dark/Light theme toggle
- [ ] Mobile app version

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**kamalstores**
- GitHub: [@kamalstores](https://github.com/kamalstores)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Clerk](https://clerk.com/) - Authentication solution
- [Google Gemini](https://ai.google. dev/) - AI model
- [MongoDB](https://www.mongodb.com/) - Database
- [Vercel](https://vercel.com/) - Deployment platform
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainer.

---

**Language Composition:**
- JavaScript:  88.4%
- CSS: 10.7%
- TypeScript: 0.9%

Made with ❤️ by kamalstores
