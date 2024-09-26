import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();  // Initialize navigate

    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const result = await fetch(`http://localhost:3001/add-product`, {
            method: 'POST',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        const result1 = await result.json();
        if (result1) {
            alert("Your Product is Added");
            navigate("/products");  // Redirect to the product list after adding the product
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="form-container text-center col-md-6 col-sm-8 col-10 p-4 border rounded shadow-sm">
                <h2 className="text-center mb-4">Add Product</h2>

                <div className="mb-3">
                    <input 
                        type="text" 
                        placeholder="Enter product name" 
                        className="form-control" 
                        value={name} 
                        onChange={(e) => { setName(e.target.value); setError(false); }} 
                    />
                    {error && !name && (
                        <span className="text-danger">Enter a valid name</span>
                    )}
                </div>

                <div className="mb-3">
                    <input 
                        type="text" 
                        placeholder="Enter price" 
                        className="form-control" 
                        value={price} 
                        onChange={(e) => { setPrice(e.target.value); setError(false); }} 
                    />
                    {error && !price && (
                        <span className="text-danger">Enter a valid price</span>
                    )}
                </div>

                <div className="mb-3">
                    <input 
                        type="text" 
                        placeholder="Enter category" 
                        className="form-control" 
                        value={category} 
                        onChange={(e) => { setCategory(e.target.value); setError(false); }} 
                    />
                    {error && !category && (
                        <span className="text-danger">Enter a valid category</span>
                    )}
                </div>

                <div className="mb-3">
                    <input 
                        type="text" 
                        placeholder="Enter company name" 
                        className="form-control" 
                        value={company} 
                        onChange={(e) => { setCompany(e.target.value); setError(false); }} 
                    />
                    {error && !company && (
                        <span className="text-danger">Enter a valid company name</span>
                    )}
                </div>

                <Button 
                    onClick={addProduct} 
                    className="btn btn-primary w-100">
                    Add Product
                </Button>
            </div>
        </div>
    );
};

export default AddProduct;