import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAlkP8RNryCUugbHNVGBUNHoIzdgd695s8");
Geocode.enableDebug();

const mapStyles = {
    width: '100%',
    height: '100%',
};


export class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showingInfoWindow: true,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},        //Shows the infoWindow to the selected place upon a marker
            address: '',
            loc: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            }
        };
        this.onMarkerDragEnd = this.onMarkerDragEnd.bind(this)
    }

    //     /**
//      * Get the current address from the default map position and set those values in the state
//      called after render.
//      */
    componentDidMount() {
        Geocode.fromLatLng( this.state.loc.lat , this.state.loc.lng ).then(
            response => {
                const address = response.results[0].formatted_address;
                console.log('address in didmount', address);
                console.log('address', address);
                this.setState( {
                    address: ( address ) ? address : '',
                } )
            },
            error => {
                console.error(error);
            }
        );
    };

    shouldComponentUpdate( nextProps, nextState ){
        if (nextProps.center.lat !== this.state.loc.lat) {
            //maybe get address from here.
            // this.props.callback(nextState.address, nextProps.center.lat, nextProps.center.lng);
            console.log('props updates', nextProps.center);
            const lat = nextProps.center.lat;
            const lng = nextProps.center.lng;
            Geocode.fromLatLng( lat , lng ).then(
                response => {
                    const address = response.results[0].formatted_address;
                    console.log('address change on shouldComponentUpdate', address);
                    this.setState( {
                        address: ( address ) ? address : '',
                        loc: {
                            lat: lat,
                            lng: lng
                        },
                    } )
                },
                error => {
                    console.error(error);
                }
            );
            console.log('props updates nextstate', nextState);
            return true
        }
        else if (this.state.address !== nextState.address) {
            this.props.callback(nextState.address, nextState.loc.lat, nextState.loc.lng);
            console.log('state updates', nextState);
            return true
        }
        else{
            return false
        }
    }

    onMarkerDragEnd(one, two, three) {
        const { latLng } = three;
        const lat = latLng.lat();
        const lng = latLng.lng();
        console.log('markerdrag lat', lat);
        console.log('markerdrag lng', lng);
        Geocode.fromLatLng( lat , lng ).then(
            response => {
                const address = response.results[0].formatted_address;
                console.log('address change on marker drag', address);
                this.setState( {
                    address: ( address ) ? address : '',
                    loc: {
                        lat: lat,
                        lng: lng
                    },
                } )
            },
            error => {
                console.error(error);
            }
        );
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    render(){
        console.log('state of Gmaps', this.state);
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                    lat: this.state.loc.lat,
                    lng: this.state.loc.lng
                }}
            >
                <Marker
                    draggable={true}
                    onDragend={ this.onMarkerDragEnd }
                    onClick={this.onMarkerClick}
                    position={{ lat: ( this.state.loc.lat ), lng: this.state.loc.lng }}
                />
                <InfoWindow
                    visible
                    position={{ lat: ( this.state.loc.lat + 0.0028 ), lng: this.state.loc.lng }}
                    onClose={this.onClose}>
                    <div>
                        <h4>{this.state.address}</h4>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAlkP8RNryCUugbHNVGBUNHoIzdgd695s8'
})(MapContainer);