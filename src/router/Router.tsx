import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WeeklySchedule from '../pages/WeeklySchedule';
import AddSchedule from '../pages/AddSchedule';

type Props = {};

const Router = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WeeklySchedule />} />
        <Route path='/addschedule' element={<AddSchedule />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
