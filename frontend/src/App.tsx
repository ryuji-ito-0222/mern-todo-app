import { Box, Button, Flex, Heading, Input, ListItem, OrderedList, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import axios from './axios';
import { pusher } from './pusher';
import Todo from './Todo';

export type Todo = {
  id: string;
  todo: string;
};

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const getTodos = () => {
    axios
      .get('/get/todoList')
      .then((res: { data: React.SetStateAction<Todo[]> }) => setTodoList(res.data));
  };

  const addTodo = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axios
      .post('/new/todo', {
        todo: input,
        timestamp: Date.now(),
      })
      .then(() => setInput(''));
  };

  useEffect(() => {
    getTodos();

    const todo = pusher.subscribe('todos');
    todo.bind('newTodo', () => {
      getTodos();
    });
  }, []);

  return (
    <Stack display="grid" placeItems="center" height="100vh">
      <Box
        border="2px solid"
        borderColor="blue.300"
        height="700px"
        width="60%"
        minWidth="500px"
        maxWidth="700px"
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
          <Input
            borderRadius={5}
            border="none"
            _focus={{ outline: 'none' }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            type="submit"
            background="blue.400"
            borderRadius={0}
            border="none"
            onClick={addTodo}
          >
            Add
          </Button>
        </Flex>
        <OrderedList>
          {todoList.map(({ id, todo }) => (
            <ListItem key={id}>
              <Todo id={id} todo={todo} />
            </ListItem>
          ))}
        </OrderedList>
      </Box>
    </Stack>
  );
};

export default App;
