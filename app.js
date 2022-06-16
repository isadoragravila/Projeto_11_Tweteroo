import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const usuarios = [];

app.post('/sign-up', (req, res) => {
    usuarios.push(req.body);
    console.log(usuarios);
    res.send(usuarios);
});
  
app.get('/sign-up', (req, res) => {
    res.send(usuarios);
})

app.listen(5000);
