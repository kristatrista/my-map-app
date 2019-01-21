import React, { Component } from 'react';
import Search from './Search.js'

class Sidebar extends Component {

  render(){
    return (
      <div  id='sidebar'>
      <p>Coffee Shops Near Fayetteville, WV</p>
      <Search
        query={this.props.query}
        updateQuery={s => this.props.updateQuery(s)}
          />
      <ul>{
        //put venues in a list
          this.props.venues.map(ven => {
            //get venue name
              return(
                <button
                onClick={(e) => {
                                this.props.handleClick(ven.venue.id)
                              }}

                tabIndex='0'
                aria-label={ven.venue.name}
                key={ven.venue.id}
                id={ven.venue.id}><p> {ven.venue.name}</p>
                {ven.venue.location.address}</button>
              )
            })
          }
          </ul>
      </div>
    );
  }
  }



export default Sidebar;
