import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WeeklySchedule from '../pages/WeeklySchedule';
import DefaultLayout from '../layout/DefaultLayout';
import AddSchedule from '../pages/AddSchedule';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
         <Route path='/' element={<WeeklySchedule />} />
         <Route path='/addschedule' element={<AddSchedule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
