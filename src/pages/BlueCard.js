import React from "react";
// import "./styles.css";
import {
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Grid
} from '@material-ui/core';

import ReactFlow from "react-flow-renderer";
import AmplitudeEvent from '../components/AmplitudeEvent'


// const elements = [
//   {
//     id: "1",
//     type: "input",
//     data: { label: "Sign Offer Letter" },
//     position: { x: 50, y: 50 }
//   },
//   { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
//   { id: "3", data: { label: "Node 3" }, position: { x: 250, y: 150 } },
//   { id: "4", data: { label: "Node 4" }, position: { x: 500, y: 200 } },
//   { id: "5", data: { label: "Node 5" }, position: { x: 750, y: 250 } },
//   {
//     id: "6",
//     data: { label: "Node 6" },
//     position: { x: 800, y: 300 },
//     type: "output"
//   },
//   { id: "e1-2", source: "3", target: "2", type: "straight" },
//   { id: "e1-3", source: "1", target: "3", type: "default" },
//   { id: "e1-4", source: "1", target: "4", type: "default" },
//   { id: "e1-5", source: "5", target: "2", type: "step", animated: true },
//   { id: "e1-6", source: "1", target: "6", type: "step" }
// ];
const elements = [
    { id: "1", data: { label: "In Home Country" }, type: "input", position: { x: 50, y: 100 } },
    { id: "11", data: { label: "Sign Offer Letter" }, position: { x: 250, y: 100 } },
    { id: "12", data: { label: "Visa Appointment" }, position: { x: 450, y: 100 } },
    { id: "13", data: { label: "Get Documents" }, position: { x: 650, y: 100 } },
    { id: "14", data: { label: "Attend Visa" }, position: { x: 850, y: 100 } },
    { id: "15", data: { label: "Get Visa" }, position: { x: 1050, y: 100 } },

    { id: "e1-11", source: "1", target: "11", type: "step"},
    { id: "e1-1-2", source: "11", target: "12", type: "step", animated: true },
    { id: "e1-2-3", source: "12", target: "13", type: "step", animated: true },
    { id: "e1-3-4", source: "13", target: "14", type: "step", animated: true },
    { id: "e1-4-5", source: "14", target: "15", type: "step", animated: true },


    { id: "21", data: { label: "Book Temporary Stay" }, position: { x: 150, y: 200 } },
    { id: "22", data: { label: "Book flight tickets" }, position: { x: 350, y: 200 } },
    { id: "23", data: { label: "Appartment search" }, position: { x: 550, y: 200 } },
    { id: "24", data: { label: "Apply TK insurance" }, position: { x: 750, y: 200 } },
    { id: "25", data: { label: "Land in Germany" }, position: { x: 950, y: 200 } },

    { id: "e2-1-2", source: "21", target: "22", type: "step", animated: true },
    { id: "e2-2-3", source: "22", target: "23", type: "step", animated: true },
    { id: "e2-3-4", source: "23", target: "24", type: "step", animated: true },
    { id: "e2-4-5", source: "24", target: "25", type: "step", animated: true },

    { id: "3", data: { label: "In Germany" }, type: "input", position: { x: 50, y: 350 } },
    { id: "31", data: { label: "Start Job" }, position: { x: 250, y: 350 } },
    { id: "32", data: { label: "Get Accomodation with agreement" }, position: { x: 450, y: 350 } },
    { id: "33", data: { label: "Do city registration" }, position: { x: 650, y: 350 } },
    { id: "34", data: { label: "Get tax Id" }, position: { x: 850, y: 350 } },
    { id: "35", data: { label: "Open Bank account" }, position: { x: 1050, y: 350 } },
    { id: "36", data: { label: "Get social security from TK" }, position: { x: 1250, y: 350 } },
    { id: "37", data: { label: "Wait for 2 payslips and Apply for Blue card" }, position: { x: 1250, y: 450 } },

    { id: "e3-31", source: "3", target: "31", type: "step"},
    { id: "e3-1-2", source: "31", target: "32", type: "step", animated: true },
    { id: "e3-2-3", source: "32", target: "33", type: "step", animated: true },
    { id: "e3-3-4", source: "33", target: "34", type: "step", animated: true },
    { id: "e3-4-5", source: "34", target: "35", type: "step", animated: true },
    { id: "e3-5-6", source: "34", target: "36", type: "step", animated: true },
    { id: "e3-6-7", source: "36", target: "37", type: "step", animated: true },

    { id: "4", data: { label: "Towards Permanent settlement" }, type: "input", position: { x: 50, y: 450 } },
    { id: "41", data: { label: "Join German Language course" }, position: { x: 250, y: 450 } },
    { id: "42", data: { label: "Wait for 21 Months from the start date" }, position: { x: 450, y: 450 } },
    { id: "43", data: { label: "Do city registration" }, position: { x: 650, y: 450 } },
    { id: "44", data: { label: "Apply for PR" },  type: "output", position: { x: 850, y: 450 } },

    { id: "e4-41", source: "4", target: "41", type: "step"},
    { id: "e4-1-2", source: "41", target: "42", type: "step", animated: true },
    { id: "e4-2-3", source: "42", target: "43", type: "step", animated: true },
    { id: "e4-3-4", source: "43", target: "44", type: "step", animated: true },
];

const graphStyles = { width: "100%", height: "600px" };

const BasicGraph = () => {
    AmplitudeEvent("/bluecard-loaded");
return <ReactFlow elements={elements} style={graphStyles} />;
};

// Custom
// const customElement = [
//   {
//     id: "1",
//     style: {
//       background: "#454052",
//       width: 200,
//       color: "#fff",
//       fontSize: "20px",
//       fontFamily: "Helvetica",
//       boxShadow: "5px 5px 5px 0px rgba(0,0,0,.10)"
//     },
//     data: { label: "My custom node" },
//     position: { x: 500, y: 250 }
//   },
//   {
//     id: "2",
//     style: {
//       background: "#fff",
//       width: 400,
//       color: "#454052",
//       fontSize: "25px",
//       fontFamily: "Helvetica",
//       boxShadow: "5px 5px 5px 0px rgba(0,0,0,.10)"
//     },
//     data: { label: "My second custom node 😉" },
//     position: { x: 550, y: 300 }
//   }
// ];

export default function BlueCard() {
    return (<>
        <h4> Blue card step by step guide. </h4>
        <BasicGraph />
        </>);
    
}
