import { GlobalStyles } from "./styles/global";
import Login from './pages/Login/index';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { Home } from './pages/Home/index'
import { Cadastro } from './pages/Cadastro/index'
import Layout from './components/Layout/index'

function App() {
  return (

    <Router>

      <GlobalStyles />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          {/* <Route path="*" element={<Error />} /> */}
        </Route>
      </Routes>

    </Router>
  );
}

export default App;
