// Validate email format
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate employee ID (alphanumeric, no spaces)
export const validateEmployeeId = (id) => {
    const idRegex = /^[a-zA-Z0-9]+$/;
    return idRegex.test(id);
};

// Format date to YYYY-MM-DD
export const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Format date for display (e.g., "Jan 15, 2024")
export const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

// Get today's date in YYYY-MM-DD format
export const getTodayDate = () => {
    return formatDate(new Date());
};

// Validate employee form data
export const validateEmployeeForm = (data) => {
    const errors = {};

    if (!data.employee_id || !data.employee_id.trim()) {
        errors.employee_id = 'Employee ID is required';
    } else if (!validateEmployeeId(data.employee_id)) {
        errors.employee_id = 'Employee ID must be alphanumeric with no spaces';
    }

    if (!data.full_name || !data.full_name.trim()) {
        errors.full_name = 'Full name is required';
    }

    if (!data.email || !data.email.trim()) {
        errors.email = 'Email is required';
    } else if (!validateEmail(data.email)) {
        errors.email = 'Invalid email format';
    }

    if (!data.department || !data.department.trim()) {
        errors.department = 'Department is required';
    }

    return errors;
};

// Validate attendance form data
export const validateAttendanceForm = (data) => {
    const errors = {};

    if (!data.employee_id) {
        errors.employee_id = 'Please select an employee';
    }

    if (!data.date) {
        errors.date = 'Date is required';
    }

    if (!data.status) {
        errors.status = 'Please select attendance status';
    }

    return errors;
};
