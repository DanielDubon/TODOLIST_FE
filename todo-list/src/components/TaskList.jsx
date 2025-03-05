import { useState, useEffect } from 'react';
import { getTasks } from '../services/api';
import '../styles/TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit] = useState(5);

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

    if (loading) return <div>Cargando tareas...</div>;

    return (
        <div className="task-list">
            <h2>Mis Tareas</h2>
            <div className="tasks-container">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task.id} className="task-card">
                            <h3>{task.title}</h3>
                            <p>Creada: {new Date(task.created_at).toLocaleDateString()}</p>
                            <p>Descripción: {task.description || 'Sin descripción'}</p>
                            <p>Estado: {task.is_completed ? 'Completada' : 'Pendiente'}</p>
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
                    disabled={tasks.length < limit}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default TaskList; 