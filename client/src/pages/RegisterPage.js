import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Heading, FormControl, FormLabel, Input, Button, Select } from '@chakra-ui/react';
import api from '../api/api';

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        email: '',
        password: '',
        phoneNumber: '',
    });

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleRegister = async () => {
        try {
            const response = await api.post('/api/users/register', formData);
            console.log('Registration successful:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('An error occurred:', error.response.data.message);
        }
    };

    return (
        <Box py="4">
            <Container maxW="sm">
                <Heading mb="4" textAlign="center">Register</Heading>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" name="name" placeholder="Name" onChange={handleChange} />
                </FormControl>
                <FormControl mt="4">
                    <FormLabel>Role</FormLabel>
                    <Select name="role" onChange={handleChange} placeholder="Select Role">
                        <option value="Super Admin">Super Admin</option>
                        <option value="Customer">Customer</option>
                    </Select>
                </FormControl>
                <FormControl mt="4">
                    <FormLabel>Email</FormLabel>
                    <Input type="email" name="email" placeholder="Email" onChange={handleChange} />
                </FormControl>
                <FormControl mt="4">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" name="password" placeholder="Password" onChange={handleChange} />
                </FormControl>
                <FormControl mt="4">
                    <FormLabel>Phone Number</FormLabel>
                    <Input type="tel" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
                </FormControl>
                <Button mt="4" colorScheme="blue" onClick={handleRegister}>Register</Button>
            </Container>
        </Box>
    );
}

export default RegisterPage;
