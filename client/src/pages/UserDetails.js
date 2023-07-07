import { useState, useEffect } from "react";
import { BASE_URL } from "../config/config";
import { Box, Text, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";

const UserDetails = () => {
    const [users, setUsers] = useState([]);
    const [updateData, setUpdateData] = useState({
        name: "",
        role: "",
        email: "",
        password: "",
        phoneNumber: ""
    });
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [token, setToken] = useState("");

    // Fetch users data
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${BASE_URL}/user`);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    // Fetch logged-in user data
    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const response = await fetch(`${BASE_URL}/user/:id`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setLoggedInUser(data);
            } catch (error) {
                console.error("Error fetching logged-in user:", error);
            }
        };

        // Simulated token retrieval
        const getToken = async () => {
            try {
                const loginResponse = await fetch(`${BASE_URL}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: "",
                        password: ""
                    })
                });

                if (loginResponse.ok) {
                    const { token } = await loginResponse.json();
                    setToken(token);
                } else {
                    console.error("Login failed");
                }
            } catch (error) {
                console.error("Error authenticating user:", error);
            }
        };

        getToken();
        fetchLoggedInUser();
    }, [token]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle user update
    const handleUpdateUser = async (userId) => {
        try {
            const response = await fetch(`${BASE_URL}/user/update/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                console.log("User updated successfully");
                const updatedUsers = users.map((user) =>
                    user._id === userId ? { ...user, ...updateData } : user
                );
                setUsers(updatedUsers);
                setUpdateData({
                    name: "",
                    role: "",
                    email: "",
                    password: "",
                    phoneNumber: ""
                });
            } else {
                console.error("Failed to update user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div>
            {users.map((user) => (
                <Box key={user._id} p={4} borderWidth="1px" borderRadius="md" my={2}>
                    <Text fontWeight="bold">Name: {user.name}</Text>
                    <Text>Phone Number: {user.phoneNumber}</Text>
                    <Text>Email: {user.email}</Text>
                    <Text>Role: {user.role}</Text>

                    {loggedInUser && loggedInUser.role === "Super Admin" && (
                        <Box mt={2}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    name="name"
                                    value={updateData.name}
                                    onChange={handleInputChange}
                                    placeholder="New Name"
                                />
                            </FormControl>
                            <FormControl mt={2}>
                                <FormLabel>Role</FormLabel>
                                <Input
                                    name="role"
                                    value={updateData.role}
                                    onChange={handleInputChange}
                                    placeholder="New Role"
                                />
                            </FormControl>
                            <FormControl mt={2}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    name="email"
                                    value={updateData.email}
                                    onChange={handleInputChange}
                                    placeholder="New Email"
                                />
                            </FormControl>
                            <FormControl mt={2}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    name="password"
                                    value={updateData.password}
                                    onChange={handleInputChange}
                                    placeholder="New Password"
                                />
                            </FormControl>
                            <FormControl mt={2}>
                                <FormLabel>Phone Number</FormLabel>
                                <Input
                                    name="phoneNumber"
                                    value={updateData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="New Phone Number"
                                />
                            </FormControl>
                            <Button mt={2} onClick
                                ={handleUpdateUser.bind(null, user._id)}>
                                Update User
                            </Button>
                        </Box>
                    )}
                </Box>
            ))}
        </div>
    );
};

export default UserDetails;