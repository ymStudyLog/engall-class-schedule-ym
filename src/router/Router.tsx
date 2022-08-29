import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WeeklySchedule from '../pages/WeeklySchedule';
// import AddSchedule from '../pages/AddSchedule';
import DefaultLayout from '../layout/DefaultLayout';
import Addcopy from '../pages/Addcopy';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
         <Route path='/' element={<WeeklySchedule />} />
         {/* <Route path='/addschedule' element={<AddSchedule />} /> */}
         <Route path='/addschedule' element={<Addcopy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
