import React, { useState } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { UserContextProvider } from './context/AppContext';

const App = () => {
  return (
    <UserContextProvider>
        <AppNavigator/>
    </UserContextProvider>
  );
}

export default App