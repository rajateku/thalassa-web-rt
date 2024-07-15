import  {useState, useEffect } from 'react';

import * as Amplitude from '@amplitude/node';
const client = Amplitude.init('134db46c6891a3c3aed764a5dc7d8eda');



function AmplitudeEvent (textLabel) {
    // const {textLabel} = props;
    console.log("referrer url", document.referrer);
    console.log("event::::::::", textLabel);

    const [ref, setRef] = useState(document.referrer);
    // App Opened
    useEffect(() => {
        fetch("https://geolocation-db.com/json/")
            .then(response => {
                return response.json();
            }, "jsonp")
            .then(res => {
                console.log(res)
                // client.logEvent({
                //     event_type: "Expatgyd - " + textLabel,
                //     user_id: res.IPv4,
                //     location_lat: res.latitude,
                //     location_lng: res.longitude,
                //     ip: res.IPv4,
                //     event_properties: {
                //         keyString: ref,
                //         keyInt: 11,
                //         keyBool: true
                //     }
                // });
            })
            .catch(err => console.log(err))
    }, [])
  }
  
  export default AmplitudeEvent;