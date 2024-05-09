import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Pages/Home';
import Register from './Pages/Register';
import View from './Pages/view/View';
import Expired from './Pages/Expired';
import Authenticate from './Pages/authenticate/Authenticate';
import AboutUs from './Pages/AboutUs';

function App() {
  return (
    <Router>
      <Layout hasSidebar={true}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/view" element={<View />} />
          <Route path="/expired" element={<Expired />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
