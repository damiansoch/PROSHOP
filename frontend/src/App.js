import { Container } from 'react-bootstrap';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceorderScreen from './screens/PlaceorderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />

        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/order/:id' element={<OrderScreen />} />
              <Route path='/placeorder/' element={<PlaceorderScreen />} />
              <Route path='/payment/' element={<PaymentScreen />} />
              <Route path='/shipping/' element={<ShippingScreen />} />
              <Route path='/products/:id' element={<ProductScreen />} />
              <Route path='/cart/:id?' element={<CartScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/admin/userlist' element={<UserListScreen />} />
              <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
              <Route
                path='/admin/productlist'
                element={<ProductListScreen />}
              />
              <Route
                path='/admin/productlist/:pageNumber'
                element={<ProductListScreen />}
              />
              <Route path='/admin/orderlist' element={<OrderListScreen />} />
              <Route
                path='/admin/product/:id/edit'
                element={<ProductEditScreen />}
              />

              <Route path='/search/:keyword' element={<HomeScreen />} />
              <Route path='/page/:pageNumber' element={<HomeScreen />} />
              <Route
                path='/search/:keyword/page/:pageNumber'
                element={<HomeScreen />}
              />
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
