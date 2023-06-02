import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Header from './components/Header';
import Todo from './pages/Todo';
import User from './pages/User';
import Admin from './pages/Admin';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Routes>
          <Route path='/' element={<User />} />
          <Route path='/todo' element={<Todo />} />
          <Route path='/admin' element={<Admin />} />
          <Route
            path='/*'
            element={
              <div className='App'>
                <h1 className='App-header'>404: No Page Found</h1>
              </div>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
