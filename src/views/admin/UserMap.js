import React, {useEffect, useState} from 'react';

import ReactMapGL, {Marker, Popup} from 'react-map-gl';
// eslint-disable-line import/no-webpack-loader-syntax

// components
// import 'mapbox-gl/dist/mapbox-gl.css';
// config
// mapboxgl.accessToken = 'pk.eyJ1IjoieW9uaW1lcmtlYnUiLCJhIjoiY2tsM2dsYmsxMW1lNTJzcW8ybDM0eGtnbCJ9._Gb2Fd84O3SO2-LgHIICpw';

export default function AssignedTutors() {

    const [viewport, setViewport] = useState({
        latitude: 8.97,
        longitude: 38.8,
        width: "100%",
        height: "650px",
        zoom: 10.7
    });
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedPerson(null);
            }
        };
        window.addEventListener("keydown", listener);

        return() => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/allparents').then(response => response.json()).then(body => {
            setData(data.concat(body));
            fetch('http://127.0.0.1:5000/alltutors').then(response => response.json()).then(body => {
                setData(data.concat(body));
                setIsLoading(false);
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })

    }, []);

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <div>
                        <ReactMapGL {...viewport}
                            mapboxApiAccessToken={'pk.eyJ1IjoieW9uaW1lcmtlYnUiLCJhIjoiY2tsM2dsYmsxMW1lNTJzcW8ybDM0eGtnbCJ9._Gb2Fd84O3SO2-LgHIICpw'}
                            mapStyle='mapbox://styles/mapbox/streets-v11'>
                            {
                            isLoading ? <p>Loading</p> : data.map((person) => {
                                const geo = person.location.split(",")
                                return <Marker key={
                                        person.id
                                    }
                                    latitude={
                                        parseFloat(geo[0]) + parseFloat("0.0" + person.id)
                                    }
                                    longitude={
                                        parseFloat(geo[1]) + parseFloat("0.0" + person.id)
                                }>
                                    <button onClick={
                                        (e) => {
                                            e.preventDefault();
                                            setSelectedPerson(person);
                                        }
                                    }>
                                        <img width="30px" height="30px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Person_icon_BLACK-01.svg/1200px-Person_icon_BLACK-01.svg.png"/>
                                    </button>
                                </Marker>
                        })
                        }
                            {
                            selectedPerson ? (
                                <Popup latitude={
                                    parseFloat(selectedPerson.location.split(",")[0])  + parseFloat("0.0" + selectedPerson.id)
                                }
                                longitude={
                                        parseFloat(selectedPerson.location.split(",")[1])  + parseFloat("0.0" + selectedPerson.id)
                                    }
                                    onClose={
                                        () => {
                                            setSelectedPerson(null);
                                        }}>
                                    <div>
                                        <h2>{
                                            selectedPerson.user_id
                                        }</h2>
                                        <p>{
                                        selectedPerson.firstname + " " + selectedPerson.lastname
                                        }</p>
                                    </div>
                                </Popup>
                            ) : null
                        } </ReactMapGL>
                    </div>

                </div>
            </div>
        </>
    );
}
