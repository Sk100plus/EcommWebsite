import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const Profile = () => {
    // Initialize states to store user data from localStorage
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");

    // Load data from localStorage on component mount
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            const user = JSON.parse(auth);
            setName(user.name);
            setEmail(user.email);
            setPassword(localStorage.getItem('password'));
        setMobile(localStorage.getItem('mobile'));
        }
        
    }, []);

    return (
        <Container className='mt-5'>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <div className="p-4 border rounded shadow">
                        <h2 className="text-center">Profile Information</h2>
                        <Form>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email-Id</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formMobile">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control
                                    type="mobile"
                                    value={mobile}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formpassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={password}
                                />
                            </Form.Group>

                        </Form>

                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
