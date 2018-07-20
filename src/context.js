import React from 'react';

const state = {
  userId: '5b4f4b8c224754466af76ab7'
};

const NumberContext = React.createContext(state.userId); //passing initial value

export default NumberContext;