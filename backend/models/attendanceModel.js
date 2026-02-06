const db = require('../config/database');

// Mark attendance (upsert - insert or update if exists)
const markAttendance = async (attendanceData) => {
    const { employee_id, date, status } = attendanceData;

    const query = `
    INSERT INTO attendance (employee_id, date, status)
    VALUES ($1, $2, $3)
    ON CONFLICT (employee_id, date)
    DO UPDATE SET status = $3, created_at = CURRENT_TIMESTAMP
    RETURNING *
  `;

    const result = await db.query(query, [employee_id, date, status]);
    return result.rows[0];
};

// Get attendance records for a specific employee
const getAttendanceByEmployee = async (employeeId) => {
    const query = `
    SELECT a.*, e.full_name, e.department
    FROM attendance a
    JOIN employees e ON a.employee_id = e.employee_id
    WHERE a.employee_id = $1
    ORDER BY a.date DESC
  `;

    const result = await db.query(query, [employeeId]);
    return result.rows;
};

// Get all attendance for a specific date
const getAttendanceByDate = async (date) => {
    const query = `
    SELECT a.*, e.full_name, e.email, e.department
    FROM attendance a
    JOIN employees e ON a.employee_id = e.employee_id
    WHERE a.date = $1
    ORDER BY e.full_name
  `;

    const result = await db.query(query, [date]);
    return result.rows;
};

// Get today's attendance summary (count of present/absent)
const getAttendanceSummary = async (date) => {
    const query = `
    SELECT 
      status,
      COUNT(*) as count
    FROM attendance
    WHERE date = $1
    GROUP BY status
  `;

    const result = await db.query(query, [date]);

    // Format the result
    const summary = {
        present: 0,
        absent: 0
    };

    result.rows.forEach(row => {
        if (row.status === 'Present') {
            summary.present = parseInt(row.count);
        } else if (row.status === 'Absent') {
            summary.absent = parseInt(row.count);
        }
    });

    return summary;
};

module.exports = {
    markAttendance,
    getAttendanceByEmployee,
    getAttendanceByDate,
    getAttendanceSummary
};
