import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Container, Form} from 'react-bootstrap';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {localUrl} from '../utils/local-url';


export const PatientScreen = () => {
    const [patientForm, setPatientForm] = useState({
        name: '',
        surname: '',
        diagnosis: '',
        dateOfAdmission: '',
        dateOfDischarge: '',
    });
    const [resultInfo, setResultInfo] = useState(null);
    const [error, setError] = useState(false);
    const [readOnly, setReadOnly] = useState(true);
    const [disabledBtn, setDisabledBtn] = useState(true)
    const {id} = useParams();
    const navigate = useNavigate();
    const LoggedUser = JSON.parse(localStorage.getItem("user"));

    const getPatientProfile = async () => {

        try {
            const res = await fetch(`${localUrl}/api/patients/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + LoggedUser.token,
                },
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
            } else {
                setPatientForm(data);
            }

        } catch (e) {

        }
    };

    useEffect(() => {
        if (!LoggedUser) {
            navigate('/login');
        }
        getPatientProfile();
    }, []);


    const savePatient = async (e) => {
        e.preventDefault();

        const res = await fetch(`${localUrl}/api/patients/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + LoggedUser.token,

            },
            body: JSON.stringify({
                ...patientForm,
            }),
        });

        const data = await res.json();
        if (!res.ok) {
            setError(data.message);
        } else {
            setPatientForm(data);
            setResultInfo('The patient profile has been updated');
            setReadOnly(true);
            setDisabledBtn(true);
            setError(false)
        }


    };

    const editDataPatient = async (e) => {
        e.preventDefault();
        setResultInfo(null);
        if (readOnly) {
            setReadOnly(false);
            setDisabledBtn(false)
            setError(false)

        } else {
            setReadOnly(true);
            setDisabledBtn(true)
            setError(false)
            getPatientProfile();
        }
    };

    return (
        <Container>
            <h1 className="text-center p-2 mt-4 mb-4">Patient data</h1>
            <div className="d-flex justify-content-between">
                <Link to="/patients">
                    <Button variant="dark" className="mb-3">Back to database</Button>
                </Link>
                <Link to="tests-results">
                    <Button variant="dark" className="mb-3 mx-auto">Tests Results</Button>
                </Link>
            </div>
            <div className="text-center mt-3">
                {error && <Alert variant="danger">
                    {error}
                </Alert>}
                {resultInfo && <Alert variant="primary">
                    {resultInfo}
                </Alert>}
            </div>
            <Form onSubmit={savePatient}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        readOnly={readOnly}
                        value={patientForm.name ?? ''}
                        onChange={e => setPatientForm(patientForm => ({
                            ...patientForm,
                            name: e.target.value,
                        }))}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="surname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                        type="text"
                        readOnly={readOnly}
                        value={patientForm.surname ?? ''}
                        onChange={e => setPatientForm(patientForm => ({
                            ...patientForm,
                            surname: e.target.value,
                        }))}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="diagnosis">
                    <Form.Label>Diagnosis</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        readOnly={readOnly}
                        value={patientForm.diagnosis ?? ''}
                        onChange={e => setPatientForm(patientForm => ({
                            ...patientForm,
                            diagnosis: e.target.value,
                        }))}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="dateOfAdmission">
                    <Form.Label>Date of admission</Form.Label>
                    <Form.Control type="date"
                                  readOnly={readOnly}
                                  value={patientForm.dateOfAdmission ?? ''}
                                  onChange={e => setPatientForm(patientForm => ({
                                      ...patientForm,
                                      dateOfAdmission: e.target.value,
                                  }))}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="dateOfDischarge">
                    <Form.Label>Date of discharge</Form.Label>
                    <Form.Control type="date"
                                  readOnly={readOnly}
                                  value={patientForm.dateOfDischarge ?? ''}
                                  onChange={e => setPatientForm(patientForm => ({
                                      ...patientForm,
                                      dateOfDischarge: e.target.value,
                                  }))}/>
                </Form.Group>
                <Button type="submit" variant="dark" className="mb-3 me-3" disabled={disabledBtn}>Save</Button>
                <Button type="submit" variant="dark" className="mb-3 me-3"
                        onClick={editDataPatient}>{readOnly ? 'Edit data' : 'Cancel'}</Button>
                <Link to="test">
                    <Button variant="dark" className="mb-3">Take the Glasgow test</Button>
                </Link>
            </Form>
        </Container>
    );
};

