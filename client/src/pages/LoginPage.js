import React, { useState } from 'react';
import { Box, Heading, Input, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await api.post('/api/auth/login', { email, password });
            if (response.status === 200) {
                onLogin();
                navigate('/profile');
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    };

    return (
        <Box p={4}>
            <Heading as="h2" size="xl" mb={4}>
                Login
            </Heading>
            <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mb={4}
            />
            <Input
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                mb={4}
            />
            <Button onClick={handleLogin}>Login</Button>
        </Box>
    );
}

export default LoginPage;
