/*
1. npm init -y
2. npm install express nodemon
3. node server.js */

import express from 'express';

const app = express();
const PORT = 3000;

// Required for POST and PUT
app.use(express.json());

const recipes = [ 
    { id: 1, name: "Classic Pancakes", cuisine: "American", prepTime: "15 mins" },
    { id: 2, name: "Spaghetti Carbonara", cuisine: "Italian", prepTime: "20 mins" },
    { id: 3, name: "Guacamole", cuisine: "Mexican", prepTime: "10 mins" },
    { id: 4, name: "Chicken Tikka Masala", cuisine: "Indian", prepTime: "30 mins" },
    { id: 5, name: "Sushi Rolls", cuisine: "Japanese", prepTime: "25 mins" }
];

// GET - Return all recipes
app.get('/recipes', (req, res) => {
    res.json(recipes);
});

// GET - Return a specific recipe
app.get('/recipes/:id', (req, res) => {
    const recipe = recipes.find(r => r.id === parseInt(req.params.id));
    if (!recipe) return res.status(404).send({ message: "Recipe not found" });
    res.json(recipe);
});