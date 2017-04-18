const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//setup log file
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    if (error) {
      console.log('Unable to append to file server.log.');
    }
  });
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
  //return 'test';
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.get('/', (req,res) => {
  res.render('home.hbs',{
    welcomeMessage: 'Welcome to the homepage of my first nodejs application',
    pageTitle: 'Home page'
  });
});

app.get('/about', (req, res) => {
  //res.send('About the page');
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    message: 'This is the projects page of our application',
    pageTitle: 'Projects page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Hey! You have the required error message.'
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
