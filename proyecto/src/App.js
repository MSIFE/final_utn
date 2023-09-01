import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Nav from './components/layout/Nav';

import Home from './pages/Home';
import Aboutus from './pages/Aboutus';
import Login from './pages/Login';
import Products from './pages/Products';

import './App.css';
import './style/components/layout/Layout.css';

function App() {
  return (
  <>
  
 <Header />

 <BrowserRouter>
 <Nav />
 <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/nosotros' element={<Aboutus />} />
  <Route path='/login' element={<Login />} />
  <Route path='/productos' element={<Products />} />
 </Routes>
 
 </BrowserRouter>
<Footer />

  </>
  );
}

export default App;
