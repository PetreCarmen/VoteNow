const express = require('express');
const app = express();
const path = require('path');
const uuid = require('uuid');
const port = 3000;

const polls = {}; // {id: {question: string, answers: string[], votes: number[] }}

app.set('view engine', 'pug');

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.render('index', {title: 'Hey', message: 'Hello there!'});
});

app.get('/createPoll', function (req, res) {
    res.sendFile(path.join(__dirname, './views/createPoll.html'));
});

app.post('/createPoll', function (req, res) {
    console.log("request body", req.body);
    const pollId = uuid.v4();
    const answers = req.body.answers;// ["da", "nu"]
    const votes = [];
    for (let i = 0; i < answers.length; i++) {
        votes.push(0);
    }

    polls[pollId] = {
        question: req.body.question,
        answers: answers,
        votes: votes,
        pollId: pollId,
    };
    res.redirect(303, `/poll/${pollId}`);
});

app.get('/poll/:pollId', (req, res) => {
    const pollId = req.params["pollId"];
    if (!polls[pollId]) {
        res.status(404).send("Not Found!");
        return;
    }
    res.render('poll', polls[pollId]);
});

app.post('/poll/:pollId/vote', function (req, res) {
    // sa primim pollId
    // primim voturile si le stocam si numaram
    const pollId = req.params["pollId"];
    const votesAsStrings = req.body.answer || []; // ['0','1']

    votesAsStrings.map((el) => parseInt(el))
        .forEach((voteIndex) => {
            polls[pollId].votes[voteIndex] = polls[pollId].votes[voteIndex] + 1;
        });


    res.redirect(303, `/poll/${pollId}/results`);
});

app.get('/poll/:pollId/results', function (req, res){
    var pollId = req.params["pollId"];
    res.render("results", polls[pollId])
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
