import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const NotFoundPage = () => {
    return (
        <Box maxW="800px" mx="auto" mt={8} p={4}>
            <Heading>Page Not Found</Heading>
            <p>The requested page does not exist.</p>
        </Box>
    );
};

export default NotFoundPage;
