import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Pages/home/Home';
import Register from './Pages/register/Register';
import View from './Pages/view/View';
import Authenticate from './Pages/authenticate/Authenticate';
import Aboutus from './Pages/AboutUs';
import BucketInfoProvider from 'context/BucketInfoProvider';

function App() {
  return (
    <BucketInfoProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/view" element={<View />} />
            <Route path="/authenticate" element={<Authenticate />} />
            <Route path="/aboutus" element={<Aboutus />} />
          </Routes>
        </Layout>
      </Router>
    </BucketInfoProvider>
  );
}

export default App;
