const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require('./db/User');
const path =require("path");
const Product = require("./db/Product")
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';
const app = express();
require("dotenv").config
const port=process.env.PORT;
app.use(express.json());
app.use(cors());


// Register Route
app.post("/register", async (req, resp) => {
    try {
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        
        Jwt.sign({result}, jwtKey, {expiresIn: "2h"}, (err, token) => {
            if (err) {
                return resp.status(500).send("Something went wrong");
            }
            resp.send({result, auth: token});
        });
    } catch (error) {
        resp.status(500).send({result: "Server Error"});
    }
});

// Login Route
app.post("/login", async (req, resp) => {
    try {
        if (req.body.password && req.body.email) {
            let user = await User.findOne(req.body).select("-password");
            if (user) {
                Jwt.sign({user}, jwtKey, {expiresIn: "2h"}, (err, token) => {
                    if (err) {
                        return resp.status(500).send("Something went wrong");
                    }
                    resp.send({user, auth: token});
                });
            } else {
                resp.status(404).send({result: "No User found"});
            }
        } else {
            resp.status(400).send({result: "Invalid credentials"});
        }
    } catch (error) {
        resp.status(500).send({result: "Server Error"});
    }
});

// Add Product Route
app.post("/add-product", verifyToken, async (req, resp) => {
    try {
        let product = new Product(req.body);
        let result = await product.save();
        resp.send(result);
    } catch (error) {
        resp.status(500).send({result: "Failed to add product"});
    }
});

// Get All Products Route
app.get("/products", verifyToken, async (req, resp) => {
    try {
        const products = await Product.find();
        if (products.length > 0) {
            resp.send(products);
        } else {
            resp.send({result: "No Product found"});
        }
    } catch (error) {
        resp.status(500).send({result: "Server Error"});
    }
});

// Delete Product Route
app.delete("/product/:id", verifyToken, async (req, resp) => {
    try {
        let result = await Product.deleteOne({ _id: req.params.id });
        resp.send(result);
    } catch (error) {
        resp.status(500).send({result: "Failed to delete product"});
    }
});

// Get Product by ID Route
app.get("/product/:id", verifyToken, async (req, resp) => {
    try {
        let result = await Product.findOne({ _id: req.params.id });
        if (result) {
            resp.send(result);
        } else {
            resp.status(404).send({result: "No Record Found."});
        }
    } catch (error) {
        resp.status(500).send({result: "Server Error"});
    }
});

// Update Product Route
app.put("/product/:id", verifyToken, async (req, resp) => {
    try {
        let result = await Product.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        resp.send(result);
    } catch (error) {
        resp.status(500).send({result: "Failed to update product"});
    }
});

// Search Products Route
app.get("/search/:key", verifyToken, async (req, resp) => {
    try {
        let result = await Product.find({
            "$or": [
                { name: { $regex: req.params.key, $options: 'i' } },
                { company: { $regex: req.params.key, $options: 'i' } },
                { category: { $regex: req.params.key, $options: 'i' } }
            ]
        });
        resp.send(result);
    } catch (error) {
        resp.status(500).send({result: "Search failed"});
    }
});

// Middleware to Verify JWT Token
function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                return res.status(401).send({result: "Please provide valid token"});
            } else {
                next();
            }
        });
    } else {
        res.status(403).send({result: "Please add token with header"});
    }
}

// app.get("/",(req,res)=>{
//     app.use(express.static(path.resolve(__dirname,"frontend","build")));
//     res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
// });
app.listen(port,()=>{
    console.log("Server Started");
});
