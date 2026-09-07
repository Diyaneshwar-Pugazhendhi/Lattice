# Contributing to TaskFlow

Thank you for your interest in contributing! TaskFlow is a full-stack real-time task management board built with Next.js 15, Prisma, Socket.io, and Auth.js.

## Development Setup

### Prerequisites

- **Node.js** 20+ (required, see `engines` in `package.json`)
- **npm** 9+
- **Docker** (optional, for containerized development with PostgreSQL)

### Getting Started

1. **Fork the repository** and clone it locally:
   ```bash
   git clone https://github.com/<your-username>/taskboard.git
   cd taskboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and fill in the required values:
   - `AUTH_SECRET` — generate one with: `openssl rand -base64 32`

4. **Initialize the database**:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

6. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Next.js + Socket.io) |
| `npm run build` | Build a production-optimized bundle |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint to check for style and errors |
| `npx prisma db push` | Push schema changes to the database |
| `npx prisma generate` | Generate Prisma client after schema changes |
| `npx prisma db seed` | Seed the database with demo data |
| `npx prisma studio` | Open Prisma Studio to browse data |

### Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.6 (strict mode) |
| Database | Prisma 5.22 (SQLite dev / PostgreSQL prod) |
| Auth | Auth.js v5 (NextAuth) |
| Real-time | Socket.io 4.8 |
| Styling | Tailwind CSS 3.4 |

### Project Structure

```
app/
├── api/
│   ├── auth/[...nextauth]/   # Auth.js endpoints
│   ├── tasks/               # Task CRUD API routes
│   └── socket/              # Socket.io handler
├── login/                   # Sign-in page
├── signup/                  # Sign-up page
├── board/                   # Protected board page
├── page.tsx                 # Landing page
└── layout.tsx               # Root layout
components/
├── Board.tsx                # Main board with DnD
├── TaskColumn.tsx           # Column container
├── TaskCard.tsx             # Individual task card
├── CreateTaskModal.tsx      # Task creation modal
└── ...
src/lib/
├── prisma.ts                # Prisma client singleton
├── auth.ts                  # Auth.js configuration
├── bcrypt.ts                # Password hashing
├── zod.ts                   # Validation schemas
└── utils.ts                 # Utility functions
src/hooks/
├── useSocket.ts             # Socket.io client hook
└── useTasks.ts              # Task state management
prisma/
└── schema.prisma            # Database schema
server.js                    # Custom HTTP server (Next.js + Socket.io)
```

### Making Database Changes

When modifying the Prisma schema:

1. Edit `prisma/schema.prisma`
2. Run `npx prisma db push` to apply changes locally
3. Run `npx prisma generate` to regenerate the client
4. Commit the schema change alongside your code

### Code Style

- TypeScript strict mode is enforced
- Run `npm run lint` before committing
- Use functional React components with TypeScript
- Tailwind CSS classes for all styling
- Zod schemas for all API input validation

### Docker Development

For a containerized setup with PostgreSQL:

```bash
docker-compose up --build
```

The app will be available at `http://localhost:3000` with PostgreSQL on port `5432`.

### Demo Credentials

The seeded database includes a demo account:
- **Email**: `admin@taskboard.dev`
- **Password**: `admin123`

### Reporting Issues

Please use the [issue tracker](../issues) for bug reports and feature requests. Include:

- A clear description of the issue or feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Your environment (OS, Node.js version)

### License

By contributing, you agree that your contributions will be licensed under the MIT License.
