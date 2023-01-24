import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };
  return (
    <Form onSubmit={submitHandler}>
      <Row>
        <Col>
          <Form.Control
            type='text'
            placeholder='Search products...'
            name='q'
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            className='me-sm-2 ms-sm-5'
          ></Form.Control>
        </Col>
        <Col className='ms-4'>
          <Button variant='outline-success' type='submit'>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBox;
