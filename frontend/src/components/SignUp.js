import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");  // New state for confirm password
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState(""); // New state for mobile number
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/");
        }
    }, [navigate]);

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const collectData = async () => {
        if (!name || !email || !password || !confirmPassword || !mobile) {
            setError("All fields are required!");
            return;
        }

        if (!isEmailValid(email)) {
            setError("Please enter a valid email address!");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setError(""); // Clear the error if validation passes

        console.log(name, email, password, mobile);
        let result = await fetch(`http://localhost:3001/register`, {
    method: 'POST', // Changed to uppercase
    body: JSON.stringify({ name, email, password, mobile }), // Assuming these variables are defined
    headers: {
        'Content-Type': 'application/json'
    }
});
        result = await result.json();
        console.log(result);
        
        // Store user details in localStorage
        localStorage.setItem('user', JSON.stringify(result.result));
        localStorage.setItem('token', JSON.stringify(result.auth));
        
        // Store mobile number and password in localStorage
        localStorage.setItem('mobile', mobile);
        localStorage.setItem('password', password);
        
        navigate('/');
    }

    return (
        <Container className='register mt-5'>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <div className="p-4 border rounded shadow">
                        <h1 className="text-center">Register</h1>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter Email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formMobile">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Mobile Number" 
                                    value={mobile} 
                                    onChange={(e) => setMobile(e.target.value)} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Enter Password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                />
                            </Form.Group>

                            <div className="registerbut">
                                <Button variant="primary" onClick={collectData} className='registerButton'>
                                    Sign Up
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUp;
