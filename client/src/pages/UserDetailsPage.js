import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import api from '../api/api';
import UserDetailsForm from '../components/UserDetailsForm';

const UserDetailsPage = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/user/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error(error);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch user details.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        fetchUser();
    }, [userId, toast]);

    const handleFormSubmit = async (formData) => {
        try {
            await api.put(`/user/${userId}`, formData);
            toast({
                title: 'Success',
                description: 'User details updated successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Failed to update user details.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleCancel = () => {
        navigate('/users');
    };

    return (
        <Box maxW="800px" mx="auto" mt={8} p={4}>
            {user ? (
                <>
                    <Heading mb={4}>User Details</Heading>
                    <UserDetailsForm
                        user={user}
                        onSubmit={handleFormSubmit}
                        onCancel={handleCancel}
                    />
                </>
            ) : (
                <p>Loading user details...</p>
            )}
        </Box>
    );
};

export default UserDetailsPage;
