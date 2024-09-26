import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch(`http://localhost:3001/products`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        setProducts(result);
    };

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:3001/product/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();

        if (result) {
            getProducts();
        }
    };

    const searchHandle = async (e) => {
        let key = e.target.value;
        if (!key) {
            getProducts();
        } else {
            let result = await fetch(`http://localhost:3001/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        }
    };

    return (
        <Container className="product-list mt-4">
            <h3 className="text-center">Product List</h3>
            <Form.Control
                type="text"
                placeholder="Search Product"
                className="mb-4 search-product-box"
                onChange={searchHandle}
            />
            <Row className="fw-bold text-center">
                <Col>S. No</Col>
                <Col>Name</Col>
                <Col>Price</Col>
                <Col>Category</Col>
                <Col>Company</Col>
                <Col>Operation</Col>
            </Row>

            {
                products.length > 0 ? (
                    products.map((item, index) =>
                        <Row key={item._id} className="text-center my-2 py-2 border rounded">
                            <Col>{index + 1}</Col>
                            <Col>{item.name}</Col>
                            <Col>Rs {item.price}</Col>
                            <Col>{item.category}</Col>
                            <Col>{item.company}</Col>
                            <Col>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => deleteProduct(item._id)}
                                >
                                    Delete
                                </Button>
                                <Link to={"/update/" + item._id}>
                                    <Button variant="primary" size="sm">Update</Button>
                                </Link>
                            </Col>
                        </Row>
                    )
                ) : (
                    <h4 className="text-center mt-4">No Products Found</h4>
                )
            }
        </Container>
    );
};

export default ProductList;
