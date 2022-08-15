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
  return (
    <Provider store={store}>
      <Notifications />

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Container className="planner-content">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="new" element={<TaskCreation />} />
              <Route path="edit/:id" element={<TaskCreation />} />
              <Route path="tasks" element={<TasksList />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
