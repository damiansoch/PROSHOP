import { Container } from 'react-bootstrap';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Cart from './screens/Cart';
import Login from './screens/Login';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />

        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='*' element={<Navigate to='/homeScreen' replace />} />
              <Route path='/homeScreen' element={<HomeScreen />} />
              <Route path='/products/:id' element={<ProductScreen />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
