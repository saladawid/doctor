import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Card, Container, Form} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';

export const PatientAddScreen = () => {
    const [patientForm, setPatientForm] = useState({
        name: '',
        surname: '',
        diagnosis: '',
        dateOfAdmission: '',
        dateOfDischarge: '',
    });
    const [resultInfo, setResultInfo] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const LoggedUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!LoggedUser) {
            navigate('/login');
        }
    }, []);


    const savePatient = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:3001/api/patients', {
            method: 'POST', headers: {
                'Content-Type': 'application/json', Authorization: 'Bearer ' + LoggedUser.token,
            }, body: JSON.stringify({
                ...patientForm,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message);
        } else {
            setResultInfo(`${data.name} ${data.surname} has been added to patients database.`);
            setTimeout(() => {
                navigate("/patients");
            }, 1200);
        }
    };

    if (resultInfo) {
        return (<div className="d-flex align-items-center justify-content-center m-5">
            <Card className="d-flex align-items-center justify-content-center">
                <Card.Title className="m-3">{resultInfo}</Card.Title>
                <Card.Body>
                    <Link to="/patients">
                        <Button variant="dark" className="mb-3">Database of Patients</Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>);
    }

    return (
        <Container>
            <h1 className="text-center p-2 mt-4 mb-4">Add new patient</h1>
            <Link to="/patients">
                <Button variant="dark" className="mb-3">Back to database</Button>
            </Link>
            <div className="text-center">
                {error && <Alert variant="danger">
                    {error}
                </Alert>}
            </div>
            <Form onSubmit={savePatient}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={patientForm.name}
                        onChange={e => setPatientForm(patientForm => ({
                            ...patientForm, name: e.target.value,
                        }))}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="surname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                        type="text"
                        value={patientForm.surname}
                        onChange={e => setPatientForm(patientForm => ({
                            ...patientForm, surname: e.target.value,
                        }))}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="diagnosis">
                    <Form.Label>Diagnosis</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={patientForm.diagnosis}
                        onChange={e => setPatientForm(patientForm => ({
                            ...patientForm, diagnosis: e.target.value,
                        }))}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="dateOfAdmission">
                    <Form.Label>Date of admission</Form.Label>
                    <Form.Control type="date"
                                  value={patientForm.dateOfAdmission}
                                  onChange={e => setPatientForm(patientForm => ({
                                      ...patientForm, dateOfAdmission: e.target.value,
                                  }))}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="dateOfDischarge">
                    <Form.Label>Date of discharge</Form.Label>
                    <Form.Control type="date"
                                  value={patientForm.dateOfDischarge}
                                  onChange={e => setPatientForm(patientForm => ({
                                      ...patientForm, dateOfDischarge: e.target.value,
                                  }))}/>
                </Form.Group>
                <Button type="submit" variant="dark" className="mb-3">Save patient</Button>
            </Form>
        </Container>);
};

