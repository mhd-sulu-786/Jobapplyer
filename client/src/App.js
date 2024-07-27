
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './componets/Login/Login';
import DashBoard from './componets/Home/Home';
import Form from './componets/Apply';
import Profile from './componets/Home/Profile';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<DashBoard/>} />
          <Route path="/apply" element={<Form/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;