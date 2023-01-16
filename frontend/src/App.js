import { Container } from 'react-bootstrap';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />

        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/products/:id' element={<ProductScreen />} />
              <Route path='/cart/:id?' element={<CartScreen />} />
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/' element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
