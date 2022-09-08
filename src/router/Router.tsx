import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WeeklyScheduleTable from '../pages/WeeklyScheduleTable';
import DefaultLayout from '../layout/DefaultLayout';
import AddScheduleTable from '../pages/AddScheduleTable';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
         <Route path='/' element={<WeeklyScheduleTable />} />
         <Route path='/addschedule' element={<AddScheduleTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
