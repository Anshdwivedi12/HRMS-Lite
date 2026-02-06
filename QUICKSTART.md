# Quick Start Guide

## 📋 What You Have

A complete HRMS Lite application with:
- ✅ Backend: Node.js + Express + PostgreSQL REST API
- ✅ Frontend: Professional React application
- ✅ Database: PostgreSQL schema with migrations
- ✅ Documentation: README, DEPLOYMENT guide, code walkthrough

## 🚀 Getting Started Locally

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### 2. Setup Database

```bash
# Create PostgreSQL database
createdb hrms_lite

# Run migration
psql hrms_lite < backend/migrations/init.sql
```

### 3. Configure Environment Variables

**Backend** - Copy `backend/.env.example` to `backend/.env`:
```env
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/hrms_lite
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Frontend** - Copy `frontend/.env.example` to `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start Application

```bash
# Terminal 1 - Start Backend
cd backend
npm start
# Backend runs on http://localhost:5000

# Terminal 2 - Start Frontend
cd frontend
npm start
# Frontend runs on http://localhost:3000
```

### 5. Test Application

1. Visit http://localhost:3000
2. Add a new employee on the Employees page
3. Mark attendance for that employee on the Attendance page
4. Check the Dashboard for statistics

## 🌐 Deploy to Production

Follow the detailed instructions in **DEPLOYMENT.md** to deploy:

1. **Database**: Deploy PostgreSQL to Render/Railway/Supabase
2. **Backend**: Deploy to Render or Railway
3. **Frontend**: Deploy to Netlify

All configuration files are ready (netlify.toml, .env.example files).

## 📚 Documentation

- **README.md** - Full project documentation
- **DEPLOYMENT.md** - Step-by-step deployment guide
- **walkthrough.md** (artifact) - Complete code walkthrough

## 🎯 What You Need to Do

### For Local Testing:
1. Run `npm install` in both directories
2. Create PostgreSQL database and run migration
3. Copy .env.example files and fill in your details
4. Start both servers

### For Production:
1. Sign up for hosting services (Render, Railway, Netlify)
2. Follow DEPLOYMENT.md step-by-step
3. Configure environment variables on hosting platforms
4. Deploy!

---

**Built with best practices, security in mind, and professional design. Ready for production! 🚀**
