import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/");
        }
    }, [navigate]);

    const validateForm = () => {
        let isValid = true;

        // Reset errors
        setEmailError('');
        setPasswordError('');

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('Email is required.');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        }

        // Validate password
        if (!password) {
            setPasswordError('Password is required.');
            isValid = false;
        } 

        return isValid;
    };

    const handleLogin = async () => {
        if (!validateForm()) {
            return;
        }

        console.log(email, password);
        let result = await fetch(`http://localhost:3001/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/");
        } else {
            alert("Please, enter correct details");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="col-md-4 col-sm-8 col-10 p-4 border rounded shadow-sm">
                <h1 className="text-center mb-4">Login</h1>
                <div className="form-group mb-3">
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter your email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                    />
                    {emailError && <small className="text-danger">{emailError}</small>}
                </div>
                <div className="form-group mb-3">
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter your password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                    />
                    {passwordError && <small className="text-danger">{passwordError}</small>}
                </div>
                <div className="d-flex justify-content-center">
                    <button onClick={handleLogin} type="button" className="btn btn-primary wtf">Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
