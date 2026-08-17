# START HERE — Windows

## 1. Make sure MongoDB is running
Your Windows MongoDB service can be checked with:
```powershell
Get-Service MongoDB
```
It should say `Running`.

You do NOT need Docker for this project if MongoDB is installed as a Windows service.

## 2. Backend
Open PowerShell:
```powershell
cd C:\path\to\pyramid-task-assessment-final-v6\backend
npm install
npm run start:dev
```
Keep this terminal open.

Expected API:
`http://localhost:4000/api`

## 3. Frontend
Open a second PowerShell:
```powershell
cd C:\path\to\pyramid-task-assessment-final-v6\frontend
npm install
npm run dev
```
Open the URL Next.js prints, normally:
`http://localhost:3000`

## 4. First test
1. Click `Continue as Guest`.
2. Confirm `/dashboard` opens.
3. Open Fields and switch List/Board.
4. Open Filter and choose Priority/Member/Status/Label.
5. Add a task.
6. Drag a task to another status column.
7. Open a task.
8. Change Status, Priority and Member.
9. Click the date and select a calendar date.
10. Edit the title.
11. Add a subtask/comment.
12. Click Dexter in the left sidebar and open Profile.
13. Edit Full name, Title and Username.
14. Try Light/Dark and all six color modes, then refresh.

## 5. If frontend runs on port 3001
That is okay. The backend accepts both:
- http://localhost:3000
- http://localhost:3001

If you use a different port, set `FRONTEND_URL` in `backend/.env` to the exact frontend origin and restart NestJS.
