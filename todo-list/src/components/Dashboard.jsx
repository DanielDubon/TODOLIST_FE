import React from 'react';
import { useState } from 'react';
import TaskList from './TaskList';
import CreateTask from './CreateTask';
import '../styles/Dashboard.css';
import logoutIcon from '../assets/logout.png';

const Dashboard = ({ userEmail, onLogout }) => {
    const [refreshTasks, setRefreshTasks] = useState(0);

    const handleTaskCreated = () => {
        setRefreshTasks(prev => prev + 1);
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1 className="welcome-message">¡Hola!, {userEmail}</h1>
                <button onClick={onLogout} className="logout-button">
                    <img src={logoutIcon} alt="Cerrar Sesión" />
                </button>
            </header>
            <div className="dashboard-content">
                <CreateTask onTaskCreated={handleTaskCreated} />
                <TaskList key={refreshTasks} />
            </div>
        </div>
    );
};

export default Dashboard; 