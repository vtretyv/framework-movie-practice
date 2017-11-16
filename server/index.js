const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const movie = require('../lib/movieAPI.js');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.listen(3000, function () { console.log('MovieList app listening on port 3000!') });


// let movies =[
//         {title: 'Mean Girls', watched:false, description:'4 Mean girls are Mean'},
//         {title: 'Hackers', watched:false, description:'Hackers gonna steal your info'},
//         {title: 'The Grey', watched:false, description:'Something about geese'},
//         {title: 'Sunshine', watched:false, description:'Ain\'t the sun warm'},
//         {title: 'Ex Machina', watched:false, description:'AI uprising NOW'},
//       ];

app.get('/movies', (req,res)=>{
    // console.log('In the get, here are the movies', movies)
    res.status(200);
    movie.getByNowPlaying().then((movies)=>{
        console.log('MOVIES',movies);
        console.log('TYPEOF MOVIES', typeof movies);
        movies = JSON.parse(movies);
        console.log('MOVIES.RESULTS',movies.results);
        res.json(movies.results);
    })

})

app.post('/movie', (req,res)=>{
    console.log('In the post, here is the req.body', req.body);
    let movie = req.body.movie;
    movies.push(movie);
    res.end();
})




