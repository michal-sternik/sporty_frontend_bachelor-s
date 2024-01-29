import React, { useState } from 'react';

import { Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Map, {
  GeolocateControl,
  MapLayerMouseEvent,
  Marker,
  NavigationControl,
  useMap,
} from 'react-map-gl';
import useSupercluster from 'use-supercluster';
import { BBox } from 'geojson';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { selectAllEvents, setDesiredBounds } from '../../redux/eventsSlice';
import {
  eventsMapStyle,
  eventsMapSearchAreaButtonStyle,
} from './EventsMapStyles';
import 'mapbox-gl/dist/mapbox-gl.css';
import creationImage from '../../assets/images/place.png';
import { useAppDispatch } from '../../redux/store';
import { EventShort } from '../../types';
import footballImage from '../../assets/images/disciplines/football.png';
import volleyballImage from '../../assets/images/disciplines/volleyball.png';
import basketballImage from '../../assets/images/disciplines/basketball.png';
import tennisImage from '../../assets/images/disciplines/tennis.png';
import badmintonImage from '../../assets/images/disciplines/badminton.png';
import tableTennisImage from '../../assets/images/disciplines/table-tennis.png';
import runningImage from '../../assets/images/disciplines/running.png';
import handballImage from '../../assets/images/disciplines/handball.png';
import golfImage from '../../assets/images/disciplines/golf.png';
import cyclingImage from '../../assets/images/disciplines/cycling.png';
import dancingImage from '../../assets/images/disciplines/dancing.png';
import gymImage from '../../assets/images/disciplines/gym.png';
import iceSkatingImage from '../../assets/images/disciplines/ice-skating.png';
import otherImage from '../../assets/images/disciplines/other.png';
import {
  CENTER_OF_POLAND,
  CLOSE_ZOOM,
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_MAP_STYLE,
} from '../../constants';
import {
  selectEventCreationCoordinates,
  selectIsChatOpen,
  selectIsEventCreationOn,
  selectIsMapVisible,
} from '../../redux/mapSlice';

function EventsMap() {
  const dispatch = useAppDispatch();
  const events = useSelector(selectAllEvents);
  const isEventCreationOn = useSelector(selectIsEventCreationOn);
  const eventCreationCoordinates = useSelector(selectEventCreationCoordinates);
  const isMapVisible = useSelector(selectIsMapVisible);
  const isChatOpen = useSelector(selectIsChatOpen);
  const location = useLocation();

  const { eventsMap: mapRef } = useMap();
  const navigate = useNavigate();

  const [zoom, setZoom] = useState<number>(CENTER_OF_POLAND.zoom);
  const [bounds, setBounds] = useState<BBox>();
  const [boundsChanged, setBoundsChanged] = useState<boolean>(false);

  const points = events.map((event: EventShort) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [event.longitude, event.latitude],
    },
    properties: {
      cluser: false,
      id: event.id,
      discipline: event.sportsDiscipline,
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    zoom,
    bounds,
    options: { radius: 75, maxZoom: 17 },
  });

  const handleChange = () => {
    setZoom(mapRef?.getZoom() ?? 0);
    setBounds(mapRef?.getBounds().toArray().flat() as BBox);
    setBoundsChanged(true);
  };

  const handleMapLoad = () => {
    setZoom(mapRef?.getZoom() ?? 0);

    const newBounds = mapRef?.getBounds().toArray().flat() as BBox;
    setBounds(newBounds);
    console.log(newBounds);
  };

  const handleAreaSearchClick = () => {
    const newBounds = mapRef?.getBounds().toArray().flat() as BBox;
    dispatch(setDesiredBounds(newBounds));
    setBoundsChanged(false);
  };

  const handleMapClick = (clickEvent: MapLayerMouseEvent) => {
    if (!isEventCreationOn) {
      navigate(
        `/events/create?lat=${clickEvent.lngLat.lat}&lng=${clickEvent.lngLat.lng}`,
      );
    } else {
      navigate(
        `${location.pathname}?lat=${clickEvent.lngLat.lat}&lng=${clickEvent.lngLat.lng}`,
      );
    }
  };

  return (
    <Stack
      position="relative"
      flexGrow={1}
      flexBasis={0}
      height="100%"
      sx={{ display: { xs: isMapVisible ? 'flex' : 'none', md: 'flex' } }}
    >
      <Tooltip
        title="Aby dodać wydarzenie, kliknij mapę w miejscu, gdzie chcesz je zorganizować."
        arrow
        placement="right"
      >
        <IconButton
          size="large"
          sx={{
            position: 'absolute',
            bottom: '32px',
            left: '32px',
            zIndex: 3,

            backgroundColor: '#1976d2',

            '&:hover': {
              backgroundColor: '#1976d2',
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Map
        id="eventsMap"
        onMove={handleChange}
        onLoad={handleMapLoad}
        onClick={handleMapClick}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialViewState={CENTER_OF_POLAND}
        style={eventsMapStyle}
        mapStyle={MAPBOX_MAP_STYLE}
      >
        <GeolocateControl />
        <NavigationControl />
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={cluster.id}
                latitude={latitude}
                longitude={longitude}
                onClick={(clickEvent) => {
                  clickEvent.originalEvent.stopPropagation();
                  const expansionZoom = supercluster.getClusterExpansionZoom(
                    cluster.id,
                  );

                  mapRef?.flyTo({
                    center: [longitude, latitude],
                    zoom: expansionZoom,
                  });
                }}
              >
                <Stack
                  sx={{
                    backgroundColor: '#1976D2',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: `${36 + (pointCount / points.length) * 10}px`,
                    height: `${36 + (pointCount / points.length) * 10}px`,
                    cursor: 'pointer',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#FFFFFF',
                      fontFamily: 'Open Sans',
                      fontWeight: 'bold',
                    }}
                  >
                    {pointCount}
                  </Typography>
                </Stack>
              </Marker>
            );
          }

          return (
            <Marker
              key={cluster.properties.id}
              latitude={latitude}
              longitude={longitude}
              onClick={(clickEvent) => {
                clickEvent.originalEvent.stopPropagation();
                mapRef?.flyTo({
                  center: [longitude, latitude],
                  zoom: CLOSE_ZOOM,
                });
                navigate(`/events/${cluster.properties.id}`);
              }}
            >
              <IconButton>
                {cluster.properties.discipline === 0 && (
                  <img
                    src={footballImage}
                    style={{ height: '36px' }}
                    alt="Piłka nożna"
                  />
                )}
                {cluster.properties.discipline === 1 && (
                  <img
                    src={volleyballImage}
                    style={{ height: '36px' }}
                    alt="Siatkówka"
                  />
                )}
                {cluster.properties.discipline === 2 && (
                  <img
                    src={basketballImage}
                    style={{ height: '36px' }}
                    alt="Koszykówka"
                  />
                )}
                {cluster.properties.discipline === 3 && (
                  <img
                    src={tennisImage}
                    style={{ height: '36px' }}
                    alt="Tenis"
                  />
                )}
                {cluster.properties.discipline === 4 && (
                  <img
                    src={badmintonImage}
                    style={{ height: '36px' }}
                    alt="Badmintion"
                  />
                )}
                {cluster.properties.discipline === 5 && (
                  <img
                    src={tableTennisImage}
                    style={{ height: '36px' }}
                    alt="Tenis stołowy"
                  />
                )}
                {cluster.properties.discipline === 6 && (
                  <img
                    src={runningImage}
                    style={{ height: '36px' }}
                    alt="Bieganie"
                  />
                )}
                {cluster.properties.discipline === 7 && (
                  <img
                    src={handballImage}
                    style={{ height: '36px' }}
                    alt="Piłka ręczna"
                  />
                )}
                {cluster.properties.discipline === 8 && (
                  <img src={golfImage} style={{ height: '36px' }} alt="Golf" />
                )}
                {cluster.properties.discipline === 9 && (
                  <img
                    src={cyclingImage}
                    style={{ height: '36px' }}
                    alt="Kolarstwo"
                  />
                )}
                {cluster.properties.discipline === 10 && (
                  <img
                    src={dancingImage}
                    style={{ height: '36px' }}
                    alt="Taniec"
                  />
                )}
                {cluster.properties.discipline === 11 && (
                  <img
                    src={gymImage}
                    style={{ height: '36px' }}
                    alt="Siłownia"
                  />
                )}
                {cluster.properties.discipline === 12 && (
                  <img
                    src={iceSkatingImage}
                    style={{ height: '36px' }}
                    alt="Łyżwy"
                  />
                )}
                {cluster.properties.discipline === 13 && (
                  <img src={otherImage} style={{ height: '36px' }} alt="Inne" />
                )}
              </IconButton>
            </Marker>
          );
        })}
        {isEventCreationOn && (
          <Marker
            latitude={eventCreationCoordinates[0]}
            longitude={eventCreationCoordinates[1]}
          >
            <img
              src={creationImage}
              style={{ height: '36px' }}
              alt="Tworzenie"
            />
          </Marker>
        )}
      </Map>
      {boundsChanged && !isChatOpen && (
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleAreaSearchClick}
          sx={eventsMapSearchAreaButtonStyle}
        >
          Szukaj w tym obszarze
        </Button>
      )}
    </Stack>
  );
}

export default EventsMap;
