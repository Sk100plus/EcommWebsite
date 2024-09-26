import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:3001/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setCategory(result.category);
        setPrice(result.price);
        setCompany(result.company);
    };

    const updateProduct = async () => {
        let result = await fetch(`http://localhost:3001/product/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        navigate('/');
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="form-container text-center col-md-6 col-sm-8 col-10 p-4 border rounded shadow-sm">
                <h2 className="text-center mb-4">Update Product</h2>
                <div className="form-group mb-3">
                    <input 
                        type="text" 
                        placeholder="Enter product name" 
                        className="form-control" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div className="form-group mb-3">
                    <input 
                        type="text" 
                        placeholder="Enter price" 
                        className="form-control" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                    />
                </div>
                <div className="form-group mb-3">
                    <input 
                        type="text" 
                        placeholder="Enter category" 
                        className="form-control" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                    />
                </div>
                <div className="form-group mb-3">
                    <input 
                        type="text" 
                        placeholder="Enter company name" 
                        className="form-control" 
                        value={company} 
                        onChange={(e) => setCompany(e.target.value)} 
                    />
                </div>
                <div className="btnupdateLogin">
                    <button 
                        onClick={updateProduct} 
                        className="btn btn-primary">
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;