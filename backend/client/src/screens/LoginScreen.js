import React, {useContext, useState} from 'react';
import {Alert, Button, Container, Form} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from '../App';

export const LoginScreen = () => {
    const context = useContext(UserContext);
    const {setUserLog} = context;
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:3001/api/users/login', {
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
            localStorage.setItem('user', JSON.stringify(data));
            setUserLog(true);
            navigate('/');
        }
    };

    return (
        <Container>
            <h1 className="text-center p-2 mt-4 mb-4">Log in</h1>
            <Link to="/">
                <Button variant="dark" className="mb-3">Back to main page</Button>
            </Link>
            <Form onSubmit={loginUser}>
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
                <Button type="submit" variant="dark">Log in</Button>
            </Form>
            <div className="text-center mt-3">
                {error && <Alert variant="danger">
                    {error}
                </Alert>}
            </div>
        </Container>
    );
};

