import React, { useEffect, useState} from 'react';
import {Alert, Button, Container, Form} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {localUrl} from '../utils/local-url';

export const UserProfileScreen = () => {
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
    });
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [resultInfo, setResultInfo] = useState(null);
    const [error, setError] = useState(false);
    const [editData, setEditData] = useState(true);
    const navigate = useNavigate();
    const LoggedUser = JSON.parse(localStorage.getItem("user"));

    const getUserProfile = async () => {
        try {
            const res = await fetch(`${localUrl}/api/users/profile`, {
                headers: {
                    Authorization: 'Bearer ' + LoggedUser.token,
                },
            });

            const data = await res.json();

            setUser(data);

        } catch (e) {

        }
    };

    useEffect(() => {
        if (!LoggedUser) {
            navigate('/login');
        }
        getUserProfile();

    }, []);


    const saveUserProfile = async (e) => {

        e.preventDefault();

        const res = await fetch(`${localUrl}/api/users/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + LoggedUser.token,

            },
            body: JSON.stringify({
                ...user,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message);
        } else {
            setUser(data);
            setError(false)
            setResultInfo('The user profile has been updated');
            setEditData(true);
            setDisabledBtn(true)
            getUserProfile();
        }
    };

    const editUserProfile = async (e) => {
        e.preventDefault();
        setResultInfo(null);
        if (editData) {
            setEditData(false);

            setDisabledBtn(false)
        } else {
            setEditData(true);
            setError(false)
            setDisabledBtn(true)
            getUserProfile();
        }
    };

    return (
        <Container>
            <h1 className="text-center p-2 mt-4 mb-4">User profile</h1>
            <Link to="/">
                <Button variant="dark" className="mb-3">Back to main page</Button>
            </Link>
            <div className="text-center mt-3">
                {error && <Alert variant="danger">
                    {error}
                </Alert>}
                {resultInfo && <Alert variant="primary">
                    {resultInfo}
                </Alert>}
            </div>
            <Form onSubmit={saveUserProfile}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        readOnly={editData}
                        value={user.name ?? ''}
                        onChange={e => setUser(user => ({
                                ...user,
                                name: e.target.value,
                            }))}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="surname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                        type="text"
                        readOnly={editData}
                        value={user.surname ?? ''}
                        onChange={e => setUser(user => ({
                            ...user,
                            surname: e.target.value,
                        }))}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"
                                  readOnly={editData}
                                  value={user.email ?? ''}
                                  onChange={e => setUser(user => ({
                                      ...user,
                                      email: e.target.value,
                                  }))}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>New password</Form.Label>
                    <Form.Control type="password"
                                  autoComplete="on"
                                  readOnly={editData}
                                  value={user.password ?? ''}
                                  onChange={e => setUser(user => ({
                                      ...user,
                                      password: e.target.value,
                                  }))}/>
                </Form.Group>
                <Button type="submit" variant="dark" className="me-3" disabled={disabledBtn}>Save</Button>
                <Button type="submit" variant="dark"
                        onClick={editUserProfile}>{editData ? 'Edit Profile' : 'Cancel'}</Button>
            </Form>
        </Container>
    );
};

