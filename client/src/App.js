import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import mappin from './assests/pin.png'
import { listLogEntries } from './api'

const App = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 19.0760,
    longitude: 72.8777,
    zoom: 8
  });

  const [logEntries, setlogEntries] = useState([])

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries()
      setlogEntries(logEntries)
    })()
  }, [])

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/aditya12276/cklci7fma3vi517sa83xz0ldg"
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {
        logEntries.map(entry => (
          <Marker key={entry._id} latitude={entry.latitude} longitude={entry.longitude} offsetLeft={-20} offsetTop={-10}>
            <img src={mappin} alt={entry.title} width="24px" />
          </Marker>
        ))
      }
    </ReactMapGL>
  );
}

export default App;