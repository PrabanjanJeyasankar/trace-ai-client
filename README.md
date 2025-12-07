# AI Chat Client

A React-based AI Chat application offering a interface with markdown support, and chat history management.

## Prerequisites

- Node.js
- npm

## Setup & Running Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables:
   Copy `.env.example` to `.env` and update the values.

   ```bash
   cp .env.example .env
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will differ at http://localhost:5173 (default Vite port).

## Production Build

Build the project for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# Technical Documentation

## Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Markdown Rendering**: react-markdown, remark-gfm, shiki (syntax highlighting)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **UI Components**: Radix UI primitives (via shadcn/ui patterns)

## Project Structure

```
src/
├── api/            # API endpoint definitions and configuration
├── assets/         # Static assets (images, fonts)
├── components/     # Reusable UI components
│   ├── chat/       # Chat-specific components (ChatWindow, ChatInput, etc.)
│   ├── ui/         # Generic UI components (likely shadcn/ui based)
│   └── navigation/ # Navigation components (Sidebar, etc.)
├── config/         # App-wide configuration (e.g., LLM limits)
├── hooks/          # Custom React hooks
├── layouts/        # Page layouts
├── lib/            # Utility libraries (axios instance, etc.)
├── pages/          # Page components (Login, Signup, Chat)
├── routes/         # Route definitions (Public, Private, Guards)
├── services/       # API service layers
├── store/          # Zustand state stores
├── types/          # TypeScript type definitions
└── utils/          # Helper functions
```

## Key Features

### Authentication

- JWT-based authentication.
- **Store**: `auth.store.ts` manages user session and tokens.
- **Service**: `auth.service.ts` handles login, signup, and token management.
- **Guards**: `ProtectedRoutes.tsx` ensures only authenticated users can access the chat.

### Chat Functionality

- **State**: `chat.store.ts` handles the complex state of chat sessions, message history, and UI states (loading, typing indicators).
- **Services**:
  - `chat.service.ts`: Manages chat sessions (create, delete, rename, fetch history).
  - `message.service.ts`: Handles sending/receiving messages.
  - `search.service.ts`: Provides functionality to search through chat history.
- **Markdown**: Messages support Markdown rendering with code syntax highlighting.

## Routing

| Path            | Type    | Description                         |
| --------------- | ------- | ----------------------------------- |
| `/login`        | Public  | User login page                     |
| `/signup`       | Public  | User registration page              |
| `/chat`         | Private | New chat interface / Welcome screen |
| `/chat/:chatId` | Private | Active chat session                 |

## State Management (Zustand)

### Chat Store (`useChatStore`)

- **`chats`**: Dictionary of cached chat sessions.
- **`currentChatId`**: ID of the currently active chat.
- **`history`**: List of past chat sessions for the sidebar.
- **`isAssistantTyping`**: Controls the typing indicator.
- **`tempChat`**: Handling of temporary chats before they are persisted.

### Auth Store (`useAuthStore`)

- **`currentUser`**: Details of the logged-in user.
- **`isAuthenticated`**: Boolean flag for auth state.

## Configuration

Environment variables are managed via `.env` files.

- `VITE_API_BASE_URL`: The base URL of the backend API.

## Development

- **Linting**: ESLint with React and TypeScript configurations.
- **Formatting**: Prettier (implied usage).
- **Type Checking**: TypeScript strict mode enabled.
