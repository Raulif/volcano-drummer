import React, { useContext, useCallback, useState } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';

import { Store } from '../../store';
import { SIGN_IN } from '../../actions/authActions';

const SignInForm = () => {
  const {
    dispatch: { userDispatch },
  } = useContext(Store);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const onPasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const onSignIn = useCallback(() => {
    userDispatch({ type: SIGN_IN, payload: { username, password } });
  }, [password, userDispatch, username]);

  return (
    <Grid container space={2}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          onChange={onUsernameChange}
          value={username}
          placeholder='username'
        />
        <input
          onChange={onPasswordChange}
          value={password}
          placeholder='password'
        />
        <Button
          onClick={onSignIn}
          variant='contained'
          color='primary'
          disabled={!username || !password}
        >
          Sign In
        </Button>
      </div>
    </Grid>
  );
};

export { SignInForm };
