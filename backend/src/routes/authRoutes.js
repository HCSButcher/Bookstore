import express from 'express';

const Router = express.Router();

Router.post('/register', async (req,res) => {
    res.send('login');
})

Router.post('/login', async (req,res) => {
    res.send('login');
})

export default Router;