const config = require('./api_key.js');
const request = require('request');
const Promise = require('bluebird');

let getByNowPlaying = () =>{
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${config.MOVIE_API}&language=en-US&page=1`
    console.log(url);
    return new Promise((resolve,reject)=>{
        request(url,(err,response,body)=>{
            resolve(body);
        })
    })
}

module.exports.getByNowPlaying = getByNowPlaying;