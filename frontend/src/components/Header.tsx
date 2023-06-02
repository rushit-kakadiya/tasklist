import React, { FC, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <ListGroup className='header'>
      <ListGroup.Item className='button'>
        <Link to='#'></Link>
      </ListGroup.Item>
      {localStorage.getItem('token') ? (
        <ListGroup.Item className='button'>
          <Link to='/' onClick={() => localStorage.removeItem('token')}>
            Logout
          </Link>
        </ListGroup.Item>
      ) : null}
    </ListGroup>
  );
};

export default Header;
