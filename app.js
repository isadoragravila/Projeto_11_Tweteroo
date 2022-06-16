import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const usuarios = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    usuarios.push(req.body);
    res.send("OK");
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
    tweets.push(req.body);
    res.send("OK");
});

app.listen(5000);
