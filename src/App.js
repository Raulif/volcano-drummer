import React, { useContext, useEffect, useCallback } from 'react';
import { Container } from '@material-ui/core';

import {
  Controls,
  SequenceView,
  PlaySequenceButton,
  SignInForm,
  SignUpForm,
} from './components';
import { metronome, initMetronome } from './controllers/Metronome';
import { Store } from './store';
import {
  FETCH_LOCAL_STORAGE,
  SEQUENCE_STARTED_PLAYING,
  SEQUENCE_FINISHED_PLAYING,
  FETCH_USER_FROM_LOCAL_STORAGE,
  SIGN_OUT,
} from './actions';
import { Todos } from './components/Todos';

const App = () => {
  const {
    state,
    dispatch: { sequenceDispatch, userDispatch },
  } = useContext(Store);
  const { currentSequence, user } = state;
  console.log('USER:', user);

  useEffect(() => {
    const sequenceStartCB = () =>
      sequenceDispatch({ type: SEQUENCE_STARTED_PLAYING });
    const sequenceFinishCB = () =>
      sequenceDispatch({ type: SEQUENCE_FINISHED_PLAYING });

    initMetronome(sequenceStartCB, sequenceFinishCB);
  }, [sequenceDispatch]);

  useEffect(() => {
    !currentSequence && sequenceDispatch({ type: FETCH_LOCAL_STORAGE });
  });

  useEffect(() => {
    (!user || !user.user) &&
      userDispatch({ type: FETCH_USER_FROM_LOCAL_STORAGE });
  });

  useEffect(() => {
    currentSequence && (metronome.sequence = currentSequence);
  }, [currentSequence]);

  const hasSteps = currentSequence && currentSequence.steps.length;

  const onLogout = useCallback(() => {
    userDispatch({ type: SIGN_OUT });
  }, [userDispatch]);

  return (
    <Container
      style={{
        maxWidth: '350px',
        margin: '0 auto',
        textAlign: 'center',
        padding: 0,
      }}
    >
      {user && user.user && (
        <>
          <p>{user.user.username}</p>
          <Controls />
          {currentSequence && (
            <>
              <SequenceView
                sequence={currentSequence}
                key={currentSequence.id}
              />
              {<PlaySequenceButton disabled={!hasSteps} />}
            </>
          )}
          <button onClick={onLogout}>Logout</button>
        </>
      )}
      {(!user || !user.user) && <SignUpForm />}
      <Todos />

      {/* {thereAreSequences && (
        <Box>
          {sequence.list.map((seq, idx) => (
            <StyledDiv
              style={{ borderBottom: "1px solid grey", paddingBottom: "1em" }}
            >
              <p style={{ display: "inline", marginRight: "1em" }}>
                {idx + 1}.
              </p>
              <p
                style={{ display: "inline", marginRight: "10px" }}
              >{`${seq.bpm} bpm`}</p>
              <p
                style={{ display: "inline", marginRight: "10px" }}
              >{`${seq.length} secs`}</p>
            </StyledDiv>
          ))}
        </Box>
      )} */}
    </Container>
  );
};

export default App;
