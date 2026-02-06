# HRMS Lite

A modern, production-ready Human Resource Management System for managing employees and attendance tracking.

## 🌟 Features

- **Employee Management**: Add, view, and delete employee records
- **Attendance Tracking**: Mark daily attendance and view history
- **Dashboard**: Real-time statistics for total employees, present, absent, and unmarked attendance
- **Search & Filter**: Quickly find employees by name, ID, email, or department
- **Professional UI**: Clean, corporate design with navy blue theme
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Form Validation**: Client-side and server-side validation for data integrity
- **Toast Notifications**: User-friendly success and error messages
- **Modal Dialogs**: Professional modals instead of browser alerts

## 🛠 Technology Stack

### Frontend
- **React** 18.2.0 - Modern UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications
- **CSS3** - Professional design system with custom properties

### Backend
- **Node.js** - JavaScript runtime
- **Express** 4.18.2 - Web framework
- **PostgreSQL** - Relational database
- **pg** - PostgreSQL client
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **dotenv** - Environment variables

## 📁 Project Structure

```
HRMS Lite/
├── backend/                    # Node.js + Express backend
│   ├── config/
│   │   └── database.js        # PostgreSQL connection pool
│   ├── controllers/           # Business logic
│   │   ├── employeeController.js
│   │   └── attendanceController.js
│   ├── models/               # Database queries
│   │   ├── employeeModel.js
│   │   └── attendanceModel.js
│   ├── routes/               # API routes
│   │   ├── employeeRoutes.js
│   │   └── attendanceRoutes.js
│   ├── middleware/           # Error handling
│   │   └── errorHandler.js
│   ├── migrations/           # Database schema
│   │   └── init.sql
│   ├── server.js             # Entry point
│   ├── package.json
│   └── .env.example          # Environment template
│
├── frontend/                  # React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/       # Reusable components
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── Loading.jsx
│   │   │   └── layout/       # Layout components
│   │   │       └── Navbar.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   └── Attendance.jsx
│   │   ├── services/         # API integration
│   │   │   └── api.js
│   │   ├── utils/            # Helper functions
│   │   │   └── validation.js
│   │   ├── App.jsx           # Main app component
│   │   ├── index.js          # Entry point
│   │   └── index.css         # Design system
│   ├── package.json
│   ├── netlify.toml          # Netlify config
│   └── .env.example
│
├── DEPLOYMENT.md              # Deployment guide
└── README.md                  # This file
```

## 🚀 Local Development Setup

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 12+

### 1. Clone and Setup

```bash
# Navigate to project directory
cd "c:/Users/Admin/Desktop/terraqua/HRMS Lite"
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb hrms_lite

# Run migration
psql hrms_lite < backend/migrations/init.sql
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your database URL
# DATABASE_URL=postgresql://username:password@localhost:5432/hrms_lite
# PORT=5000
# NODE_ENV=development
# FRONTEND_URL=http://localhost:3000

# Start backend server
npm start
```

Backend will run on `http://localhost:5000`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add backend URL
# REACT_APP_API_URL=http://localhost:5000/api

# Start React app
npm start
```

Frontend will run on `http://localhost:3000`

## 🧪 Testing the Application

### Test Backend API

Visit `http://localhost:5000/api/health` - should return success message

### Test Frontend

1. Go to `http://localhost:3000`
2. Add a new employee
3. Mark attendance for that employee
4. View attendance history
5. Check dashboard statistics

## 📊 API Endpoints

### Employee Endpoints
- `GET /api/employees` - Get all employees
- `GET /api/employees/:employeeId` - Get single employee
- `POST /api/employees` - Create new employee
- `DELETE /api/employees/:employeeId` - Delete employee

### Attendance Endpoints
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance/:employeeId` - Get employee attendance history
- `GET /api/attendance/date/:date` - Get attendance for specific date
- `GET /api/attendance/summary` - Get today's attendance summary

### Health Check
- `GET /api/health` - API health status

## 🌐 Live Demo

- **Live Frontend**: [https://hrms-lite-frontend.netlify.app](https://hrms-lite-frontend.netlify.app)
- **Hosted Backend**: [https://hrms-lite-backend-urxb.onrender.com](https://hrms-lite-backend-urxb.onrender.com)

## � Author

**Ansh Dwivedi**

Built with ❤️ for efficient HR management.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/anshdwivedi-/)

---

**Note**: This is a production-ready application submitted for the Full-Stack Coding Assignment. It meets all core requirements and includes bonus features like a real-time dashboard and attendance filtering.
