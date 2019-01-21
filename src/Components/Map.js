import React, { Component } from 'react';
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';
//https://www.npmjs.com/package/google-maps-react




// google-maps-react API source: https://www.npmjs.com/package/google-maps-react

const MAP_KEY = 'AIzaSyB1HfA1M0jvDIsyTURpsctT6JZb5bi2fIw'

class MapContainer extends Component {

//all map methods are in app.js so that data is accessible to all components
  render() {

    return (
      <Map
            id='map'
            role='application'
            aria-label='map'
            google={this.props.google}
            initialCenter={{
              lat: 38.052887,
              lng: -81.103989
             }}
            zoom={13}
            onClick={this.props.onMapClicked}
           >

           {
              this.props.venues.map((ven) => {

                       return (
                         <Marker
                          ref={this.props.onMarkerMounted}
                          onClick={this.props.onMarkerClick}
                          id={ven.venue.id}
                          key={ven.venue.id}
                          title={ven.venue.name}
                          name={ven.venue.name}
                          address={ven.venue.location.formattedAddress}
                          position={{
                            lat: ven.venue.location.lat,
                            lng: ven.venue.location.lng
                          }}
                         />
                       )
                     })
                   }
                   
                     <InfoWindow
                     id='infoWindow'
                     marker={this.props.activeMarker}
                     visible={this.props.showingInfoWindow}
                     >
                     <div id='infoWindow'>
                      <h2>{this.props.selectedPlace.name}</h2>
                      <h3>{this.props.selectedPlace.address}</h3>
                      <h5>FourSquare</h5>
                     </div>
                     </InfoWindow>
           </Map>
    );
  }
}

export default GoogleApiWrapper({apiKey: MAP_KEY})(MapContainer);
