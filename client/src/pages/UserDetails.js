import { useState, useEffect } from "react";
import { BASE_URL } from "../config/config";
import { Box, Text, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { Link } from "react-router-dom";

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
        <div style={{marginTop:'60px'}}>
            {users.map((user) => (
                <Box key={user._id} p={4} borderWidth="1px" borderRadius="md" my={2}>
                    <Text fontWeight="bold">Name: {user.name}</Text>
                    <Text>Phone Number: {user.phoneNumber}</Text>
                    <Text>Email: {user.email}</Text>
                    <Text>Role: {user.role}</Text>

                   
                     <Button><Link to={`/edit/${user._id}`}> Edit</Link></Button>
                </Box>
            ))}
           
        </div>
    );
};

export default UserDetails;