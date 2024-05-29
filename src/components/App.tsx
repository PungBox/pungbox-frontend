import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Pages/home/Home';
import Register from './Pages/register/Register';
import View from './Pages/view/View';
import Expired from './Pages/view/component/Expired';
import Authenticate from './Pages/authenticate/Authenticate';
import Aboutus from './Pages/AboutUs';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/view" element={<View />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/aboutus" element={<Aboutus />} />
          {/* Todo: expired route 삭제하고 view와 통합 예정 (or 페이지 따로 만드는게 더 편하긴 합니다)*/}
          <Route path="/expired" element={<Expired />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
