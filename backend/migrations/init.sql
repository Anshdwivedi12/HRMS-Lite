-- HRMS Lite Database Schema
-- Run this file in your PostgreSQL database to create the required tables
-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(10) NOT NULL CHECK (status IN ('Present', 'Absent')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE,
    UNIQUE (employee_id, date)
);
-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_employee_id ON employees(employee_id);
CREATE INDEX IF NOT EXISTS idx_employee_email ON employees(email);
CREATE INDEX IF NOT EXISTS idx_attendance_employee_id ON attendance(employee_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ language 'plpgsql';
-- Create trigger to automatically update updated_at
CREATE TRIGGER update_employees_updated_at BEFORE
UPDATE ON employees FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- Insert sample data (optional - for testing)
-- Uncomment the lines below if you want some sample data
-- INSERT INTO employees (employee_id, full_name, email, department) VALUES
-- ('EMP001', 'John Doe', 'john.doe@company.com', 'Engineering'),
-- ('EMP002', 'Jane Smith', 'jane.smith@company.com', 'Marketing'),
-- ('EMP003', 'Bob Johnson', 'bob.johnson@company.com', 'Sales');
-- INSERT INTO attendance (employee_id, date, status) VALUES
-- ('EMP001', CURRENT_DATE, 'Present'),
-- ('EMP002', CURRENT_DATE, 'Present'),
-- ('EMP003', CURRENT_DATE, 'Absent');