import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const NavBar = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }

    return (
        <Navbar  variant="dark" expand="lg" style={{ backgroundColor: 'rgb(0, 162, 255)' }}>
            <Container className='mx-2'>
                <Navbar.Brand href="/">
                    <img 
                        src="https://yt3.ggpht.com/ytc/AKedOLR09bCpy_XTq2scU91URc0pWG0EqS_Yc_Zg-r9pBQ=s900-c-k-c0x00ffffff-no-rj" 
                        alt="Logo" 
                        style={{ width: '50px', height: '50px', borderRadius:'50%' ,marginLeft:'0px'}} 
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {auth ? (
                            <>
                                <Nav.Link as={Link} to="/" style={{ color: '#000' }}>Products</Nav.Link>
                                <Nav.Link as={Link} to="/add" style={{ color: '#000' }}>Add Product</Nav.Link>
                                <Nav.Link as={Link} to="/update" style={{ color: '#000' }}>Update Product</Nav.Link>
                                <Nav.Link as={Link} to="/profile" style={{ color: '#000' }}>Profile</Nav.Link>
                                <NavDropdown title={JSON.parse(auth).name} id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/" onClick={logout}  style={{ color: '#000' }}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <Nav className="ms-auto">
                                <Nav.Link as={Link} to="/signup" style={{ color: '#000' }}>Signup</Nav.Link>
                                <Nav.Link as={Link} to="/login" style={{ color: '#000' }}>Login</Nav.Link>
                            </Nav>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
