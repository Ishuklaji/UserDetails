import { useState, useEffect } from "react";
import { BASE_URL } from "../config/config";
import { Box, Text, Button } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";

const UserDetails = () => {
    const { id } = useParams()
    const [users, setUsers] = useState([]);
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

    // // Fetch logged-in user data
    // useEffect(() => {
    //     debugger
    //     fetch(BASE_URL + `/user/${id}`, {
    //         headers: {
    //             authorization: `Bearer ${token}`
    //         }
    //     }).then(data => data.json()).then(res => {
    //        setLoggedInUser(res)
    //     })
    // }, [])

    return (
        <div style={{ marginTop: '60px' }}>
            {users.map((user) => (
                <Box key={user._id} p={4} borderWidth="1px" borderRadius="md" my={2}>
                    <Text fontWeight="bold">Name: {user.name}</Text>
                    <Text>Phone Number: {user.phoneNumber}</Text>
                    <Text>Email: {user.email}</Text>
                    <Text>Role: {user.role}</Text>
                    <Button><Link to={`/edit/${user._id}`}> Edit</Link></Button>
                    {/* {loggedInUser.role === 'Super Admin' && <Button><Link to={`/edit/${user._id}`}> Edit</Link></Button>} */}
                </Box>
            ))}
        </div>
    );
};

export default UserDetails;