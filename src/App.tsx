import React, { useEffect, useMemo, useState } from 'react';
import { SnackbarProvider } from 'notistack';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { MapProvider } from 'react-map-gl';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';
import ConfirmAction from './components/ConfirmAction/ConfirmAction';
import ConfirmedEmail from './components/ConfirmedEmail/ConfirmedEmail';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import RootLayout from './components/RootLayout/RootLayout';
import MapWorkspace from './components/MapWorkspace/MapWorkspace';
import EventsListPanel from './components/EventsListPanel/EventsListPanel';
import EventDetailsPanel from './components/EventDetailsPanel/EventDetailsPanel';
import EventCreationPanel from './components/EventCreationPanel/EventCreationPanel';
import UserProfile from './components/UserProfile/UserProfile';
import EditUserProfile from './components/UserProfile/EditUserProfile';
import Notifications from './components/Notifications/Notifications';
import THEME from './theme';
import EventHistory from './components/EventHistory/EventHistory';
import ForeignUserProfile from './components/ForeignUserProfile/ForeignUserProfile';
import SignalRContext from './signalRContext';
import { useAppDispatch } from './redux/store';
import { addMessage, setMessages } from './redux/chatSlice';
import { selectUserToken } from './redux/userSlice';
import Achievements from './components/Achievements/Achievements';
import { API_BASE_URL } from './constants';
import {
  selectDesiredBounds,
  selectDifficultySelection,
  selectDisciplineSelection,
  selectSortBySelection,
  selectSortDirectionSelection,
  setEvents,
} from './redux/eventsSlice';
import { convertError } from './utils/errorHandleUtils';
import Posts from './components/Posts/Posts';
import Post from './components/Post/Post';
import CreatePost from './components/CreatePost/CreatePost';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Navigate to="/events" />} />
      <Route path="events" element={<MapWorkspace />}>
        <Route index element={<EventsListPanel />} />
        <Route
          path="create"
          element={<EventCreationPanel isEditing={false} />}
        />
        <Route
          path="edit/:eventId"
          element={<EventCreationPanel isEditing />}
        />
        <Route path=":eventId" element={<EventDetailsPanel />} />
      </Route>
      <Route path="/log-in" element={<LogIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        path="/activate-account"
        element={
          <ConfirmAction
            label="Activation link has been sent to your e-mail."
            link="/"
            textNavigate="Return Home"
          />
        }
      />
      <Route path="/confirmed-email" element={<ConfirmedEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/reset-password-success"
        element={
          <ConfirmAction
            label="You've successfully reset your password."
            link="/log-in"
            textNavigate="Log in now!"
          />
        }
      />
      <Route
        path="/reset-password-send"
        element={
          <ConfirmAction
            label="We've sent via e-mail reset password instructions."
            link="/"
            textNavigate="Home"
          />
        }
      />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/posts" element={<Posts />}>
        <Route path="create" element={<CreatePost isEditing={false} />} />
        <Route path=":postId/edit" element={<CreatePost isEditing />} />
        <Route path=":postId" element={<Post />} />
      </Route>
      <Route
        path="/profile/achievements"
        element={<Achievements foreign={false} />}
      />
      <Route path="/profile/:activepage" element={<EditUserProfile />} />
      <Route
        path="/profile/eventsHistory"
        element={<EventHistory foreign={false} />}
      />

      <Route
        path="/user/:id/eventsHistory"
        element={<EventHistory foreign />}
      />

      <Route path="/notifications" element={<Notifications />} />
      <Route path="/user/:id" element={<ForeignUserProfile />} />
      <Route
        path="/achievements/:friendId"
        element={<Achievements foreign />}
      />
    </Route>,
  ),
);

function App() {
  const dispatch = useAppDispatch();
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const userToken = useSelector(selectUserToken);
  const desiredBounds = useSelector(selectDesiredBounds);
  const difficultySelection = useSelector(selectDifficultySelection);
  const disciplineSelection = useSelector(selectDisciplineSelection);
  const sortDirectionSelection = useSelector(selectSortDirectionSelection);
  const sortBySelection = useSelector(selectSortBySelection);

  useEffect(() => {
    axios
      .get(
        `${API_BASE_URL}/meeting/list?southWestLongitude=${
          desiredBounds[0]
        }&southWestLatitude=${desiredBounds[1]}&northEastLongitude=${
          desiredBounds[2]
        }&northEastLatitude=${desiredBounds[3]}${
          difficultySelection !== 0
            ? `&difficulty=${difficultySelection - 1}`
            : ``
        }${
          disciplineSelection !== 0
            ? `&sportsDiscipline=${disciplineSelection - 1}`
            : ``
        }${sortBySelection !== 'Default' ? `&sortBy=${sortBySelection}` : ``}${
          sortDirectionSelection !== 0
            ? `&sortDirection=${sortDirectionSelection - 1}`
            : ``
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((response) => {
        dispatch(setEvents(response.data));
      })
      .catch((error) => {
        convertError(error);
      });
  }, []);

  useEffect(() => {
    if (userToken && !connection) {
      const connect = new HubConnectionBuilder()
        .withUrl(`https://localhost:44358/chat-hub?accessToken=${userToken}`)
        .withAutomaticReconnect()
        .build();

      setConnection(connect);
    }
    return () => {
      if (connection) {
        connection.stop();
        setConnection(null);
      }
    };
  }, [userToken, connection]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on('ConnectionCheck', (message) => {
            console.log(message);
          });
          connection.on('History', (messagesHistory) => {
            dispatch(setMessages(messagesHistory));
          });
          connection.on('ReceiveMessage', (message) => {
            dispatch(addMessage(message));
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection, dispatch]);

  return (
    <SignalRContext.Provider
      value={useMemo(() => {
        return { connection };
      }, [connection])}
    >
      <ThemeProvider theme={THEME}>
        <SnackbarProvider maxSnack={6}>
          <MapProvider>
            <CssBaseline />
            <RouterProvider router={router} />
          </MapProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </SignalRContext.Provider>
  );
}

export default App;
