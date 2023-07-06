import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';

const NavBar = ({ isAuthenticated, onLogout }) => {
    return (
        <Flex bg="gray.200" p={4} alignItems="center">
            <Box>
                <Link to="/">Home</Link>
            </Box>
            <Spacer />
            <Box>
                {isAuthenticated ? (
                    <Link to="/profile">Profile</Link>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </Box>
            {isAuthenticated && (
                <Box ml={4}>
                    <Text as="button" onClick={onLogout}>
                        Logout
                    </Text>
                </Box>
            )}
        </Flex>
    );
}

export default NavBar