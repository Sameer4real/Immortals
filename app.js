const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


const app = express();

//connect to mongodb & listen for requests
const dbURI = "mongodb+srv://sameer4real:test123@cluster0.kkmup.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

// middleware & static files

app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});


//blog routes
app.use('/blogs', blogRoutes);


app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});
app.get('/blogs', (req, res) => {
    res.render('blogs', { title: 'Blogs' });
});
app.use((req, res) => {
    res.status(400).render('404', { title: '404' });
});