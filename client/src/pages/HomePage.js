import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

function HomePage() {
    return (
        <Box p={4}>
            <Heading as="h2" size="xl">
                Home Page
            </Heading>
            <Box mt={4}>Welcome to the home page!</Box>
        </Box>
    );
}

export default HomePage;
