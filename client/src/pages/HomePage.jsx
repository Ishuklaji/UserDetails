import { Box, Heading, Text } from "@chakra-ui/react";

export default function Homepage() {
  return (
    <Box padding={8}>
      <Heading mt={16} textAlign={"start"} size={"4xl"}>
        User Admin App
      </Heading>
      <Text mt={8} maxW={"100%"} textAlign={"justify"}>
        Your Personal User admin App 
      </Text>
    </Box>
  );
}
