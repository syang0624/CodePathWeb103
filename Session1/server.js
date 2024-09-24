const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/products", (req, res) => {
    res.send("here are the products");
});

app.get("/products/:id", (req, res) => {
    res.send(`Product ID: ${req.params.id}`);
});

app.get("*", (req, res) => {
    res.status(404).send("404 Not Found");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
