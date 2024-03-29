import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Provider } from 'react-redux'
import store from 'redux/store';

import MainPage from 'components/pages/mainPage/mainPage';
import TaskCreation from 'components/pages/taskCreationPage/taskCreationPage';
import TasksList from 'components/pages/tasksListPage/tasksListPage';
import Notifications from 'components/notifications/notifications';

import 'styles/main.scss';

function App() {
  const baseUrl = process.env.REACT_APP_URL_PREFIX || '/';

  return (
    <Provider store={store}>
      <Notifications />

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Container className="planner-content p-0">
          <BrowserRouter>
            <Routes>
              <Route path={`${baseUrl}`} element={<MainPage />} />
              <Route path={`${baseUrl}new`} element={<TaskCreation />} />
              <Route path={`${baseUrl}edit/:id`} element={<TaskCreation />} />
              <Route path={`${baseUrl}tasks`} element={<TasksList />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
