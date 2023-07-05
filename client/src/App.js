import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import UserListPage from './pages/UserListPage';
import UserDetailsPage from './pages/UserDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <ChakraProvider>
      <CSSReset />
      <Router>
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="/user/:userId" element={<UserDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
