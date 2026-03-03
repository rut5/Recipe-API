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

// POST - Add a new recipe
app.post('/recipes', (req, res) => {
    const newRecipe = {
        id: recipes.length + 1,
        name: req.body.name,
        cuisine: req.body.cuisine,
        prepTime: req.body.prepTime
    };
    recipes.push(newRecipe);
    res.status(201).send({ message: "Recipe added!", recipe: newRecipe });
});

// PUT - Update an existing recipe
app.put('/recipes/:id', (req, res) => {
    const recipe = recipes.find(r => r.id === parseInt(req.params.id));
    if (!recipe) return res.status(404).send({ message: "Recipe not found" });

    recipe.name = req.body.name || recipe.name;
    recipe.cuisine = req.body.cuisine || recipe.cuisine;
    recipe.prepTime = req.body.prepTime || recipe.prepTime;

    res.send({ message: "Recipe updated!", recipe });
});

// DELETE - Remove a recipe
app.delete('/recipes/:id', (req, res) => {
    const index = recipes.findIndex(r => r.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send({ message: "Recipe not found" });

    const deletedRecipe = recipes.splice(index, 1);
    res.send({ message: "Recipe deleted successfully", deletedRecipe });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});