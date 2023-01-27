import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';

import { logout } from '../actions/userAction';
import SearchBox from './SearchBox';

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <Link to='/'> ProShop</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox />
            <Nav className='ms-auto'>
              <Link
                to={'/cart'}
                className='mx-3 ms-4 my-4 d-flex align-items-center'
              >
                <i className='fas fa-shopping-cart me-1'></i>Cart
              </Link>
              {/* dropdown */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item
                    onClick={() => {
                      navigate('/profile');
                    }}
                  >
                    Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>
                    {' '}
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to={'/login'} className='ms-4 d-flex align-items-center'>
                  <i className='fas fa-user me-1 '></i>
                  SignIn
                </Link>
              )}

              {/* admin dropdown */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown className='mx-3' title='ADMIN MENU' id='adminmenu'>
                  <NavDropdown.Item
                    onClick={() => {
                      navigate('/admin/userlist');
                    }}
                  >
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      navigate('/admin/productlist');
                    }}
                  >
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      navigate('/admin/orderlist');
                    }}
                  >
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
