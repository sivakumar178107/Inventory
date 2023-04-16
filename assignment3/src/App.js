import logo from './logo.svg';
import './App.css';
import MyInfo from './components/MyInfo';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Thirdapidata from './components/Displaydata';
import Inventory from './components/Inventory';
import Login from './components/login';
import UserDetails from './components/UserDetails';


function App() {
  return (
    <div className="App"> 
   
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path='/inventory' element={<Inventory/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Cricket_Score' element={<Thirdapidata/>}/>
        <Route path='/About'element={<MyInfo/>}/>
        <Route path='/User' element={<UserDetails/>}/>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </Router>
      
    </div>
    
  );
}

export default App;
