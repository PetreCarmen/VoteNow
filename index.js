const express = require('express');
const app = express();
const path = require('path');
const uuid = require('uuid');
const port = 3000;

const polls = {}

app.set('view engine', 'pug');

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.get('/createPoll',function (req, res){
    res.sendFile(path.join(__dirname,'./views/createPoll.html'));
});

app.post('/createPoll', function (req,res){
   console.log("request body", req.body);
   const pollId = uuid.v4();
   polls[pollId] = {question: req.body.question, answers: req.body.answers};
   res.redirect(303, `/poll/${pollId}`);
});

app.get('/poll/:pollId', (req, res) => {
    console.log("hello pui");
    const pollId = req.params["pollId"];
    if (!polls[pollId]) {
        console.log("not found");
        res.status(404).send("Not Found!");
        return;
    }
    res.render('poll', polls[pollId]);
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});