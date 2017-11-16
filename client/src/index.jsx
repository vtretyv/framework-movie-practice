import React from 'react';
import ReactDOM  from 'react-dom';
import $ from 'jquery';
import AddMovie from './components/AddMovie.jsx';
import Movie from './components/Movie.jsx';
import MovieDetails from './components/MovieDetails.jsx';
import Search from './components/Search.jsx';


const mainDivStyle ={
  textAlign: 'center',
}
class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      filtMovies:[],
      watchedMovies:[]
    }
    this.searchMovie = this.searchMovie.bind(this);
    this.addMovie = this.addMovie.bind(this);
    this.watchUnwatchToggle = this.watchUnwatchToggle.bind(this);
  }
  componentDidMount(){
    let context= this;
    $.ajax({
      url:'/movies',
      method:'GET',
      success: function(data){
        console.log('GET SUCCESS',data);
        data.forEach((movie)=>{
          movie.watched = false; //Have to add watched to make data from api to work. Basic data message
        })
        context.setState({
          movies: data
        })
      },
      error: function(err) {
        console.log('GET FAILED', err);
      } 
    })
  }
  searchMovie(query) {
    let filtMovies = [];
    this.state.movies.forEach((movie)=>{
      if (movie.title.includes(query)) {
        filtMovies.push(movie);
      }
    });
    this.setState({
      filtMovies: filtMovies
    })
  }

  addMovie(newTitle) {
    //Client side rendering, level 1
    // let newMov = {title:newTitle,description:'Added by a lovely user',watched:false};
    // let tempMovies = this.state.movies;
    // tempMovies.push(newMov);
    // this.setState({
    //   movies: tempMovies
    // })
    
    //Server side rendering
    let newMov = {title:newTitle,overview:'Added by a lovely user',watched:false};
    
    $.ajax({
      url:'/movie',
      method:'POST',
      contentType: 'application/json',
      data: JSON.stringify({'movie':newMov}),
      success : function() {
        console.log('POST SUCCESS');
      },
      error: function() {
        console.log('POST FAILED');
      }
    }).then(()=>{
      $.ajax({
        url:'/movies',
        method:'GET',
        success: (data)=>{
          console.log('GET SUCCESS',data);
          this.setState({
            movies: data
          })
        },
        error: function(err) {
          console.log('GET FAILED', err);
        } 
      })
    })

  }

  toggleWatched(){
    document.getElementById('watched').style.display = 'block';
    document.getElementById('unwatched').style.display = 'none';
  }
  toggleUnwatched(){
    document.getElementById('watched').style.display = 'none';
    document.getElementById('unwatched').style.display = 'block';
  }
  watchUnwatchToggle(movie){
    if(movie.watched === false) {
      let unwatched = this.state.movies;
      let newUnwatched=[];
      unwatched.forEach((mov)=>{if(mov!==movie){newUnwatched.push(mov)}});
      this.setState({
        movies: newUnwatched
      })
      movie.watched = true;
      let watchedArr = this.state.watchedMovies;
      watchedArr.push(movie);
      this.setState({
        watchedMovies: watchedArr
      })
    } else {
      let watched = this.state.watchedMovies;
      let newWatched=[];
      watched.forEach((mov)=>{if(mov!==movie){newWatched.push(mov)}});
      this.setState({
        watchedMovies: newWatched
      })
      movie.watched = false;
      let unwatchedArr = this.state.movies;
      unwatchedArr.push(movie);
      this.setState({
        movies: unwatchedArr
      })
      
    }
  }

  render() {
    return (
      <div>
        <Search search={this.searchMovie}/>
        <AddMovie newMov={this.addMovie}/>
        <button onClick={this.toggleUnwatched}>Unwatched</button><button onClick={this.toggleWatched}>Watched</button>
        <br/>
        <br/>
        Filtered Movies:
        {this.state.filtMovies.map((movie,iter)=> <Movie movie={movie} key={iter}/>)}
        <br/>
        <br/>
        <br/>
          <div id='unwatched' style={{display:'block'}}>
            Unwatched Movies:
            {this.state.movies.map((movie,iter)=><Movie movie={movie} key={iter} wuToggle={this.watchUnwatchToggle}/>)} 
          </div>
          <div id='watched' style={{display:'none'}}>
            Watched Movies:
            {this.state.watchedMovies.map((movie,iter)=> <Movie movie={movie} key={iter} wuToggle={this.watchUnwatchToggle}/>)}
          </div>

      </div>
    )
  }
}
//Search bar at top
//Movie renders
  //Inside Movie, there are movie details. So MovieList will pass movie to Movie, which will pass Movie to Movie details;

ReactDOM.render( <MovieList />, document.getElementById('app'));
