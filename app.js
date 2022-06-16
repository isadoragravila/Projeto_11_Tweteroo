import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const usuarios = [];

app.post('/sign-up', (req, res) => {
    usuarios.push(req.body);
    res.send("OK");
});
  
app.get('/sign-up', (req, res) => {
    res.send(usuarios);
})

app.listen(5000);
