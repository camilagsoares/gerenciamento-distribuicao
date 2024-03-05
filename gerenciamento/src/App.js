import { GlobalStyles } from "./styles/global";
import Login from './pages/Login/index';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { Home } from './pages/Home/index'
import { Cadastro } from './pages/Cadastro/index'
import Layout from './components/Layout/index'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Error from "./pages/Error/index"
import Postar from "./pages/Postar";
import AuthLayout from './components/AuthLayout/AuthLayout';
import { Detalhes } from './pages/Detalhes/index'

function App() {

  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: 'Segoe UI',
        textTransform: 'none',
        fontSize: 16,
      },
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/postar" element={<Postar />} />
            <Route
            path="/detalhes/:id"
            element={
              <AuthLayout>
                <Detalhes />
              </AuthLayout>
            }
          />
          </Route>
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/cadastro"
            element={
              <AuthLayout>
                <Cadastro />
              </AuthLayout>
            }
          />
      
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
