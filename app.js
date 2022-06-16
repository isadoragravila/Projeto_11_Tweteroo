import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const usuarios = [
    {
        username: "bobesponja",
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
    },
    {
        username: "patrick",
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
    },
    {
        username: "molusco",
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
    }
];
const tweets = [
    {
		username: "bobesponja",
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
	  tweet: "eu amo o hub 1"
	},
    {
		username: "patrick",
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
	  tweet: "eu amo o hub 2"
	},
    {
		username: "molusco",
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
	  tweet: "eu amo o hub 3"
	},
    {
		username: "molusco",
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
	  tweet: "eu amo o hub 4"
	},
    {
		username: "molusco",
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
	  tweet: "eu amo o hub 5"
	}
];

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

app.get('/tweets/:username', (req, res) => {
    const username = req.params.username;
    const userTweets = tweets.filter(tweet => tweet.username === username);
    let tweetsPublicados = [];
    if (userTweets.length <= 10) {
        for (let i = userTweets.length - 1; i >= 0; i--) {
            tweetsPublicados.push(userTweets[i]);
        }
    } else {
        for (let i = userTweets.length - 1; i >= userTweets.length - 10; i--) {
            tweetsPublicados.push(userTweets[i]);
        }
    }
    res.send(tweetsPublicados);

});

app.listen(5000);
