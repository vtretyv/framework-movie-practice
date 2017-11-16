import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
        this.changeQuery= this.changeQuery.bind(this);
        this.searchQuery= this.searchQuery.bind(this);
    }
    changeQuery(event){
        this.setState({
            query: event.target.value
        })
        console.log(this.state.query);
    }
    searchQuery(){
        this.props.search(this.state.query);
    }
    render() {
    return (
    <div>
        Search:
        <input type ='text' value={this.state.query} onChange={this.changeQuery}/>
        <button onClick={this.searchQuery} >Search</button>
    </div>
    )
    }
}

export default Search;