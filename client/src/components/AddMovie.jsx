import React from 'react';
import ReactDOM  from 'react-dom';

class AddMovie extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            addQuery: ''
        }
        this.movieQuery = this.movieQuery.bind(this);
        this.addMovie = this.addMovie.bind(this);
    }
    movieQuery(event){
        this.setState({
            addQuery: event.target.value
        })
        console.log(this.state.addQuery);
    }
    addMovie(){
        this.props.newMov(this.state.addQuery)
    }

    render(){
    return (
    <div>
        Add Movie:
        <input type='text' value={this.state.addQuery} onChange={this.movieQuery}/>
        <button onClick={this.addMovie}>Click me</button>
    </div>
    )
    }
}

{/* <input type = 'text'> </input> */}
export default AddMovie;