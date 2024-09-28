import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Description from './components/Description';
import History from './components/History';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/description' element={<Description />} />
          <Route path='/history' element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
