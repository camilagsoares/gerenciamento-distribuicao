import { GlobalStyles } from "./styles/global";
import Login from './pages/Login/Login';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { Home } from './pages/Home/Home'

function App() {
  return (

    <Router>
      <GlobalStyles />
      {/* <Route path="/" element={<Layout />}> */}

      <Routes>

        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </Router>
  );
}

export default App;
