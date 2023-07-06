import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Stack, Button, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function UserDetailsPage() {
    const [userDetails, setUserDetails] = useState(null);
    const [updatedDetails, setUpdatedDetails] = useState({
        name: '',
        role: '',
        email: '',
        phoneNumber: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await api.get('/api/users/profile');
                if (response.status === 200) {
                    setUserDetails(response.data);
                    setUpdatedDetails(response.data);
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error('An error occurred:', error.message);
            }
        };

        fetchUserDetails();
    }, []);

    const handleUpdateDetails = async () => {
        try {
            const response = await api.put(`/api/users/update/${userDetails._id}`, updatedDetails);
            if (response.status === 200) {
                console.log('User details updated successfully');
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    };

    const handleInputChange = (e) => {
        setUpdatedDetails((prevDetails) => ({
            ...prevDetails,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <Box p={4}>
            <Heading as="h2" size="xl" mb={4}>
                User Details
            </Heading>
            {userDetails ? (
                <Stack spacing={4}>
                    <Text>
                        <strong>Name:</strong> {userDetails.name}
                    </Text>
                    <Text>
                        <strong>Email:</strong> {userDetails.email}
                    </Text>
                    <Text>
                        <strong>Role:</strong> {userDetails.role}
                    </Text>
                    <Text>
                        <strong>Phone Number:</strong> {userDetails.phoneNumber}
                    </Text>
                    {userDetails.role === 'Super Admin' && (
                        <Stack direction="row" spacing={4} alignItems="center">
                            <Input
                                name="name"
                                value={updatedDetails.name}
                                onChange={handleInputChange}
                                placeholder="New Name"
                            />
                            <Input
                                name="role"
                                value={updatedDetails.role}
                                onChange={handleInputChange}
                                placeholder="New Role"
                            />
                            <Input
                                name="email"
                                value={updatedDetails.email}
                                onChange={handleInputChange}
                                placeholder="New Email"
                            />
                            <Input
                                name="phoneNumber"
                                value={updatedDetails.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="New Phone Number"
                            />
                        </Stack>
                    )}
                    {userDetails.role === 'Super Admin' && (
                        <Button onClick={handleUpdateDetails}>Update Details</Button>
                    )}
                </Stack>
            ) : (
                <Text>Loading user details...</Text>
            )}
        </Box>
    );
}

export default UserDetailsPage;


