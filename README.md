# Pyramid Task Management Assessment — Final Pro

A polished full-stack task-management implementation inspired by the supplied Pyramid Figma reference.

## Stack
- Next.js 15 App Router + TypeScript
- Tailwind CSS
- NestJS + TypeScript
- MongoDB + Mongoose
- JWT guest authentication

## Features
- Guest login with JWT
- Responsive workspace shell and profile menu
- Board and List views
- Search
- Fields visibility menu
- Multi-section filters
- Add Task modal with validation
- Drag tasks between status columns
- Task detail page
- Editable title, status, priority, member, labels and due date
- Custom calendar date picker
- Subtask creation
- Comments UI
- Projects and project detail screens
- Profile editing for name, title and username
- Light/Dark theme persistence
- Amber, Blue, Pink, Rose, Emerald and Black accent modes
- Motion and reduced-motion support
- NestJS validation and REST APIs

## Run locally
### 1. MongoDB
MongoDB may run as a Windows service or via Docker. The backend defaults to:
`mongodb://127.0.0.1:27017/pyramid_assessment`

### 2. Backend
```powershell
cd backend
npm install
npm run start:dev
```
Runs on `http://localhost:4000`.

### 3. Frontend
```powershell
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:3000` by default.

If Next.js selects another port, the NestJS CORS configuration already accepts localhost:3000 and localhost:3001.

## Environment
Backend `.env`:
```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/pyramid_assessment
JWT_SECRET=replace-with-a-long-random-secret
FRONTEND_URL=http://localhost:3000,http://localhost:3001
```

Frontend `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## API
- `POST /api/auth/guest`
- `GET /api/auth/me`
- `PATCH /api/auth/profile`
- `PATCH /api/users/theme`
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Design notes
The implementation follows the supplied reference screenshots for the compact typography, 256px/240px workspace navigation, 192px profile settings navigation, card/table geometry, popovers, theme controls, and task-detail sidebar. Where browser-native behavior is preferable, a native date input is used in the Add Task dialog while the task-detail screen contains a custom calendar matching the visual reference.

## Assessment submission checklist
Before submission:
- Push the project to a public GitHub repository.
- Use several small, meaningful commits rather than one large commit.
- Deploy frontend and backend with a reachable MongoDB instance.
- Verify the live URL in an incognito browser.
- Add the completed AbleSpace Part 2 document/video and screenshots.
- Keep the deployment accessible for at least 45 days.
