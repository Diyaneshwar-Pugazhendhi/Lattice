# TaskFlow — Real-time Collaborative Task Board

A production-grade, full-stack task management application featuring real-time collaboration, secure authentication, and a polished UI. Drag-and-drop tasks across columns, see changes instantly, and collaborate with your team.

![Preview](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)
![Preview](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript&logoColor=white)
![Preview](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma&logoColor=white)
![Preview](https://img.shields.io/badge/Socket.io-4.8-black?logo=socket.io&logoColor=white)
![Preview](https://img.shields.io/badge/Auth.js-5-orange?logo=auth0&logoColor=white)
![Preview](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![Preview](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🎯 **Kanban Board** — Drag-and-drop tasks between To Do, In Progress, and Done columns
- ⚡ **Real-time Updates** — Socket.io powered live collaboration across all connected clients
- 🔐 **Secure Authentication** — Auth.js (NextAuth v5) with Google OAuth and email/password
- 🎨 **Beautiful UI** — Modern Tailwind CSS design with shadcn/ui patterns
- 📱 **Responsive** — Works perfectly on desktop, tablet, and mobile
- 🌙 **Type-safe** — End-to-end TypeScript with strict mode
- 🗄️ **Database** — Prisma ORM with SQLite (dev) / PostgreSQL (prod) support
- 🐳 **Docker Ready** — Full Docker Compose setup included

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5.6 (strict mode) |
| **Database** | Prisma 5.22 with SQLite / PostgreSQL |
| **Real-time** | Socket.io 4.8 |
| **Auth** | Auth.js v5 (NextAuth) with JWT + Prisma adapter |
| **UI** | Tailwind CSS 3.4 + Radix UI patterns |
| **Validation** | Zod 3.23 |
| **Icons** | Lucide React |
| **Server** | Custom Node.js HTTP server (Next.js + Socket.io) |
| **Containerization** | Docker + Docker Compose |

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+ and npm
- **Docker** (optional, for containerized setup)

### Option 1: Local Development (Recommended)

```bash
# Clone the repository
git clone https://github.com/Diyaneshwar-Pugazhendhi/taskboard.git
cd taskboard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your AUTH_SECRET
# Generate a secret: openssl rand -base64 32

# Initialize the database
npx prisma db push
npx prisma generate

# Start the custom server (Next.js + Socket.io)
npm run dev
```

The application will be available at **http://localhost:3000**.

### Option 2: Docker

```bash
# Clone and navigate
git clone https://github.com/Diyaneshwar-Pugazhendhi/taskboard.git
cd taskboard

# Start the full stack
docker-compose up --build
```

The app will be available at **http://localhost:3000**, with PostgreSQL on port 5432.

## 🔐 Demo Credentials

The seeded database includes a demo account:

```
Email:    admin@taskboard.dev
Password: admin123
```

Or you can sign up with your email and password to create a new account.

## 📁 Project Structure

```
taskboard/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/         # Auth.js endpoints + register
│   │   ├── tasks/        # Task CRUD operations
│   │   └── socket/       # Socket.io endpoint
│   ├── login/            # Sign-in page
│   ├── signup/           # Sign-up page
│   ├── board/            # Main board page (protected)
│   ├── page.tsx          # Landing page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
│
├── components/            # React components
│   ├── Board.tsx         # Main board component
│   ├── TaskColumn.tsx    # Column with drag-and-drop
│   ├── TaskCard.tsx      # Individual task card
│   ├── CreateTaskModal.tsx
│   ├── Header.tsx        # Top navigation
│   ├── ConnectionStatus.tsx
│   ├── Button.tsx        # Reusable button
│   └── SessionProviderWrapper.tsx
│
├── src/
│   ├── lib/              # Server-side utilities
│   │   ├── prisma.ts    # Prisma client singleton
│   │   ├── auth.ts      # Auth.js configuration
│   │   ├── bcrypt.ts    # Password hashing
│   │   ├── zod.ts       # Validation schemas
│   │   ├── seed.ts      # Database seeding
│   │   └── utils.ts     # Utility functions
│   │
│   └── hooks/            # React hooks
│       ├── useSocket.ts # Socket.io client hook
│       └── useTasks.ts  # Task state management
│
├── prisma/
│   └── schema.prisma     # Database schema
│
├── server.js             # Custom server (Next.js + Socket.io)
├── Dockerfile            # Multi-stage Docker build
├── docker-compose.yml    # Docker Compose stack
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.js    # Tailwind config
└── README.md             # This file
```

## 🗄️ Database Schema

The Prisma schema defines 4 models:

- **User** — Application user with auth relations
- **Account** — OAuth account linkage
- **Session** — Active user sessions
- **Task** — A task with status, priority, and assignment
- **VerificationToken** — Email verification tokens

```prisma
model Task {
  id          String   @id @default(uuid())
  title       String
  description String?
  status      String   @default("todo")
  priority    String   @default("medium")
  columnId    String   @default("todo")
  orderIndex  Int      @default(0)
  authorId    String
  assigneeId  String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create a new user account |
| `GET`/`POST` | `/api/auth/[...nextauth]` | Auth.js endpoints (sign-in, sign-out, callback) |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | List all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `PATCH` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |
| `PATCH` | `/api/tasks/:id/move` | Move task to a different column |

### Real-time

| Event | Description |
|-------|-------------|
| `task_created` | Broadcast when a new task is created |
| `task_updated` | Broadcast when a task is updated |
| `task_deleted` | Broadcast when a task is deleted |
| `task_moved` | Broadcast when a task is moved between columns |

## 🎨 UI Screenshots

The application features:

- **Landing page** with hero, features, and tech stack
- **Sign in / Sign up** pages with Google OAuth and credentials
- **Board view** with three columns and live status indicator
- **Task cards** with priority, date, and quick actions
- **Modals** for creating and editing tasks
- **Responsive design** that works on all screen sizes

## 🔒 Authentication Flow

1. User signs up via Google OAuth or email/password
2. Auth.js creates a session using JWT strategy
3. Passwords are hashed with bcrypt (12 rounds)
4. Protected routes (like `/board`) check the session server-side
5. Socket.io client receives real-time updates after authentication

## 🐳 Docker Deployment

The included `Dockerfile` uses a multi-stage build:

1. **deps** — Installs npm dependencies
2. **builder** — Builds the Next.js application
3. **production** — Minimal runtime image with non-root user

For production deployment:

```bash
# Build production image
docker build --target production -t taskflow:latest .

# Run with production env
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://user:pass@host:5432/db \
  -e AUTH_SECRET=your-secret \
  taskflow:latest
```

## 🧪 Development

### Adding New Features

1. **Database changes** — Edit `prisma/schema.prisma`, then run `npx prisma db push`
2. **API routes** — Add to `app/api/*`
3. **UI components** — Add to `components/`
4. **Validation** — Add Zod schemas to `src/lib/zod.ts`

### Code Style

- TypeScript strict mode enabled
- ESLint with Next.js config
- Tailwind CSS for all styling
- No external UI library dependencies (only Lucide icons)

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👤 Author

**Diyaneshwar-Pugazhendhi**

- GitHub: [@Diyaneshwar-Pugazhendhi](https://github.com/Diyaneshwar-Pugazhendhi)
- Portfolio: [github.com/Diyaneshwar-Pugazhendhi/portfolio](https://github.com/Diyaneshwar-Pugazhendhi/portfolio)

---

Built with ❤️ using Next.js, TypeScript, and Socket.io. A modern, production-ready task management solution showcasing full-stack TypeScript development with real-time features.