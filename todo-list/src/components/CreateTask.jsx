import { useState } from 'react';
import { createTask } from '../services/api';
import '../styles/CreateTask.css';

const CreateTask = ({ onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const userEmail = localStorage.getItem('userEmail');
            await createTask(userEmail, title, description);
            setTitle('');
            setDescription('');
            onTaskCreated();
        } catch (error) {
            console.error('Error al crear tarea:', error);
            alert('Error al crear la tarea');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="create-task">
            <h2>Crear Nueva Tarea</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título de la tarea"
                    required
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción de la tarea"
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creando...' : 'Crear Tarea'}
                </button>
            </form>
        </div>
    );
};

export default CreateTask; 