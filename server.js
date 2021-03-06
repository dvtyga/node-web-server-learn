const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// you dont need the line below anymore since Handlerbars is the view engine that will take care of it

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to my page!'
  });
  // res.send({
  //   name: 'Tien',
  //   likes: [
  //     'watching movies',
  //     'coding',
  //     'training',
  //     'eating'
  //   ]
  // })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
  // res.send('About Page');
});

app.get('/projects', (req, res) => {
  res.render('projects', {
    //
  });
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to find page. Something went wrong'
  })
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
// app.listen(3000);