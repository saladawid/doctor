import React, {useContext, useEffect} from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {UserContext} from '../App';


export const Header = () => {
    const context = useContext(UserContext);
    const {userLog, setUserLog} = context;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            setUserLog(true);
        }
    }, [setUserLog]);

    const logOut = () => {
        localStorage.removeItem("user");
        setUserLog(null);
    };

    return (

        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect sticky="top">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Doctor APP</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/patients">
                            <Nav.Link>Patients</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        {userLog ? (
                            <>
                                <LinkContainer to="/profile">
                                    <Nav.Link>Profile</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/login" onClick={logOut}>
                                    <Nav.Link>Log out</Nav.Link>
                                </LinkContainer>
                            </>
                            ) :
                            (
                                <>
                                    <LinkContainer to="/register">
                                        <Nav.Link>Registration</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/login">
                                        <Nav.Link>Log in</Nav.Link>
                                    </LinkContainer>
                                </>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
};