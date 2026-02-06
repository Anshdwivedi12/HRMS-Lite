import React, { useState, useEffect } from 'react';
import { attendanceAPI, employeeAPI } from '../services/api';
import Loading from '../components/common/Loading';
import toast from 'react-hot-toast';
import './Dashboard.css';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalEmployees: 0,
        present: 0,
        absent: 0,
        notMarked: 0
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            const [summaryResponse] = await Promise.all([
                attendanceAPI.getSummary(),
                employeeAPI.getAll()
            ]);

            if (summaryResponse.success) {
                setStats(summaryResponse.data);
            }

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading message="Loading dashboard..." />;
    }

    return (
        <div className="dashboard-page">
            <header className="page-header">
                <div className="header-left">
                    <h1>Dashboard</h1>
                    <p>Overview of your organization's workforce</p>
                </div>
                <div className="header-right">
                    <div className="search-bar">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input type="text" placeholder="Search..." />
                    </div>
                </div>
            </header>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-main">
                        <span className="stat-label">Total Employees</span>
                        <h2 className="stat-value">{stats.totalEmployees}</h2>
                        <span className="stat-change positive">+12% from last month</span>
                    </div>
                    <div className="stat-icon-wrapper blue">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-main">
                        <span className="stat-label">Present Today</span>
                        <h2 className="stat-value">{stats.present}</h2>
                        <span className="stat-change">0% attendance rate</span>
                    </div>
                    <div className="stat-icon-wrapper green">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-main">
                        <span className="stat-label">Absent Today</span>
                        <h2 className="stat-value">{stats.absent}</h2>
                        <span className="stat-change">Updated in real time</span>
                    </div>
                    <div className="stat-icon-wrapper red">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-main">
                        <span className="stat-label">Attendance Rate</span>
                        <h2 className="stat-value">0%</h2>
                        <span className="stat-change">Last 30 days average</span>
                    </div>
                    <div className="stat-icon-wrapper purple">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                    </div>
                </div>
            </div>

            <div className="dashboard-content-grid">
                <section className="dashboard-section card">
                    <h3 className="section-title">Quick Actions</h3>
                    <div className="action-list">
                        <a href="/employees" className="action-item">
                            <div className="action-icon blue">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>
                            </div>
                            <div className="action-info">
                                <h4>Manage Employees</h4>
                                <p>Add or remove employees</p>
                            </div>
                        </a>
                        <a href="/attendance" className="action-item">
                            <div className="action-icon green">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            </div>
                            <div className="action-info">
                                <h4>Mark Attendance</h4>
                                <p>Record daily attendance</p>
                            </div>
                        </a>
                    </div>
                </section>

                <section className="dashboard-section card">
                    <h3 className="section-title">Recent Activity</h3>
                    <ul className="activity-list">
                        <li className="activity-item">
                            <span className="dot success"></span>
                            <div className="activity-info">
                                <h4>System is operational</h4>
                                <p>All services running normally</p>
                            </div>
                        </li>
                        <li className="activity-item">
                            <span className="dot blue"></span>
                            <div className="activity-info">
                                <h4>Connected to backend API</h4>
                                <p>Using local database</p>
                            </div>
                        </li>
                        <li className="activity-item">
                            <span className="dot purple"></span>
                            <div className="activity-info">
                                <h4>Ready to manage workforce</h4>
                                <p>Start by adding employees</p>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
