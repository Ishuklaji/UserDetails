import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const UserDetailsForm = ({ user, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const handleFormChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    isDisabled={user.role !== 'Customer'}
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    isDisabled={user.role !== 'Super Admin'}
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Role</FormLabel>
                <Input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleFormChange}
                    isDisabled={true}
                />
            </FormControl>
            <Button type="submit" colorScheme="blue" mr={2}>
                Save
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
        </form>
    );
};

export default UserDetailsForm;
