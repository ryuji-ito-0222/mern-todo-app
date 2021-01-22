import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Heading,
  Input,
  List,
  ListIcon,
  ListItem,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
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
    axios.post('/new/todo', {
      todo: input,
      timestamp: Date.now(),
    });
    setInput('');
  };

  useEffect(() => {
    getTodos();

    const todo = pusher.subscribe('todos');
    todo.bind('newTodo', () => {
      getTodos();
    });
  }, []);

  return (
    <Stack display="grid" placeItems="center" height="100vh" p={10}>
      <Flex
        direction="column"
        border="3px solid"
        borderColor="blue.300"
        height="100%"
        width="60vw"
        minWidth="350px"
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
          Todo List
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
            color="white"
          >
            Add
          </Button>
        </Flex>
        {!todoList.length ? (
          <Stack spacing={5}>
            <Skeleton height="30px" />
            <Skeleton height="30px" />
            <Skeleton height="30px" />
            <Skeleton height="30px" />
          </Stack>
        ) : (
          <List overflow="auto" flex={1}>
            {todoList.map(({ id, todo }) => (
              <ListItem key={id} display="flex" alignItems="baseline">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                <Todo id={id} todo={todo} />
              </ListItem>
            ))}
          </List>
        )}
      </Flex>
    </Stack>
  );
};

export default App;
