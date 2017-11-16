import React from 'react';
import ReactDOM  from 'react-dom';
import AddMovie from './AddMovie.jsx';
import MovieDetails from './MovieDetails.jsx';
import Search from './Search.jsx';
class Movie extends React.Component {
    constructor(props){
        super(props);
        this.watchToggle = this.watchToggle.bind(this);
    }
    watchToggle(){
        this.props.wuToggle(this.props.movie)
    }
    render(){
    return(
    <div>
        <br/>
        Movie:
        {this.props.movie.title}
        <button style={{marginLeft:'10px'}} onClick={this.watchToggle}>watch/unwatch</button>
        <MovieDetails details={this.props.movie.overview}/>
    </div>
    )
    }
}


export default Movie;