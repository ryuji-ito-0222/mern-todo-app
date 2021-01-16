import React from 'react';
import { Heading, Stack, Text } from '@chakra-ui/react';
import './styles/App.css';

const App: React.FC = () => (
  <Stack>
    <Heading as="h2" size="xl">
      これはテストです
    </Heading>
    <Text fontSize="xl">これはテストです</Text>
  </Stack>
);

export default App;
