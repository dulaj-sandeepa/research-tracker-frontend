import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Card, Badge, Alert } from 'react-bootstrap';
import api from './api';

interface Project {
    id: string;
    name: string;
    description: string;
    status: string;
}

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState('');
    const userRole = localStorage.getItem('role') || 'USER';

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
// Calls your GET /api/projects endpoint
            const response = await api.get('/projects');
            setProjects(response.data);
        } catch (err: any) {
            setError('Failed to fetch research projects from backend.');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
// Calls your DELETE /api/projects/{id} endpoint
                await api.delete(`/projects/${id}`);
                fetchProjects(); // Refresh list
            } catch (err: any) {
                setError(err.response?.status === 403
                    ? 'Access Denied: Only Admins can delete projects!'
                    : 'Failed to delete project.'
                );
            }
        }
    };

    return (
        <Container className="mt-5">
            <Card className="shadow p-4">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>Research Projects</h2>
                        <Badge bg="info" className="p-2">Role: {userRole}</Badge>
                    </div>

                    {error && <Alert variant="danger">{error}</Alert>}

                    {projects.length === 0 ? (
                        <p className="text-muted">No active research projects found.</p>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Description</th>
                                <th>Status</th>
                                {userRole === 'ADMIN' && <th>Actions</th>}
                            </tr>
                            </thead>
                            <tbody>
                            {projects.map((project) => (
                                <tr key={project.id}>
                                    <td>{project.title}</td>
                                    <td>{project.summary}</td>
                                    <td>
                                        <Badge bg={project.status === 'COMPLETED' ? 'success' : 'warning'}>
                                            {project.status}
                                        </Badge>
                                    </td>
                                    {userRole === 'ADMIN' && (
                                        <td>
                                            <Button variant="danger" size="sm" onClick={() => handleDelete(project.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Projects;

