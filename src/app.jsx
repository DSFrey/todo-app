import React from 'react';

import { AppShell, Header } from '@mantine/core'
import ToDo from './Components/ToDo';

export const App = () => {
  return (
    <AppShell header={<Header height={60} p="md" >Home</Header >} >
      <ToDo />
    </AppShell >
  );
}
