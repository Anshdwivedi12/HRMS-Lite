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

## 🌐 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete deployment instructions.

**Quick Overview:**
1. Deploy PostgreSQL database (Render/Railway/Supabase)
2. Run migration file to create tables
3. Deploy backend to Render/Railway
4. Deploy frontend to Netlify
5. Update environment variables

## 🎨 Design System

### Colors
- **Primary**: Navy Blue (#1e40af)
- **Success**: Green (#10b981)
- **Danger**: Red (#ef4444)
- **Warning**: Orange (#f59e0b)
- **Background**: Light Gray (#f8fafc)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700

### Spacing
- 8px grid system (8px, 16px, 24px, 32px, 48px)

## 🔒 Security Features

- **Helmet.js** for security headers
- **CORS** configuration
- **Parameterized SQL queries** to prevent SQL injection
- **Input validation** on both client and server
- **Error handling** without exposing sensitive data

## 📝 Database Schema

### employees
- `id` - Serial primary key
- `employee_id` - Unique employee identifier
- `full_name` - Employee name
- `email` - Unique email address
- `department` - Department name
- `created_at` - Timestamp
- `updated_at` - Timestamp

### attendance
- `id` - Serial primary key
- `employee_id` - Foreign key to employees
- `date` - Attendance date
- `status` - 'Present' or 'Absent'
- `created_at` - Timestamp
- **Unique constraint** on (employee_id, date)
- **Cascade delete** when employee is deleted

## 🐛 Troubleshooting

### Common Issues

**Database connection error**
- Check if PostgreSQL is running
- Verify DATABASE_URL in .env file

**CORS errors**
- Ensure FRONTEND_URL is set in backend .env
- Check that both servers are running

**API calls failing**
- Verify REACT_APP_API_URL in frontend .env
- Check backend server logs

## 📄 License

This project is open source and available for educational and commercial use.

## 👤 Author

Built with ❤️ for efficient HR management

---

**Note**: This is a production-ready application, but for enterprise use, consider adding:
- User authentication and authorization
- Role-based access control (RBAC)
- Audit logs
- Data export features
- Email notifications
- Two-factor authentication
- Advanced reporting
