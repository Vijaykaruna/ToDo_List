import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
         <Route index element={<LoginPage/>}/>
         <Route path='signup' element={<SignupPage/>}/>
         <Route path='home' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
