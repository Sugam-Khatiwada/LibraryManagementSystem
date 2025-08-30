# Library Management System

Small Express + MongoDB API for managing books, borrowers and borrowing operations.

## Features
- Create, read, update and delete books
- Borrow and return books with availability tracking
- JWT-based authentication and role-based authorization (Librarian, Borrower)

## Requirements
- Node.js 16+ and npm
- MongoDB (Atlas or local)

## Environment
Copy or update the `.env` file at the project root with these values:

```
PORT=3000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your_jwt_secret
```

Example MongoDB Atlas format:
```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
```

## Install
Open a Windows command prompt in the project folder and run:

```cmd
npm install
```

## Run
Start the server (development):

```cmd
npx nodemon server.js
```

Or run directly:

```cmd
node server.js
```

The server listens on the port defined by `PORT` (default 3000).

## Important endpoints
- POST `/api/auth/register` — register a user (payload depends on your `auth.controller.js`)
- POST `/api/auth/login` — login, returns JWT token (token includes `id` and `role`)
- POST `/api/books` — create a book (requires `Authorization: Bearer <token>`; role: `Librarian`)
- GET `/api/books` — list books
- POST `/api/borrow` — borrow a book (requires token; role: `Borrower` or `Librarian`)
- POST `/api/borrow/return/:borrowId` — return book
- GET `/api/borrow/history` — get borrow history for current user

Adjust exact route prefixes if your router mounts differ.

## Notes & Troubleshooting
- Authentication: tokens are signed with `JWT_SECRET`. The decoded token payload includes `id` and `role`. Use `req.user.id` in controllers (not `req.user.userId`).
- Common MongoDB error: `bad auth` / `Authentication failed` — verify `MONGO_URI`, username/password, database name and Atlas IP whitelist.
- If you see `Path "userId" is required` when creating a borrow record, ensure middleware decodes the token and sets `req.user` and that controllers use `req.user.id`.
- If using Postman, add header `Authorization: Bearer <token>` for protected endpoints.

## Development suggestions
- Add tests for `createBook`, `borrowBook` and auth flows.
- Validate request payloads with a library like `joi` or `express-validator`.

## License
MIT
