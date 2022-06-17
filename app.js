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

app.get('/tweets', (req, res) => {
    const page = req.query.page;
    let tweetsPublicados = [];
	
    if (page >= 1) {
        for (let i = tweets.length - 1; i >= 0; i--) {
			const usuario = usuarios.find(item => item.username === tweets[i].username);
            tweetsPublicados.push({ ...tweets[i], avatar: usuario.avatar });
        }
        tweetsPublicados = tweetsPublicados.slice(page*10 - 10, page*10);
        res.send(tweetsPublicados);
    } else {
        res.status(400).send('Informe uma página válida!');
    }
    
});

app.post('/tweets', (req, res) => {
    if (req.headers.user === "" || req.body.tweet === "") {
        res.status(400).send('Todos os campos são obrigatórios!');
    } else {
        const tweet = { username: req.headers.user, ...req.body };
        tweets.push(tweet);
        res.status(201).send('OK');
    }
});

app.get('/tweets/:username', (req, res) => {
    const username = req.params.username;
    const userTweets = tweets.filter(tweet => tweet.username === username);
    let tweetsPublicados = [];
    if (userTweets.length <= 10) {
        for (let i = userTweets.length - 1; i >= 0; i--) {
			const usuario = usuarios.find(item => item.username === userTweets[i].username);
            tweetsPublicados.push({ ...userTweets[i], avatar: usuario.avatar });
        }
    } else {
        for (let i = userTweets.length - 1; i >= userTweets.length - 10; i--) {
            const usuario = usuarios.find(item => item.username === userTweets[i].username);
            tweetsPublicados.push({ ...userTweets[i], avatar: usuario.avatar });
        }
    }
    res.send(tweetsPublicados);
});

app.listen(5000);
