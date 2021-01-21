/* eslint-disable @typescript-eslint/no-unsafe-call */
import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import React from 'react';

import axios from './axios';

interface TodoProps {
  id: string;
  todo: string;
}

const Todo: React.FC<TodoProps> = ({ id, todo }) => {
  const deleteTodo = () => {
    axios.delete(`/delete/todo?id=${id}`);
  };

  return (
    <Flex align="baseline" justify="space-between" my={2}>
      <Text fontSize="20px" fontWeight="bold">
        {todo}
      </Text>
      <IconButton
        aria-label="削除ボタン"
        icon={<DeleteIcon />}
        fontSize="20px"
        size="md"
        onClick={deleteTodo}
      />
    </Flex>
  );
};

export default Todo;
