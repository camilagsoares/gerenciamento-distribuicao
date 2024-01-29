import { GlobalStyles } from "./styles/global";
import Login from './pages/Login/index';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { Home } from './pages/Home/index'
import { Cadastro } from './pages/Cadastro/index'


function App() {
  return (

    <Router>
      <GlobalStyles />
      {/* <Route path="/" element={<Layout />}> */}

      <Routes>

        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

      </Routes>
    </Router>
  );
}

export default App;
