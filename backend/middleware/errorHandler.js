// Centralized error handling middleware

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // PostgreSQL error codes
    if (err.code) {
        switch (err.code) {
            case '23505': // Unique violation
                return res.status(400).json({
                    success: false,
                    message: 'Employee ID or email already exists',
                    error: err.detail || 'Duplicate entry'
                });

            case '23503': // Foreign key violation
                return res.status(404).json({
                    success: false,
                    message: 'Employee not found',
                    error: 'Referenced employee does not exist'
                });

            case '23514': // Check constraint violation
                return res.status(400).json({
                    success: false,
                    message: 'Invalid status. Must be "Present" or "Absent"',
                    error: err.detail || 'Check constraint violation'
                });

            case '22P02': // Invalid text representation
                return res.status(400).json({
                    success: false,
                    message: 'Invalid data format',
                    error: err.detail || 'Invalid input syntax'
                });

            default:
                return res.status(500).json({
                    success: false,
                    message: 'Database error occurred',
                    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
                });
        }
    }

    // Validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            error: err.message
        });
    }

    // Default error response
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: process.env.NODE_ENV === 'development' ? err.stack : 'Internal server error'
    });
};

// 404 handler
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
};

module.exports = { errorHandler, notFound };
