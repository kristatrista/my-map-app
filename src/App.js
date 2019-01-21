import React, { Component } from 'react';
import './App.css';
import MapContainer from './Components/Map'
import Sidebar from './Components/Sidebar'
import Header from './Components/Header'
import escapeRegExp from 'escape-string-regexp';
import axios from 'axios'

// this app is created with the use of  google-maps-react,
// google map api ,foursquare api, axios and escape-string-regexp

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      venues:[],
      markers: [],
      query:'',
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      markerObjects: [],
      filteredMarkers:[]
  }}

  componentDidMount(){
    this.getData()
  }

  //get FourSquare venue data
  getData = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = {
      client_id: 'K4ZML25IPKBPHXMS4PBAJRTYYYEFSZVZHREESAP3RZNN04OA',
      client_secret: 'TNYPU0SMQQYMVVYXYZA35KNBAE2JWWL0YIZ31CRG5GXBXLUZ',
      query: 'coffee',
      near: 'Fayetteville, WV',
      v: '20190111'
    }

    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({venues: response.data.response.groups[0].items})
      this.setState({markers: response.data.response.groups[0].items})
    })
    .catch(error => {
      console.log('ERROR!' + error)
    })
 }

 //handles list click
 handleClick = (locaId) => {

   this.state.markerObjects.filter(index => {
     if (index.marker.id === locaId) {
        window.google.maps.event.trigger(index.marker, 'click')
     }
   })
 }
//updates query for list and markers
 updateQuery = (query) => {
     this.setState({ query })
     this.onMapClicked()
     let filterVenues=[]

     if (query) {
       const match = new RegExp(escapeRegExp(query), 'i')
       filterVenues = this.state.venues.filter(ven =>
         match.test(ven.venue.name)
       )
       this.setState({ venues: filterVenues })
     } else {
       this.getData()
     }
   }

   //map methods

       onMarkerClick = (props, marker, e) =>
         this.setState({
           selectedPlace: props,
           activeMarker: marker,
           showingInfoWindow: true,
         })

       onMapClicked = (props) => {
         if (this.state.showingInfoWindow) {
           this.setState({
             showingInfoWindow: false,
             activeMarker: null
           })
         }
       }
       //adds markers to markerObjects state
       onMarkerMounted = element => {
         if(this.state.markerObjects.length !== 6){
           this.setState(prevState => ({
             markerObjects: [...prevState.markerObjects, element]
           }))
         }
        }

  render() {

    return (
      <div className='App'>
      <Header />
      <Sidebar
        key='sidebar'
        venues = {this.state.venues}
        markers={this.state.markers}
        query={this.state.query}
        updateQuery={s => this.updateQuery(s)}
        handleClick={this.handleClick}
        onMarkerClick={this.onMarkerClick}
        onMapClicked={this.onMapClicked}
        selectedPlace={this.state.selectedPlace}
        activeMarker={this.state.activeMarker}
        showingInfoWindow={this.state.showingInfoWindow}

     />
      <MapContainer
        venues={this.state.venues}
        markers={this.state.markers}
        onMarkerClick={this.onMarkerClick}
        onMapClicked={this.onMapClicked}
        selectedPlace={this.state.selectedPlace}
        activeMarker={this.state.activeMarker}
        showingInfoWindow={this.state.showingInfoWindow}
        markerObjects={this.state.markerObjects}
        onMarkerMounted={this.onMarkerMounted}
        />

      </div>
    );
  }

}

export default App;
