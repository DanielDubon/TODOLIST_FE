import { useState, useEffect } from 'react';
import { getTasks, updateTask, deleteTask } from '../services/api';
import '../styles/TaskList.css';
import checkIcon from '../assets/check.png';
import deleteIcon from '../assets/eliminar.png';
import backIcon from '../assets/regresar.png';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [filter, setFilter] = useState('incomplete');

    const fetchTasks = async () => {
        try {
            const response = await getTasks(page, limit);
            setTasks(response.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener tareas:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [page]);

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.is_completed;
        if (filter === 'incomplete') return !task.is_completed;
        return true;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {

        return new Date(a.created_at) - new Date(b.created_at);
    });

    const handleUpdate = async (taskId) => {
        try {
            await updateTask(taskId);
            fetchTasks();
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
        }
    };

    const handleDelete = async (taskId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
            try {
                await deleteTask(taskId);
                fetchTasks();
            } catch (error) {
                console.error('Error al eliminar la tarea:', error);
            }
        }
    };

    if (loading) return <div>Cargando tareas...</div>;

    return (
        <div className="task-list">
            <h2>Mis Tareas</h2>
            <div className="filter-buttons">
                <button className="incomplete" onClick={() => setFilter('incomplete')}>Por Hacer</button>
                <button className="completed" onClick={() => setFilter('completed')}>Completadas</button>
                <button className="all" onClick={() => setFilter('all')}>Todas</button>
            </div>
            <div className="tasks-container">
                {sortedTasks.length > 0 ? (
                    sortedTasks.map((task) => (
                        <div key={task.id} className="task-card">
                            <div className="task-details">
                                <h3>{task.title}</h3>
                                <p>Creada: {new Date(task.created_at).toLocaleDateString()}</p>
                                <p>Descripción: {task.description || 'Sin descripción'}</p>
                                <p>Estado: {task.is_completed ? 'Completada' : 'Pendiente'}</p>
                            </div>
                            <div className="task-actions">
                                <button
                                    className={`update-button ${task.is_completed ? 'completed' : 'pending'}`}
                                    onClick={() => handleUpdate(task.id)}
                                >
                                    <img src={task.is_completed ? backIcon : checkIcon} alt={task.is_completed ? 'Regresar' : 'Completar'} />
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(task.id)}
                                >
                                    <img src={deleteIcon} alt="Eliminar" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay tareas disponibles</p>
                )}
            </div>
            <div className="pagination">
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                >
                    Anterior
                </button>
                <span>Página {page}</span>
                <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={sortedTasks.length < limit}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default TaskList; 