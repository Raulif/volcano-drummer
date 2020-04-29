import React, { useReducer } from 'react';

import { sequenceReducer, authReducer } from './reducers';

export const Store = React.createContext();

export const StoreProvider = (props) => {
  const [sequenceState, sequenceDispatch] = useReducer(sequenceReducer);
  const [userState, userDispatch] = useReducer(authReducer);

  return (
    <Store.Provider
      value={{
        state: { ...sequenceState, ...userState },
        dispatch: { sequenceDispatch, userDispatch },
      }}
    >
      {props.children}
    </Store.Provider>
  );
};
