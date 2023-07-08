import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Flex, VStack } from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../config/config";

export default function EditUser() {
    const { id } = useParams()
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [success, setSuccess] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    let { token } = useSelector((state) => state.userReducer)


    useEffect(() => {
        fetch(BASE_URL + `/user/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(data => data.json()).then(res => {
            setName(res.name)
            setEmail(res.email)
            setPhoneNumber(res.phoneNumber)
        })
    }, [])

    const handleEdit = async () => {
        let obj = {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
        }

        let data = await fetch(BASE_URL + `/user/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(obj),

        });
        let res = await data.json();
        if (res) {
            setSuccess(true)
            alert("Details Edited Successfully");
            nav("/userdetails");
        }
    };

    return (
        <Flex padding={4} w="100%">
            <VStack w={"50%"}>
                <Flex
                    minH={"100vh"}
                    align={"center"}
                    justify={"center"}
                    bg={useColorModeValue("gray.50", "gray.800")}
                >
                    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                        <Stack align={"center"}>
                            <Heading fontSize={"4xl"}>Edit User Detail</Heading>
                        </Stack>
                        <Box
                            rounded={"lg"}
                            bg={useColorModeValue("white", "gray.700")}
                            boxShadow={"lg"}
                            p={8}
                        >
                            <Stack spacing={4}>
                                <FormControl id="name">
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                    />
                                </FormControl>
                                <FormControl id="email">
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                    />
                                </FormControl>
                                <FormControl id="phoneNumber">
                                    <FormLabel>Phone Number</FormLabel>
                                    <Input
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        type="text"
                                    />
                                </FormControl>
                                <Stack spacing={10}>
                                    <Stack
                                        direction={{ base: "column", sm: "row" }}
                                        align={"start"}
                                        justify={"space-between"}
                                    ></Stack>
                                    <Button
                                        onClick={handleEdit}
                                        bg={"blue.400"}
                                        color={"white"}
                                        _hover={{
                                            bg: "blue.500",
                                        }}
                                    >
                                        Edit User
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Flex>
            </VStack>
        </Flex>
    );
}