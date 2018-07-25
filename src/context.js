import React from 'react';
import userId from './component/Users/UserLogin';

const state = {
  userId: '5b57353df9af5955f794b0b4'
};

const NumberContext = React.createContext(state.userId); //passing initial value

export default NumberContext;
