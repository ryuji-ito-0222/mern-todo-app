import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import React from 'react';

interface TodoProps {
  todo?: string;
}

const Todo: React.FC<TodoProps> = ({ todo = 'todo' }) => (
  <Flex align="baseline" justify="space-between">
    <Text fontSize="20px" fontWeight="bold">
      {todo}
    </Text>
    <IconButton aria-label="削除ボタン" icon={<DeleteIcon />} fontSize="20px" size="md" />
  </Flex>
);

export default Todo;
