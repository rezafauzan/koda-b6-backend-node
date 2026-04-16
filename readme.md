# Coffeeshop Express Backend

A RESTful backend API for a coffeeshop application built with Node.js and Express. This service handles core business logic including authentication, product and order management, and file uploads. It is backed by a PostgreSQL database with Redis for caching/session management, and exposes interactive API documentation via Swagger.

---

## How to Run It

### Requirements

- **Node.js** v18+ (v24 recommended — matches the Dockerfile base image)
- **PostgreSQL** (database name: `coffeeshop`)
- **Redis** (default port: `6379`)
- **npm**

### 1. Clone the Repository

```bash
git clone https://github.com/rezafauzan/koda-b6-backend-node.git
cd koda-b6-backend-node
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Then edit `.env` with your local configuration (see [Environment Variables](#environment-variables) below).

### 4. Run Database Migrations

The `migrations/` folder contains SQL migration files. Apply them to your PostgreSQL database manually or using your preferred migration tool:

```bash
# Example using psql
psql -U postgres -d coffeeshop -f migrations/<migration_file>.sql
```

> Run all migration files in order if there are multiple.

### 5. Run in Development

```bash
npm run dev
```

Uses Node.js `--watch` flag for live-reloading on file changes. Environment variables are loaded from `.env` automatically via `--env-file=.env`.

### 6. Run in Production

```bash
npm run start
```

### 7. Run with Docker

```bash
docker build -t coffeeshop-backend .
docker run -p 8888:8888 --env-file .env coffeeshop-backend
```

---

## Project Structure

```
koda-b6-backend-node/
├── src/
│   └── main.js           # Application entry point; initializes Express and mounts routes
├── migrations/           # SQL migration files for PostgreSQL schema setup
├── .github/
│   └── workflows/        # GitHub Actions CI/CD pipeline configuration
├── .env.example          # Template for required environment variables
├── Dockerfile            # Docker build configuration (Node 24 Alpine)
├── package.json          # Project metadata, scripts, and dependencies
└── package-lock.json     # Locked dependency tree
```

---

## API Endpoints

The application uses **Express 5** and serves a REST API. Interactive documentation is available via Swagger UI at:

```
http://localhost:8888/api-docs
```

Based on the dependencies present (`argon2`, `jsonwebtoken`, `multer`, `pg`, `redis`, `nanoid`), the API likely includes the following resource groups:

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and receive a JWT token |
| `GET` | `/products` | List all products |
| `POST` | `/products` | Create a new product (with file upload support) |
| `GET` | `/products/:id` | Get a single product |
| `PUT` | `/products/:id` | Update a product |
| `DELETE` | `/products/:id` | Delete a product |
| `GET` | `/orders` | List orders |
| `POST` | `/orders` | Create a new order |

> **Note:** Refer to the Swagger UI at `/api-docs` for the full, authoritative list of endpoints and request/response schemas.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js (ES Modules, `"type": "module"`) |
| Framework | Express.js v5 |
| Database | PostgreSQL (`pg` v8) |
| Caching | Redis (`redis` v5) |
| Authentication | JSON Web Tokens (`jsonwebtoken` v9) |
| Password Hashing | Argon2 (`argon2` v0.44) |
| File Uploads | Multer v2 |
| ID Generation | Nanoid v5 |
| API Docs | Swagger (`swagger-jsdoc` + `swagger-ui-express`) |
| Containerization | Docker (Node 24 Alpine) |
| CI/CD | GitHub Actions |

---

## Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8888` | Port the server listens on |
| `PGHOST` | `localhost` | PostgreSQL host |
| `PGPORT` | `5432` | PostgreSQL port |
| `PGUSER` | `postgres` | PostgreSQL username |
| `PGPASSWORD` | _(empty)_ | PostgreSQL password |
| `PGSSLMODE` | `disable` | PostgreSQL SSL mode (`disable` / `require`) |
| `PGDATABASE` | `coffeeshop` | PostgreSQL database name |
| `FRONTEND_URL` | `*` | Allowed CORS origin(s) for the frontend |
| `BASE_URL` | `localhost:8888` | Base URL of this backend service |
| `REDIS_HOST` | `localhost` | Redis host |
| `REDIS_PORT` | `6379` | Redis port |
| `APP_SECRET` | _(empty)_ | Secret key used for JWT signing — **must be set in production** |

---

## Notes

### Authentication
- The application uses **JWT (JSON Web Tokens)** for stateless authentication (`jsonwebtoken`).
- Passwords are hashed using **Argon2**, a modern and secure hashing algorithm.
- Set a strong, random value for `APP_SECRET` in production. Never commit this value to version control.

### Redis
- Redis is used alongside PostgreSQL, likely for caching, rate limiting, or session/token blacklisting.
- Ensure the Redis service is running before starting the application.

### File Uploads
- **Multer** is included for handling `multipart/form-data` requests (e.g., product image uploads).

### ES Modules
- The project uses native **ES Modules** (`"type": "module"` in `package.json`). Use `import`/`export` syntax throughout — `require()` is not available.

### Development Mode
- `npm run dev` uses Node.js's built-in `--watch` flag, so no additional tools like `nodemon` are required.
- The `.env` file is loaded automatically via `--env-file=.env` — no `dotenv` package needed.

### Docker
- The Docker image is based on `node:24-alpine` and exposes port `8888`.
- Pass environment variables at runtime using `--env-file .env` or individual `-e` flags.