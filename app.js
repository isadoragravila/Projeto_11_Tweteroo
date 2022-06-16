import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const usuarios = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    if (req.body.username === "" || req.body.avatar === "") {
        res.status(400).send('Todos os campos são obrigatórios!');
    } else {
        usuarios.push(req.body);
        res.status(201).send('OK');
    }
});
  
app.get('/sign-up', (req, res) => {
    res.send(usuarios);
});

app.get('/tweets', (req, res) => {
    let tweetsPublicados = [];
    if (tweets.length <= 10) {
        for (let i = tweets.length - 1; i >= 0; i--) {
            tweetsPublicados.push(tweets[i]);
        }
    } else {
        for (let i = tweets.length - 1; i >= tweets.length - 10; i--) {
            tweetsPublicados.push(tweets[i]);
        }
    }
    res.send(tweetsPublicados);
});

app.post('/tweets', (req, res) => {
    if (req.body.username === "" || req.body.tweet === "") {
        res.status(400).send('Todos os campos são obrigatórios!');
    } else {
        const usuario = usuarios.find(item => item.username === req.body.username);
        const tweet = {...req.body, avatar: usuario.avatar};
        tweets.push(tweet);
        res.status(201).send('OK');
    }
});

app.listen(5000);
