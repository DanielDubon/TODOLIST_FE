import { useState } from 'react';
import TaskList from './TaskList';
import CreateTask from './CreateTask';
import '../styles/Dashboard.css';

const Dashboard = ({ userEmail, onLogout }) => {
    const [refreshTasks, setRefreshTasks] = useState(0);

    const handleTaskCreated = () => {
        setRefreshTasks(prev => prev + 1);
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="user-info">
                    <h1>Bienvenido, {userEmail}</h1>
                    <button onClick={onLogout} className="logout-button">
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <main className="dashboard-content">
                <CreateTask onTaskCreated={handleTaskCreated} />
                <TaskList key={refreshTasks} />
            </main>
        </div>
    );
};

export default Dashboard; 