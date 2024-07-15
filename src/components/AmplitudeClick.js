import * as Amplitude from '@amplitude/node';
const client = Amplitude.init('134db46c6891a3c3aed764a5dc7d8eda');



function AmplitudeClick (clickText, user_id) {
    // const {textLabel} = props;
    console.log("referrer url", document.referrer);
    console.log("event::::::::", clickText);

    // const [ref, setRef] = useState(document.referrer);
    // App Opened
    // client.logEvent({
    //     event_type: "Expatgyd - " + clickText,
    //     user_id: user_id,
    //     event_properties: {
    //         keyString: document.referrer,
    //         keyInt: 11,
    //         keyBool: true
    //     }
    // });
  }
  
  export default AmplitudeClick;