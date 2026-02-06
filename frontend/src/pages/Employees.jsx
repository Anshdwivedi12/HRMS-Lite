import React, { useState, useEffect } from 'react';
import { employeeAPI } from '../services/api';
import { validateEmployeeForm } from '../utils/validation';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import Loading from '../components/common/Loading';
import toast from 'react-hot-toast';
import './Employees.css';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [formData, setFormData] = useState({
        employee_id: '',
        full_name: '',
        email: '',
        department: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();

        // Validate form
        const errors = validateEmployeeForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            setSubmitting(true);
            const response = await employeeAPI.create(formData);

            if (response.success) {
                toast.success('Employee added successfully');
                setShowAddModal(false);
                setFormData({ employee_id: '', full_name: '', email: '', department: '' });
                setFormErrors({});
                fetchEmployees();
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to add employee';
            toast.error(errorMessage);

            // Handle unique constraint violations
            if (error.response?.data?.message?.includes('already exists')) {
                setFormErrors({
                    employee_id: 'This Employee ID or email already exists',
                    email: 'This Employee ID or email already exists'
                });
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteClick = (employee) => {
        setSelectedEmployee(employee);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedEmployee) return;

        try {
            setSubmitting(true);
            const response = await employeeAPI.delete(selectedEmployee.employee_id);

            if (response.success) {
                toast.success('Employee deleted successfully');
                setShowDeleteModal(false);
                setSelectedEmployee(null);
                fetchEmployees();
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete employee';
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    // Filter employees based on search term
    const filteredEmployees = employees.filter(emp =>
        emp.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <Loading message="Loading employees..." />;
    }

    return (
        <div className="employees-page">
            <header className="page-header">
                <div className="header-left">
                    <h1>Employees</h1>
                    <p>Manage and organize your organization's workforce</p>
                </div>
                <div className="header-right">
                    <div className="search-bar">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Add Employee
                    </button>
                </div>
            </header>

            {filteredEmployees.length === 0 ? (
                <div className="attendance-main-view card">
                    <div className="empty-state-large">
                        <div className="empty-icon-box">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        </div>
                        <h3>No employees found</h3>
                        <p>
                            {searchTerm
                                ? 'Try adjusting your search terms'
                                : 'Add your first employee to get started'}
                        </p>
                        {!searchTerm && <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Add Employee</button>}
                    </div>
                </div>
            ) : (
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((employee) => (
                                <tr key={employee.id}>
                                    <td><strong>{employee.employee_id}</strong></td>
                                    <td>{employee.full_name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.department}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDeleteClick(employee)}
                                            className="btn-sm"
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add Employee Modal */}
            <Modal
                isOpen={showAddModal}
                onClose={() => {
                    setShowAddModal(false);
                    setFormData({ employee_id: '', full_name: '', email: '', department: '' });
                    setFormErrors({});
                }}
                title="Add New Employee"
            >
                <form onSubmit={handleAddEmployee}>
                    <Input
                        label="Employee ID"
                        name="employee_id"
                        value={formData.employee_id}
                        onChange={handleInputChange}
                        placeholder="e.g., EMP001"
                        error={formErrors.employee_id}
                        required
                    />

                    <Input
                        label="Full Name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        placeholder="e.g., John Doe"
                        error={formErrors.full_name}
                        required
                    />

                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g., john@company.com"
                        error={formErrors.email}
                        required
                    />

                    <Input
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        placeholder="e.g., Engineering"
                        error={formErrors.department}
                        required
                    />

                    <div className="modal-actions">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setShowAddModal(false)}
                            disabled={submitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" loading={submitting}>
                            Add Employee
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedEmployee(null);
                }}
                title="Confirm Delete"
                size="small"
            >
                <p className="delete-message">
                    Are you sure you want to delete <strong>{selectedEmployee?.full_name}</strong>?
                    <br />
                    This will also delete all attendance records for this employee.
                </p>

                <div className="modal-actions">
                    <Button
                        variant="secondary"
                        onClick={() => setShowDeleteModal(false)}
                        disabled={submitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDeleteConfirm}
                        loading={submitting}
                    >
                        Delete
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default Employees;
