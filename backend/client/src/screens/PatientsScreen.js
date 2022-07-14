import React, {useEffect, useState, useContext} from 'react';
import {Button, Card, Container, Modal, Spinner, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {localUrl} from '../utils/local-url';
import {UserContext} from '../App';

export const PatientsScreen = () => {
    const context = useContext(UserContext);
    const {userLog, setUserLog} = context;
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {

        getPatients();

    }, []);

    const getPatients = async () => {
        try {
            setLoading(true);

            const LoggedUser = JSON.parse(localStorage.getItem("user"));

            if (LoggedUser) {
                setUserLog(true);
            }

            const res = await fetch(`${localUrl}/api/patients`, {
                headers: {
                    Authorization: 'Bearer ' + LoggedUser.token,
                },
            });

            const data = await res.json();

            setPatients(data);

            setLoading(false);

        } catch (e) {

        }
    };

    const deletePatient = async (id) => {

        const user = JSON.parse(localStorage.getItem("user"));

        await fetch(`${localUrl}/api/patients/${id}`, {
            method: 'DELETE', headers: {
                Authorization: 'Bearer ' + user.token,
            },
        });
        setShowModal(false);
        getPatients();

    };


    if (!userLog) {
        return (<Container className="d-flex align-items-center justify-content-center">
            <Card className="d-flex align-items-center justify-content-center">
                <Card.Title className="m-3"><h1>ACCESS FOR LOGGED IN USERS</h1></Card.Title>
                <Card.Body>
                    <Link to="/login">
                        <Button variant="dark" className="mb-3">Log in</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Container>);
    }

    return (
        <Container>
            <h1 className="text-center p-2 mt-4 mb-4">Database of patients</h1>
            <Link to="/add-patient">
                <Button variant="dark" className="mb-3">Add new patient</Button>
            </Link>
            {loading && <Container className="d-flex align-items-center justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>}

            <Table striped hover size="sm">
                <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Doctor ID</th>
                </tr>
                </thead>
                <tbody>
                {patients.map((patient, index) => (
                    <tr key={patient._id}>
                        <td>{index + 1}</td>
                        <td>{patient.name}</td>
                        <td>{patient.surname}</td>
                        <td>{patient.user}</td>
                        <td>
                            <Link to={`${patient._id}`}>
                                <Button variant="outline-secondary" size="sm" className="btn">View</Button>
                            </Link>
                        </td>
                        <td>
                            <Button onClick={handleShow} variant="outline-danger"
                                    size="sm">Delete</Button>
                        </td>
                        <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Warring</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to remove the patient?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => deletePatient(patient._id)}>
                                    Delete patient
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>);
};

