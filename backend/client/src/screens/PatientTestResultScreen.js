import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Card, Container, Form, Spinner, Table} from 'react-bootstrap';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {localUrl} from '../utils/local-url';
import {UserContext} from '../App';

export const PatientTestResultScreen = () => {
    const context = useContext(UserContext);
    const {setUserLog} = context;
    const [testsResults, setTestsResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {id} = useParams();
    const LoggedUser = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    useEffect(() => {
        if (!LoggedUser) {
            navigate('/login');
        }
        getPatientTestResult();

    }, []);

    const getPatientTestResult = async () => {
        try {
            setLoading(true);

            if (LoggedUser) {
                setUserLog(true);
            }

            const res = await fetch(`${localUrl}/api/patients/${id}/test`, {
                headers: {
                    Authorization: 'Bearer ' + LoggedUser.token,
                },
            });

            const data = await res.json();

            setTestsResults(data);

            setLoading(false);

        } catch (e) {

        }
    };


    return (
        <>
            <Container>
            <h1 className="text-center p-2 mt-4 mb-4">Patient Tests Results</h1>
            <Link to={`/patients/${id}`}>
                <Button variant="dark" className="mb-3">Back to Patient Profile</Button>
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
                    <th>Test name</th>
                    <th>Eye</th>
                    <th>Verbal</th>
                    <th>Motor</th>
                    <th>Total score</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {testsResults.map((test, index) => (
                    <tr key={test._id}>
                        <td>{index + 1}</td>
                        <td>{test.name}</td>
                        <td>{test.eye}</td>
                        <td>{test.verbal}</td>
                        <td>{test.motor}</td>
                        <td>{test.score}</td>
                        <td>{test.date}</td>
                    </tr>))}
                </tbody>
            </Table>
            </Container>
        </>)

};