import React from 'react';
import { Box, Button, Flex, Heading, Input, ListItem, OrderedList, Stack } from '@chakra-ui/react';
import Todo from './Todo';

const App: React.FC = () => (
  <Stack display="grid" placeItems="center" height="100vh">
    <Box
      border="2px solid"
      borderColor="blue.300"
      height="700px"
      width="60%"
      borderRadius={10}
      p={2}
    >
      <Heading
        as="h2"
        size="xl"
        textAlign="center"
        borderBottom="2px solid"
        borderColor="blue.300"
        py={2}
      >
        Todo App
      </Heading>
      <Flex as="form" border="1px solid" borderColor="blue.400" borderRadius={5} my={3}>
        <Input borderRadius={5} border="none" _focus={{ outline: 'none' }} />
        <Button type="submit" background="blue.400" borderRadius={4}>
          Add
        </Button>
      </Flex>
      <OrderedList>
        <ListItem>
          <Todo />
        </ListItem>
      </OrderedList>
    </Box>
  </Stack>
);

export default App;
