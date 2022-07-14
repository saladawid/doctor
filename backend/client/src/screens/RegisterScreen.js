import React, {useState} from 'react';
import {Alert, Button, Card, Container, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export const RegisterScreen = () => {
    const [form, setForm] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
    });
    const [resultInfo, setResultInfo] = useState(null);
    const [error, setError] = useState(false);

    const saveUser = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:3001/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...form,
            }),
        });
        const data = await res.json();

        if (!res.ok) {
            setError(data.message);
        } else {
            setResultInfo(`User: ${data.email} has been registered`);
        }
    };

    if (resultInfo) {
        return (
            <Container className="d-flex align-items-center justify-content-center m-5">
                <Card className="d-flex align-items-center justify-content-center">
                    <Card.Title className="m-3">{resultInfo}</Card.Title>
                    <Card.Body>
                        <Link to="/login">
                            <Button variant="dark" className="mb-3">Log in</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container>
            <h1 className="text-center p-2 mt-4 mb-4">User Registration</h1>
            <Link to="/">
                <Button variant="dark" className="mb-3">Back to main page</Button>
            </Link>
            <Form onSubmit={saveUser}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={form.name}
                        onChange={e => setForm(
                            form => ({
                                ...form,
                                name: e.target.value,
                            }))}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="surname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                        type="text"
                        value={form.surname}
                        onChange={e => setForm(form => ({
                            ...form,
                            surname: e.target.value,
                        }))}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={form.email}
                        onChange={e => setForm(form => ({
                            ...form,
                            email: e.target.value,
                        }))}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                                  autoComplete="on"
                                  value={form.password}
                                  onChange={e => setForm(form => ({
                                      ...form,
                                      password: e.target.value,
                                  }))}/>
                </Form.Group>
                <Button type="submit" variant="dark">Save user</Button>
            </Form>
            <div className="text-center mt-3">
                {error && <Alert variant="danger">
                    {error}
                </Alert>}
            </div>
        </Container>
    );
};

