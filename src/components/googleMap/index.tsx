import { useEffect } from 'react';

export interface IGoogleMapProps {
    sendGoogleMapAddressInformation: Function;
    sendLat:Function;
    sendLng:Function;
}

 export function  InitMap({sendGoogleMapAddressInformation,sendLat,sendLng}:IGoogleMapProps){

        useEffect(() => {
            let map: google.maps.Map;
            let geocoder: google.maps.Geocoder;
            let infowindow: google.maps.InfoWindow;
    
            const initialize = () => {
                map = new window.google.maps.Map(document.getElementById('map')  as HTMLElement, {
                    center: { lat:40.7998738714596, lng:43.857421875},
                    zoom: 8
                });
    
                geocoder = new window.google.maps.Geocoder();
                infowindow = new window.google.maps.InfoWindow();
    
                window.google.maps.event.addListener(map, 'click', (event:google.maps.KmlMouseEvent) => {
                    getAddressAndCoordinates(event.latLng);
                });
            };
    
            const getAddressAndCoordinates = (latLng:any) => {
                geocoder.geocode({ location: latLng }, (results:any, status:any) => {
                    if (status === 'OK') {
                        if (results[0]) {
                            const address = results[0].formatted_address;
                            const lat = latLng.lat();
                            const lng = latLng.lng();
                            // document.getElementById('address')!.textContent = address;
                            // document.getElementById('lat')!.textContent = lat;
                            // document.getElementById('lng')!.textContent = lng;
    
                            infowindow.setContent(address);
                            infowindow.setPosition(latLng);
                            infowindow.open(map);
                            sendGoogleMapAddressInformation(address)
                            sendLat(lat)
                            sendLng(lng)

                     
                        } else {
                            window.alert('No results found');
                        }
                    } else {
                        window.alert('Geocoder failed due to: ' + status);
                    }
                });
            };
    
            window.google.maps.event.addDomListener(window, 'load', initialize);
        }, []);
    
        return (
            <>
            <div>
                <div id="map" style={{ height: '100%',width:'609px'}} className='containerStyle__google__map'></div>
                {/* <p><strong>Address:</strong> {googleMapAddress}<span id="address"></span></p>
                <p><strong>Latitude:</strong>{googleMapLat} <span id="lat"></span></p>
                <p><strong>Longitude:</strong>{googleMapLng} <span id="lng"></span></p> */}
                       </div>
            </>
            
        );
    };
