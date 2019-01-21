import React, { Component } from 'react';

class Search extends Component {

  render() {
    return (

      <div id='search'>
      <input
      aria-label='Location Filter'
      role='search'
      type='text'
      onChange={(event) => this.props.updateQuery(event.target.value)}
      placeholder='Search'
      value= {this.props.query}
    />

      </div>
    );
  }
}

export default Search;
