import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton, useToast,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import api from '../api/api';

const UserListPage = () => {
    const toast = useToast();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error(error);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch users.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        fetchUsers();
    }, [toast]);

    const handleDelete = async (userId) => {
        try {
            await api.delete(`/user/${userId}`);
            toast({
                title: 'Success',
                description: 'User deleted successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Failed to delete user.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box maxW="800px" mx="auto" mt={8} p={4}>
            <Heading mb={4}>User List</Heading>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((user) => (
                        <Tr key={user.id}>
                            <Td>{user.name}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.role}</Td>
                            <Td>
                                <Link to={`/user/${user.id}`}>
                                    <IconButton
                                        colorScheme="teal"
                                        icon={<EditIcon />}
                                        aria-label="Edit user"
                                        mr={2}
                                    />
                                </Link>
                                <IconButton
                                    colorScheme="red"
                                    icon={<DeleteIcon />}
                                    aria-label="Delete user"
                                    onClick={() => handleDelete(user.id)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default UserListPage;
