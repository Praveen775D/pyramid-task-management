# Pyramid Task Management

A polished full-stack task management application inspired by the supplied Pyramid Figma reference, featuring responsive UI, task workflows, projects, profiles, themes, authentication, and REST APIs.

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- NestJS
- MongoDB
- Mongoose
- JWT Authentication
- REST APIs
- Render Deployment

## Features

- Guest authentication with JWT
- Responsive dashboard
- Board and List views
- Task search and filtering
- Create, edit, and delete tasks
- Drag-and-drop task status updates
- Task details and subtasks
- Comments interface
- Projects and project details
- Profile editing
- Due-date calendar
- Light/Dark mode
- Multiple accent themes
- Responsive design
- Backend validation
- REST API integration

## Project Structure

```text
pyramid-task-management/
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.local
│
├── .gitignore
└── README.md
```

## Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/Praveen775D/pyramid-task-management.git
cd pyramid-task-management
```

### 2. Start Backend

```bash
cd backend
npm install
npm run start:dev
```

Backend runs on:

```text
http://localhost:4000
```

### 3. Start Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

## Environment Variables

### Backend `.env`

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

> Never commit `.env` or `.env.local` files to GitHub.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/guest` | Guest login |
| GET | `/api/auth/me` | Get current user |
| PATCH | `/api/auth/profile` | Update profile |

### Users

| Method | Endpoint | Description |
|---|---|---|
| PATCH | `/api/users/theme` | Update user theme |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get tasks |
| POST | `/api/tasks` | Create task |
| PATCH | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## Deployment

The application is deployed using:

- **Frontend:** Render
- **Backend:** Render
- **Database:** MongoDB Atlas

### Live Application

**Frontend**

https://pyramid-task-management-2.onrender.com

**Backend**

https://pyramid-task-management-1.onrender.com

## Design

The application follows the supplied Pyramid Figma reference with a focus on:

- Clean workspace navigation
- Compact typography
- Responsive layouts
- Task cards and tables
- Search and filtering
- Popovers and dialogs
- Task detail sidebar
- Theme customization
- Mobile-friendly interactions

## Git Workflow

The project was developed using meaningful commits covering:

- Project initialization
- Frontend implementation
- Backend implementation
- MongoDB integration
- Authentication
- Task management
- Projects and profiles
- Theme customization
- Validation and UI improvements
- Deployment configuration
- Documentation

## Assessment

This project demonstrates full-stack development skills including:

- Frontend development with Next.js and TypeScript
- Responsive UI implementation
- Backend development with NestJS
- REST API development
- MongoDB database integration
- JWT authentication
- Form validation
- State management
- Deployment and environment configuration

## Repository

GitHub:

https://github.com/Praveen775D/pyramid-task-management

## License

This project was created for assessment and demonstration purposes.