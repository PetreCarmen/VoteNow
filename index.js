const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

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
   res.redirect(303, '/createPoll');
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});