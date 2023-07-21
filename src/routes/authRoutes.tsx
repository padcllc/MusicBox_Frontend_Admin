import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {Auth, Login, Registration} from '../pages/index';

export function AuthRoutes() {
  return <>
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<Auth/>}>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/registration' element={<Registration/>}/>
                </Route>
                <Route path='*' element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
  
  
  </>;
}
