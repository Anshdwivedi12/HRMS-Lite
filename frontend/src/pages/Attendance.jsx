import React, { useState, useEffect } from 'react';
import { attendanceAPI, employeeAPI } from '../services/api';
import { validateAttendanceForm, formatDateDisplay, getTodayDate } from '../utils/validation';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Loading from '../components/common/Loading';
import toast from 'react-hot-toast';
import './Attendance.css';

const Attendance = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Mark Attendance Form
    const [markForm, setMarkForm] = useState({
        employee_id: '',
        date: getTodayDate(),
        status: 'Present'
    });
    const [markFormErrors, setMarkFormErrors] = useState({});

    // View Attendance
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loadingRecords, setLoadingRecords] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await employeeAPI.getAll();
            if (response.success) {
                setEmployees(response.data);
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
            toast.error('Failed to load employees');
        } finally {
            setLoading(false);
        }
    };

    const handleMarkFormChange = (e) => {
        const { name, value } = e.target;
        setMarkForm(prev => ({ ...prev, [name]: value }));
        if (markFormErrors[name]) {
            setMarkFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleMarkAttendance = async (e) => {
        e.preventDefault();

        const errors = validateAttendanceForm(markForm);
        if (Object.keys(errors).length > 0) {
            setMarkFormErrors(errors);
            return;
        }

        try {
            setSubmitting(true);
            const response = await attendanceAPI.mark(markForm);

            if (response.success) {
                toast.success('Attendance marked successfully');
                setMarkForm({
                    employee_id: '',
                    date: getTodayDate(),
                    status: 'Present'
                });
                setMarkFormErrors({});

                // Refresh records if viewing the same employee
                if (selectedEmployeeId === markForm.employee_id) {
                    fetchAttendanceRecords(selectedEmployeeId);
                }
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to mark attendance';
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    const handleViewAttendance = async (e) => {
        const employeeId = e.target.value;
        setSelectedEmployeeId(employeeId);

        if (!employeeId) {
            setAttendanceRecords([]);
            return;
        }

        fetchAttendanceRecords(employeeId);
    };

    const fetchAttendanceRecords = async (employeeId) => {
        try {
            setLoadingRecords(true);
            const response = await attendanceAPI.getByEmployee(employeeId);

            if (response.success) {
                setAttendanceRecords(response.data);
            }
        } catch (error) {
            console.error('Error fetching attendance records:', error);
            toast.error('Failed to load attendance records');
        } finally {
            setLoadingRecords(false);
        }
    };

    if (loading) {
        return <Loading message="Loading attendance page..." />;
    }

    return (
        <div className="attendance-page">
            <header className="page-header">
                <div className="header-left">
                    <h1>Attendance Management</h1>
                    <p>Track and manage employee attendance records</p>
                </div>
                <div className="header-right">
                    <div className="search-bar">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input type="text" placeholder="Search..." />
                    </div>
                    <button className="btn btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 9.5-9.5z"></path></svg>
                        Mark Attendance
                    </button>
                </div>
            </header>

            <div className="attendance-filters card">
                <div className="filter-group">
                    <select
                        id="employee_id"
                        value={selectedEmployeeId}
                        onChange={handleViewAttendance}
                        className="select-custom"
                    >
                        <option value="">Select employee</option>
                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.employee_id}>
                                {emp.full_name} ({emp.employee_id})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="attendance-main-view card">
                {!selectedEmployeeId && attendanceRecords.length === 0 ? (
                    <div className="empty-state-large">
                        <div className="empty-icon-box">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        </div>
                        <h3>No records to show</h3>
                        <p>Select an employee from the dropdown above to view their history or mark new attendance.</p>
                        {employees.length === 0 && <a href="/employees" className="btn btn-primary">Go to Employees</a>}
                    </div>
                ) : (
                    <div className="attendance-results">
                        <div className="record-grid">
                            <h3 className="section-title">Attendance History</h3>
                            {loadingRecords ? (
                                <Loading message="Fetching records..." />
                            ) : attendanceRecords.length > 0 ? (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attendanceRecords.map(record => (
                                            <tr key={record.id}>
                                                <td>{formatDateDisplay(record.date)}</td>
                                                <td>
                                                    <span className={`badge badge-${record.status === 'Present' ? 'success' : 'danger'}`}>
                                                        {record.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="empty-state-large">
                                    <p>No records for this employee yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {selectedEmployeeId && (
                <div className="mark-attendance-section card">
                    <h3 className="section-title">Mark Attendance</h3>
                    <form onSubmit={(e) => {
                        markForm.employee_id = selectedEmployeeId;
                        handleMarkAttendance(e);
                    }} className="attendance-quick-form">
                        <Input
                            type="date"
                            name="date"
                            value={markForm.date}
                            onChange={handleMarkFormChange}
                            error={markFormErrors.date}
                            required
                        />
                        <div className="radio-group-modern">
                            <label className={`radio-pill ${markForm.status === 'Present' ? 'active' : ''}`}>
                                <input type="radio" name="status" value="Present" checked={markForm.status === 'Present'} onChange={handleMarkFormChange} />
                                Present
                            </label>
                            <label className={`radio-pill ${markForm.status === 'Absent' ? 'active' : ''}`}>
                                <input type="radio" name="status" value="Absent" checked={markForm.status === 'Absent'} onChange={handleMarkFormChange} />
                                Absent
                            </label>
                        </div>
                        <Button type="submit" loading={submitting}>Save Attendance</Button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Attendance;
